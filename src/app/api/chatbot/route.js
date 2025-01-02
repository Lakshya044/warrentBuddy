import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error('API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req) {
  try {
    console.log('Received POST request');

    const { message } = await req.json();

    console.log('Request body:', { message });

    if (!message) {
      console.error('No message provided in request body');
      return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    console.log('Model initialized:', model);

    const formattedInput = [message];
    console.log('Formatted input:', formattedInput);

    const result = await model.generateContent(formattedInput);

    console.log('AI model result:', result);

    if (result && result.response) {
      const responseText = await result.response.text();
      const newString = responseText.replace(new RegExp("**", 'g'), '');
      console.log('AI response text:', newString);
      return new Response(JSON.stringify({ reply: responseText }), { status: 200 });
    } else {
      console.error('No response from AI model');
      return new Response(JSON.stringify({ error: 'No response from AI model' }), { status: 500 });
    }
  } catch (error) {
    console.error('Error generating content:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
