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
        rows.forEach(element =>{
            if (element[col] == e.target.innerText){ 
                setTransf(prev => {
                   return transf.some((t) =>{
                        return t[col] == e.target.innerText
                    }) 
                    ? //remove the element
                    prev.filter((t) =>{
                        return t[col] != e.target.innerText
                    })
                    : [...prev, element]
                })
                console.log(transf)
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
             row[column].toLowerCase().indexOf(query.toLowerCase()) > -1
            )
        )
    }  

    return (
    <div className="flex flex-col gap-2 w-full overflow-y-auto ">
        <input 
            className="border border-gray-400 text-gray-800 placeholder:text-gray-800 w-full p-2"
            type="text"
            value={query}
            onChange={ e => setQuery(e.target.value)} />
        <table className="border border-gray-600 w-full ">
        <thead>
            <tr>
                {columns.map(column =>{
                    return <th  className="bg-gray-300 p-2 border-b border-gray-400 text-left">
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
                    <td
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
            </tr>
        </thead>
        <tbody>
            {transf.map((row =>
            <tr>
                <td className="border-b border-gray-200 bg-gray100 even:bg-gray-50 p-1">{row.name}</td>
                <td className="border-b border-gray-200 bg-gray100 even:bg-gray-50 p-1">{row.email}</td>
                <td className="border-b border-gray-200 bg-gray100 even:bg-gray-50 p-1">{row.company}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    )
}

