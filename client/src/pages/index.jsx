import people from "@/data/people.json"

import Datatable from "./ui/datatable";
import Buttons from "./ui/datatable/buttons";

import Navbar from "./ui/navbar";
import { useState } from "react";
export default function Homepage() {

  const [transf, setTransf] = useState([])

    people = people.map(person => {
    return {
      ...person,
      qte: 1
    }
  })

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-2 ml-2 mt-2">
        <Datatable 
          rows={people} 
          transf={transf} 
          setTransf={setTransf} />
        <Buttons 
          transf={transf} 
          setTransf={setTransf}/>   
      </div>
    </div>
  );
}