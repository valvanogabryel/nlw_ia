import { Github, Wand } from "lucide-react";
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
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useCompletion } from "ai/react";

export function App() {
  const [temperature, setTemperature] = useState(0.5);

  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
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
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              placeholder="Resultado gerado pela IA..."
              readOnly
              className="resize-none leading-relaxed p-4"
              value={completion}
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
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Tipo de Prompt</Label>
              <PromptSelect onPromptSelect={setInput} />
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

              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />

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

            <Button type="submit" className="w-full" disabled={isLoading}>
              Executar
              <Wand className="h-4 w-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
