import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import api from "@/lib/axios";

type Prompt = {
  id: string;
  title: string;
  template: string;
};

interface PromptSelectProps {
  onPromptSelect: (template: string) => void;
}

export function PromptSelect({ onPromptSelect }: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  useEffect(() => {
    api.get("/prompts").then(({ data }) => {
      setPrompts(data);
    });
  }, []);

  function handleValueChange(promptId: string) {
    const currentPrompt = prompts?.find((prompt) => prompt.id === promptId);

    if (!currentPrompt) return;

    onPromptSelect(currentPrompt.template);
  }

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => (
          <SelectItem value={prompt.id} key={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
