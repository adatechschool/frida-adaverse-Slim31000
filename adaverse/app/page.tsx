import { ModeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <ModeToggle/>
      <h1>first project</h1>
      <Input/>
    </div>
  );
}
