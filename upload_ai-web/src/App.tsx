import { FileVideo2, Github, Upload, Wand } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";

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

          <a href="https://github.com/valvanogabryel" target="_blank">
            <Button variant={"destructive"}>
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
          </a>
        </div>
      </header>

      <main className="flex gap-6 flex-1 p-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              placeholder="Inclua o prompt para a IA..."
              className="resize-none leading-relaxed p-4"
            />
            <Textarea
              placeholder="Resultado gerado pela IA..."
              readOnly
              className="resize-none leading-relaxed p-4"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável{" "}
            <code className="text-red-400 duration-500 hover:text-red-500">
              {"{transcription}"}
            </code>{" "}
            para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>
        </div>
        <aside className="w-80 space-y-6">
          <form className="space-y-6">
            <label
              htmlFor="video"
              className="flex flex-col gap-2 items-center justify-center border w-full rounded-md aspect-video cursor-pointer border-dashed text-sm text-muted-foreground transition-all hover:text-white hover:bg-muted hover:border-solid"
            >
              <FileVideo2 className="h-4 w-4" />
              Selecione um vídeo
            </label>
            <input
              type="file"
              name="video"
              id="video"
              accept="video/mp4"
              className="sr-only"
            />

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="transcription_prompt">
                Prompt de transcrição
              </Label>
              <Textarea
                id="transcription_prompt"
                className="h-20 resize-none leading-relaxed"
                placeholder="Insira palavras-chave mencionadas no vídeo separadas por vírgula"
              />
            </div>

            <Button type="submit" className="w-full">
              Carregar vídeo
              <Upload className="h-4 w-4 ml-2" />
            </Button>
          </form>

          <Separator />

          <form className="space-y-6">
            <div className="space-y-2">
              <Label>Tipo de Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yt_title">Título do YouTube</SelectItem>
                  <SelectItem value="video_desc">Descrição de vídeo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16K</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-muted-foreground text-xs italic text-end select-none">
                Você poderá alterar essa opção em breve
              </span>
            </div>

            <Separator className="w-1/2 m-auto" />

            <div className="space-y-4">
              <Label>Temperatura</Label>

              <Slider min={0} max={1} step={0.1} defaultValue={[0.5]} />

              <span className="block text-muted-foreground text-xs italic text-end select-none leading-relaxed">
                Valores maiores tendem a deixar o resultado mais{" "}
                <span className="font-semibold text-destructive-foreground">
                  criativo
                </span>
                , porém mais sujeito à{" "}
                <span className="font-semibold text-destructive">erros</span>
              </span>
            </div>

            <Separator className="w-1/2 m-auto" />

            <Button type="submit" className="w-full">
              Executar
              <Wand className="h-4 w-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
