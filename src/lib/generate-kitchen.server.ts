import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import OpenAI, { toFile } from "openai";

const inputSchema = z.object({
  photoDataUrl: z
    .string()
    .regex(/^data:image\/[a-z+]+;base64,/i, "Invalid image data"),
  description: z.string().trim().min(5, "Describe what you want changed").max(500),
});

function buildPrompt(userDescription: string): string {
  return `Photorealistic interior remodel of THIS kitchen photo. Keep the room's basic layout, dimensions, window/door positions, and camera perspective the same. Apply these changes:

${userDescription}

Render: architectural interior photography, magazine quality, no people, no clutter, realistic materials, natural daylight, accurate proportions.`;
}

let envLoaded = false;
async function ensureDevVarsLoaded() {
  if (envLoaded || process.env.OPENAI_API_KEY) {
    envLoaded = true;
    return;
  }
  const fs = await import("node:fs");
  const path = await import("node:path");
  for (const filename of [".dev.vars", ".env.local", ".env"]) {
    try {
      const content = fs.readFileSync(path.resolve(process.cwd(), filename), "utf-8");
      for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq <= 0) continue;
        const key = line.slice(0, eq).trim();
        let value = line.slice(eq + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (key && value && !process.env[key]) {
          process.env[key] = value;
        }
      }
    } catch {
      // file doesn't exist — try the next one
    }
  }
  envLoaded = true;
}

export const generateKitchen = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    await ensureDevVarsLoaded();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set on the server. Add it to .dev.vars.");
    }

    const match = data.photoDataUrl.match(/^data:(image\/[a-z+]+);base64,(.+)$/i);
    if (!match) {
      throw new Error("Invalid photo data URL");
    }
    const buffer = Buffer.from(match[2], "base64");
    const photoFile = await toFile(buffer, "kitchen.png", { type: "image/png" });

    const openai = new OpenAI({ apiKey });

    const result = await openai.images.edit({
      model: "gpt-image-1",
      image: photoFile,
      prompt: buildPrompt(data.description),
      size: "1024x1024",
      quality: "medium",
      n: 1,
    });

    const b64 = result.data?.[0]?.b64_json;
    if (!b64) {
      throw new Error("OpenAI returned no image. Try a simpler description.");
    }

    return { imageDataUrl: `data:image/png;base64,${b64}` };
  });
