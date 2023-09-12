import { Github } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 border-b select-none">
        <h1 className="text-xl font-bold duration-300 hover:scale-95">
          upload.ai
        </h1>

        <div className="flex items-center space-x-6">
          <span className="text-sm text-muted-foreground">
            Desenvolvido no NLW da Rocketseat
          </span>
          <Separator orientation="vertical" className="h-6" aria-hidden />

          <Button variant={"destructive"}>
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </header>

      <main className="flex gap-6 flex-1 p-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <div>textarea 1</div>
            <div>textarea 2</div>
          </div>
          <p>
            Lembre-se: você pode utilizar a variável {"{"} transcription {"}"}{" "}
            para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>
        </div>
        <aside className="w-80">aside</aside>
      </main>
    </div>
  );
}
