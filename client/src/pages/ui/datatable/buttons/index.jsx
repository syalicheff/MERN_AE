export default function Buttons({setTransf}) {
    // const function using set to remove all elements from transf
    function clearAll(){
        setTransf([])
    }

    return (
        // red buttons with texts(Trasnsformer, Reset qte, Actualiser, Select all, Deselect all) with margin 2
        <div className="flex flex-col gap-2 m-1.5">
            <button className="bg-red-500 text-white p-2 rounded-md">Transformer</button>
            <button className="bg-red-500 text-white p-2 rounded-md">Reset qte</button>
            <button className="bg-red-500 text-white p-2 rounded-md">Actualiser</button>
            <button className="bg-red-500 text-white p-2 rounded-md">Select all</button>
            <button onClick={clearAll} className="bg-red-500 text-white p-2 rounded-md">Deselect all</button>
        </div>
    )
}