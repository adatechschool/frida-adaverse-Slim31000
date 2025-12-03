"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label"

type projectSelectProps={
  projectOptions: string[];
  projectValue: string;
  handleProjectChange:(value: string) => void;
  name?:string

}
const ProjectSelect = ({projectOptions,projectValue,handleProjectChange,name}:projectSelectProps) => {
  return (
    <div><div className="space-y-2 w-56">
          <Label>Choisir un projet</Label>
          {name && (
        <input type="hidden" name={name} value={projectValue} />
      )}
      <Select value={projectValue} onValueChange={handleProjectChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionne un projet" />
        </SelectTrigger>
        <SelectContent>
          {projectOptions.map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
        </div></div>
  )
}

export default ProjectSelect