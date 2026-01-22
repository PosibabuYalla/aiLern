const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Initialize OpenAI only if API key is available
let openai = null;
if (process.env.OPENAI_API_KEY) {
  const OpenAI = require('openai');
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

// AI Q&A endpoint
router.post('/ask', auth, async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({ 
        message: 'AI service not configured. Please add OPENAI_API_KEY to environment variables.' 
      });
    }

    const { question, context } = req.body;

    const systemPrompt = `You are an AI tutor specializing in artificial intelligence, machine learning, and programming. 
    Provide clear, educational answers that help students learn. Keep responses concise but comprehensive.
    Context: ${context?.courseId ? `Course: ${context.courseId}` : 'General AI learning'}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const answer = completion.choices[0].message.content;

    res.json({
      answer,
      relatedTopics: extractTopics(answer),
      suggestedResources: []
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ message: 'AI service temporarily unavailable' });
  }
});

// Code review endpoint
router.post('/code-review', auth, async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({ 
        message: 'AI service not configured. Please add OPENAI_API_KEY to environment variables.' 
      });
    }

    const { code, language, context } = req.body;

    const systemPrompt = `You are a code review AI. Analyze the provided ${language} code and provide:
    1. Brief feedback on code quality
    2. Specific suggestions for improvement
    3. A score out of 100
    Keep it educational and constructive.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Context: ${context}\n\nCode:\n${code}` }
      ],
      max_tokens: 400,
      temperature: 0.3
    });

    const response = completion.choices[0].message.content;
    
    res.json({
      feedback: response,
      suggestions: extractSuggestions(response),
      score: extractScore(response) || 75,
      improvements: []
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ message: 'AI service temporarily unavailable' });
  }
});

// Helper functions
function extractTopics(text) {
  const topics = [];
  const keywords = ['machine learning', 'neural network', 'algorithm', 'python', 'data science'];
  keywords.forEach(keyword => {
    if (text.toLowerCase().includes(keyword)) {
      topics.push(keyword);
    }
  });
  return topics.slice(0, 3);
}

function extractSuggestions(text) {
  const lines = text.split('\n');
  return lines.filter(line => 
    line.includes('suggest') || line.includes('improve') || line.includes('consider')
  ).slice(0, 3);
}

function extractScore(text) {
  const scoreMatch = text.match(/(\d+)\/100|(\d+)%|score.*?(\d+)/i);
  return scoreMatch ? parseInt(scoreMatch[1] || scoreMatch[2] || scoreMatch[3]) : null;
}

module.exports = router;