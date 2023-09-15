import { Wand } from "lucide-react";
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
import { Header } from "./components/header";
import { Container } from "./components/container";

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
      <Header />

      <Container>
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              placeholder="Inclua o prompt para a IA..."
              className="resize-none leading-relaxed p-4 placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              placeholder="Resultado gerado pela IA..."
              readOnly
              className="resize-none leading-relaxed p-4 placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
              value={completion}
            />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável{" "}
            <code className="text-red-400 duration-500 hover:text-red-500">
              {"{transcription}"}
            </code>{" "}
            para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>
        </div>

        <Separator className="sm:hidden" />

        <aside className="m-auto sm:w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label className="text-sm md:text-base">Tipo de Prompt</Label>
              <PromptSelect onPromptSelect={setInput} />
            </div>

            <div className="space-y-2">
              <Label className="text-sm md:text-base">Modelo</Label>
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
              <Label className="text-sm md:text-base">Temperatura</Label>

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
      </Container>
    </div>
  );
}
