const { OpenAI } = require('openai');

const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing. Add it to backend/.env or set it in your environment.');
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
};

const promptBuilder = (type, keywords) => {
  const instructions = {
    summary: `Create a polished career summary for a resume from these keywords: ${keywords}. Keep the tone professional, concise, and fitting for a technology career. Maximum 100 words.`,
    skills: `Provide a list of strong technical and soft skills based on these keywords: ${keywords}. Output comma-separated skill names only.`,
    project: `Draft a resume-ready project description from these keywords: ${keywords}. Mention responsibilities, outcomes, and technologies where appropriate. Maximum 80 words.`,
    experience: `Draft a professional experience bullet summary from these keywords: ${keywords}. Keep it clear, achievement-focused, and suitable for a resume entry. Maximum 80 words.`,
  };
  return instructions[type] || instructions.summary;
};

exports.generateAIContent = async (req, res, next) => {
  try {
    const { type, keywords } = req.body;
    if (!type || !keywords) {
      return res.status(400).json({ error: 'AI type and keywords are required.' });
    }

    const openai = getOpenAIClient();
    const prompt = promptBuilder(type, keywords);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 220,
      temperature: 0.7,
    });

    const text = response.choices?.[0]?.message?.content || '';
    res.json({ result: text.trim() });
  } catch (error) {
    next(error);
  }
};
