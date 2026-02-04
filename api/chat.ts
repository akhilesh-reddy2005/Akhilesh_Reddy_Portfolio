import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `
You are a chatbot for Akhilesh Reddy's portfolio.

About Akhilesh:
- 3rd-year B.Tech CSE student at Jain Deemed-to-be University, Bangalore
- Full-Stack Developer (React, Node.js, Express, MongoDB)
- Cloud & AI enthusiast
- Projects: Bus Pass System, Campus Reporting Portal, Fitness AI
- Hackathons: Buildverse, Smart India Hackathon
- Career goal: Software Development Engineer

Answer briefly and professionally.
`,
        },
        { role: 'user', content: message },
      ],
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      error: 'AI response failed',
    });
  }
}
