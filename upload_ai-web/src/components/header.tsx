import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b select-none">
      <h1 className="text-base sm:text-xl font-bold duration-300 hover:scale-95">
        upload.ai
      </h1>

      <div className="flex items-center space-x-6">
        <span className="hidden sm:inline-block sm:text-sm text-muted-foreground">
          Desenvolvido no NLW da Rocketseat
        </span>
        <Separator orientation="vertical" className="h-6" aria-hidden />

        <a href="https://github.com/valvanogabryel" target="_blank">
          <Button variant={"destructive"}>
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </a>
      </div>
    </header>
  );
}
