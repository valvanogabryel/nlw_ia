import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateAITranscriptionRoute } from "./routes/generate-ai-completion";

const app = fastify();
const port = 3333;

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAITranscriptionRoute);

app
  .listen({
    port,
  })
  .then(() => console.log(`Server running on [http://localhost:${port}]`));
