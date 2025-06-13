import axios from "axios"
import { OpenAI } from 'openai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // If you don't have an OpenAI API key, you can use this mock response for testing
    if (!process.env.OPENAI_API_KEY) {
      // Mock response for testing without API key
      return Response.json({
        message:
          "Děkuji za váš dotaz. Jako finanční poradce vám rád pomohu. Můžete mi položit konkrétní otázku ohledně investic, spoření nebo finančního plánování?",
      })
    }
    

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Jsi finanční poradce, který pomáhá klientům s investicemi, spořením a finančním plánováním. Odpovídej v češtině a buď nápomocný.",
          },
          ...messages,
        ],
        max_tokens: 150,
        stream: true,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    const assistantMessage = response.data.choices[0].message.content

    return Response.json({ message: assistantMessage })
  } catch (error) {
    console.error("Error calling OpenAI API:", error)
    return Response.json(
      { message: "Omlouvám se, došlo k chybě při zpracování vaší zprávy. Zkuste to prosím znovu." },
      { status: 500 },
    )
  }
}
