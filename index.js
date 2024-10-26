require('dotenv').config();
const { sendMessage } = require('./chatManager');
const client = require('./discordClient');
const formatTimestamp = require('./formatTimestamp');
const { updateHistory } = require('./historyData');

client.login(process.env.DISCORD_TOKEN);

client.once('ready', () => {
    console.log(`${client.user.tag} está online!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.content.startsWith('!')) return;
    if (message.channel.id !== process.env.CHANEL_ID) return;

    const prompt = message.content;
    const user = message.author.username;
    const userId = message.author.id;
    const GlobalName = message.author.globalName;

    console.log(message);

    const formattedDate = formatTimestamp(message.createdTimestamp);
    console.log(formattedDate);
    
    await message.channel.sendTyping();
    // Envia um indicador de "digitando" para o canal.
    
    await updateHistory({
        role: "user",
        parts: [{
            text: `
                date: ${formattedDate}
                channel_id: ${message.channel.id}

                GlobalName: ${GlobalName}
                userName: ${user}
                userId: ${userId}
                Menssage: ${prompt}
            `
        }]
    });

    try {
        const result = await sendMessage(prompt);
        const responseText = result.response.text(); // Definindo responseText aqui

        console.log(responseText);

        await updateHistory({ role: 'model', parts: [{ text: responseText }] });

        if (!responseText || responseText.trim() === '') {
            message.reply('[Silencio]');
        } else {
            const maxLength = 2000;
            if (responseText.length > maxLength) {
                for (let i = 0; i < responseText.length; i += maxLength) {
                    const chunk = responseText.slice(i, i + maxLength);
                    await message.reply(chunk);
                }
            } else {
                message.reply(responseText);
            }
        }

    } catch (error) {
        console.error(error);
        message.reply('Desculpe, não entendi o que você disse.');
    }
});