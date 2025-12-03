"use client";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label"


type PromoSelectProps = {
  promoOptions: string[];
    promoValue: string;
  handlePromoChange: (value: string) => void;
  name?: string;}


const PromoSelect = ({ promoOptions ,
  promoValue,
  handlePromoChange,name
}: PromoSelectProps) => {
  return (
    <div>
        <div className="space-y-2 w-56">
          <Label>Choisir une promo</Label>
          {name && (
        <input type="hidden" name={name} value={promoValue} />
      )}
      <Select value={promoValue} onValueChange={handlePromoChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionne une promo" />
        </SelectTrigger>
        <SelectContent>
          {promoOptions.map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
        </div>
    </div>
  )
}

export default PromoSelect