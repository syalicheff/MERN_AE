import { useState } from "react"
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid"

export default function Datatable({rows=[]}){
    const columns = Object.keys(rows[0])
    const [sortedBy, setSortedBy] = useState({
        column: columns[0],
        asc: true
    })
    const [query, setQuery] = useState('')

    const [transf, setTransf] = useState([])

    
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
    function appendTable(e , col) {
        // const inArray 
        rows.forEach(element =>{
            if (element[col] == e.target.innerText){ 
                setTransf(prev => {
                   return !transf.some((t) =>{
                       console.log('element : ' + element['_id'] +'transfo : ' + t['_id'])
                       t['_id'] === element['id']
                    }) 
                    && [...prev, element]
                })
                console.log(transf)

            }  
        })
    }
    return (
    <div className="flex flex-col gap-2 w-full overflow-y-auto h-96">
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
            // .slice(0,15)
            .map((row =>
            <tr>
                {columns.map((column) =>(
                    <td 
                    onClick={e => appendTable(e, column) } 
                    className="border-b border-gray-200 bg-gray100 even:bg-gray-50 p-1">
                        {row[column]}
                    
                    </td>
                ))}
            </tr> 
            ))}
        </tbody>
        </table>
    </div>
    )
}
