const axios = require('axios');

async function fetchHistory() {
    try {
        const response = await axios.get(`${process.env.MEMORY_BANK}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const history = Object.values(response.data).map(entry => entry.message);

        return history;
    } catch (error) {
        console.error('Erro ao buscar histórico, inserindo historico default ', error);
        return [
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
}

async function updateHistory(newMessage) {
    try {
        await axios.post('https://gemini-remember-default-rtdb.firebaseio.com/history.json', {message: newMessage});
    } catch (error) {
        console.error('Erro ao atualizar histórico: ', error);
    }
}

module.exports = { fetchHistory, updateHistory };