const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');

const TelegramBot = require('node-telegram-bot-api');

console.log(process.env.BOT_TOKEN);

// Token fetched using @BotFather to create a new bot
const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, {polling: true}); // polling: true means the bot will check for new messages. is any new message

bot.on('message', (msg) => {
    const text  = msg.text;
    console.log('Message received: ', text);
    bot.sendMessage(msg.chat.id, "You said: " + text)
    .catch(err => console.error('Error sending message:', err));

})

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello! I am a bot. How can I assist you today?")
})

bot.onText(/\/joke/, async (msg) => {
    const joke = await axios.get('https://official-joke-api.appspot.com/random_joke');

    const setup = joke.data.setup;
    const punchline = joke.data.punchline;

    bot.sendMessage(msg.chat.id, setup + " "+ punchline);
})


