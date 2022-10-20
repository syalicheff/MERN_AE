import people from "@/data/people.json"

import Datatable from "./ui/datatable";

import Navbar from "./ui/navbar";

export default function Homepage() {
  // add a key to each person named selector  with 1 as value and 
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Datatable rows={people} />   
      </div>
    </div>
  );
}