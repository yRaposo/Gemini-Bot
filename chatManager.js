const model = require('./modelConfig');
const { fetchHistory } = require('./historyData');

async function startChat() {
    let history = await fetchHistory();
    
    if (history === null) {
        console.warn('Histórico está vazio, usando histórico padrão.');
        history = [
            {
                role: "user",
                parts: [{
                    text: `
                    channel_id: 123456789
    
                    GlobalName: ყ૨αρσรσ
                    userName: yraposo_
                    userId: 232551301320278019
    
                    Menssage: Oi Gemini
                    `
                }],
            },
            {
                role: "model",
                parts: [{ text: "Oiii como você esta?" }],
            },
            {
                role: "user",
                parts: [{
                    text: `
                    channel_id: 123456789
    
                    GlobalName: ყ૨αρσรσ
                    userName: yraposo_
                    userId: 232551301320278019
    
                    Menssage: Só dando uma passadinha por aqui
                    `
                }],
            },
            {
                role: "model",
                parts: [{ text: "Que bom te ver por aqui! 😄  O que você anda fazendo?  ✨" }],
            },
        ];
    }

    return model.startChat({ history });
}

async function sendMessage(message) {
    const chat = await startChat();
    const result = await chat.sendMessage(message);
    return result;
}

module.exports = { startChat, sendMessage };