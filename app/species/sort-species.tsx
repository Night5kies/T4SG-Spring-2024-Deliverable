'use client';
import * as React from "react";
import SpeciesCard from "./species-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
const kingdoms = z.enum(["None","Animalia", "Plantae", "Fungi", "Protista", "Archaea", "Bacteria"]);


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
}[]}) {

  const [sortDir, setSort] = React.useState<boolean>(true); // true = sort A-Z, false = sort Z-A
  const [filter, setFilter] = React.useState<string>("None");
  const [search, setSearch] = React.useState<string>("");

  return (
    <>
      <div className="flex flex-wrap justify-center">

        {/* SCIENTIFIC NAME ALPHABETICAL SORT */}

        <Button  onClick={()=>{setSort(!sortDir);}}> {sortDir ? "A-Z" : "Z-A"} </Button>

        {/* SEARCH BAR */}

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search for Species" onChangeCapture={e=>setSearch(e.currentTarget.value)}/>
        </div>

        {/* KINGDOM FILTER */}

        <Select onValueChange={(value)=>{setFilter(value)}}>
            <SelectTrigger>
              <SelectValue placeholder="Select a kingdom"/>
            </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {kingdoms.options.map((kingdom, index) => (
                <SelectItem key={index} value={kingdom}>
                  {kingdom}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>
      <div className="flex flex-wrap justify-center">
        {species?.filter((speciesTemp) =>
            ((speciesTemp.common_name ? speciesTemp.common_name.includes(search) : false) //SEARCH
              || (speciesTemp.description ? speciesTemp.description.includes(search) : false)
              || (speciesTemp.scientific_name ? speciesTemp.scientific_name.includes(search) : false))
            && (speciesTemp.kingdom === filter || filter === "None") // FILTER
          ).sort(function (a,b) { // SORT ALPHABETICALLY
          if (sortDir){
            if (a.scientific_name < b.scientific_name) {return -1;}
            if (a.scientific_name > b.scientific_name) {return 1;}
            return 0;
          }
          else{
            if (a.scientific_name < b.scientific_name) {return 1;}
            if (a.scientific_name > b.scientific_name) {return -1;}
            return 0;
          }
        }).map((species) => <SpeciesCard key={species.id} species={species} userId={id} />)}
      </div>
    </>
  )
}
