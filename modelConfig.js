const {GoogleGenerativeAI} = require('@google/generative-ai'); // Atualize com o caminho correto
const sysInst = require('./sysInst');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: sysInst, // Aqui você pode passar a instrução do sistema
    generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 10000,
    },
    // tools: {
    //     functionDeclarations: [embedDeclaration],
    // }
});

module.exports = model;