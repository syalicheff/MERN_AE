import { useState } from "react"
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid"

export default function Datatable({rows=[], transf = [] , setTransf}) {
    const columns = Object.keys(rows[0])
    const [sortedBy, setSortedBy] = useState({
        column: columns[0],
        asc: true
    })

    const [query, setQuery] = useState('')

    const [count, setCount] = useState(9)

  

    function appendTable(e , col) {
        console.log(e.target.parentElement.firstChild.innerText)     

        rows.forEach(element =>{
            // log the _id td in the same row as the clicked element
            if (element["_id"] == e.target.parentElement.firstChild.innerText){ 
                setTransf(prev => {
                   return transf.some((t) =>{
                        return t["_id"] == e.target.parentElement.firstChild.innerText
                    }) 
                    ? //remove the element
                    prev.filter((t) =>{
                        return t["_id"] != e.target.parentElement.firstChild.innerText
                    })
                    : [...prev, element]
                })
                //console.log(transf)
            }  
        })
    }
    function sort(rows) {
        return rows.sort((a,b) => {
            const {column,asc} = sortedBy
            if(a[column].toString() > b[column].toString()) return asc ? -1 : 1
            if(b[column].toString() > a[column].toString()) return asc ? 1 : -1
            return 0
        });
    }
    function filter(rows){
        return rows.filter(row => 
            columns.some(column =>
                column!= 'qte' && row[column].toLowerCase().indexOf(query.toLowerCase()) > -1
            )
        )
    } 
    function appendAll(){
        // if the filtered rows are not in transf, add them else don't do anything
        if (filter(rows).every((row) => transf.some((t) => t["_id"] == row["_id"]))){
            return
        }
        else{
            setTransf(prev => [...prev, ...filter(rows)])
        }
    }
    //get the rows that are currently sorted 
    function changeQte(e, col){
        console.log(e.target.value)
        //set the qte state of transf to e.target.value
        transf.forEach(element =>{
            if (element["name"] == e.target.parentElement.firstChild.innerText){
                //update the transf state
                setTransf(prev => {
                    return prev.map((t) =>{
                        return t["name"] == e.target.parentElement.firstChild.innerText
                        ? {...t, qte: e.target.value}
                        : t
                    })
                })
            }
        })

    }

    // set qte to 0 for all elements in transf
    function resetQte(){
        setTransf(prev => {
            return prev.map((t) =>{
                return {...t, qte: 0}
            })
        })
    }

    // console.log(rows)
    return (

    <div className="flex flex-col gap-2 w-full overflow-y-auto ">
  
        <button onClick={appendAll} className="bg-red-500 text-white p-2 rounded-md">Append all</button>
        <button onClick={resetQte} className="bg-red-500 text-white p-2 rounded-md">res qte</button>
        <input 
            className="border border-gray-400 text-gray-800 placeholder:text-gray-800 w-full p-2"
            type="text"
            value={query}
            onChange={ e => setQuery(e.target.value)} />
        <table className="border border-gray-600 w-full ">
        <thead>
            <tr>
                {columns.map(column =>{
                    return column !== 'qte' && <th  className="bg-gray-300 p-2 border-b border-gray-400 text-left">
                        <div className="flex items-center gap-2 cursor"
                        onClick={() =>
                        setSortedBy((prev => ({
                            column: column,
                            asc:!prev.asc,
                        }))
                        )}>
                            <div>{column}</div>
                            <div>{sortedBy.column === column && (
                                sortedBy.asc 
                                ? <ChevronUpIcon className="w-5 h-5" />
                                : <ChevronDownIcon className="w-5 h-5" />
                            )}
                            </div>
                        </div>
                    </th>
                })}
            </tr>
        </thead>
        <tbody>
            {sort(filter(rows))
            .slice(0,count)
            .map((row =>
            <tr key={row['_id']}>
                {columns.map((column) =>(
                    column !== 'qte' && <td
                    onClick={
                        (e) => {
                            appendTable(e, column)
                        }
                    } 
                    className="border-b border-gray-200 bg-gray100 even:bg-gray-50 p-1">
                        {row[column]}
                    </td>
                ))}
            </tr> 
            ))}
        </tbody>
        </table>
        <div className="w-full text-center">
            <button onClick={() => setCount(prev => prev + 5)} >more</button>
        </div>


        <table className="border border-gray-600 w-full ">
        <thead>
            <tr>
                <th className="bg-gray-300 p-2 border-b border-gray-400 text-left">name</th>
                <th className="bg-gray-300 p-2 border-b border-gray-400 text-left">email</th>
                <th className="bg-gray-300 p-2 border-b border-gray-400 text-left">company</th>
                <th className="bg-gray-300 p-2 border-b border-gray-400 text-left">qte</th>

            </tr>
        </thead>
        <tbody>
            {transf.map((row =>
            <tr>
                <td className="border-b border-gray-200 bg-gray100 even:bg-gray-50 p-1">{row.name}</td>
                <td className="border-b border-gray-200 bg-gray100 even:bg-gray-50 p-1">{row.email}</td>
                <td className="border-b border-gray-200 bg-gray100 even:bg-gray-50 p-1">{row.company}</td>
                { <input type='number' value = {row.qte} min="0" max="100" onChange={(e) => changeQte(e)}/>  }
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    )
}

