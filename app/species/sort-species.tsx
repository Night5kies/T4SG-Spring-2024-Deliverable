'use client'
import * as React from "react"
import SpeciesCard from "./species-card";




export function SortedSpecies({id,species}: {id: string,species: {
  author: string;
  common_name: string | null;
  description: string | null;
  id: number;
  image: string | null;
  kingdom: "Animalia" | "Plantae" | "Fungi" | "Protista" | "Archaea" | "Bacteria";
  scientific_name: string;
  total_population: number | null;
  endangered: boolean;
}[] | null}) {

  let sort = true; // true = A-Z, false = Z-A

  return (
    <>
      <input type="button" onClick={()=>{sort = !sort}}> {sort ? "A-Z" : "Z-A"} </input>
      <div className="flex flex-wrap justify-center">
          {species?.sort(function (a,b) {
            if (a.scientific_name < b.scientific_name) {
              return -1;
            }
            if (a.scientific_name > b.scientific_name) {
              return 1;
            }
            return 0;
          }).map((species) => <SpeciesCard key={species.id} species={species} userId={id} />)}
      </div>
    </>
  )
}
