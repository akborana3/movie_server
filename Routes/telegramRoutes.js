const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config()


const botToken = process.env.BOT_TOKEN
const chatId = process.env.CHAT_ID;


router.post('/send-telegram-message', async (req, res) => {
    try {
        const { title } = req.body;
        const message = `link ${title}`;
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        await axios.post(url);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending Telegram message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get-latest-telegram-message', async (req, res) => {
    try {
        const latestMessageText = await getLatestTelegramMessage(botToken, chatId);

        if (latestMessageText !== null) {
            res.status(200).json({ latestMessageText });
        } else {
            res.status(500).json({ error: 'Failed to retrieve the latest Telegram message text.' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getLatestTelegramMessage(botToken, chatId) {
    try {
        const paramsTelegram = { chat_id: chatId };
        const urlTelegram = `https://api.telegram.org/bot${botToken}/getUpdates`;
        const responseTelegram = await axios.get(urlTelegram, { params: paramsTelegram });

        if (responseTelegram.status === 200) {
            try {
                const textData = responseTelegram.data.result.slice(-1)[0].message.text;
                return textData;
            } catch (error) {
                console.error('Error parsing Telegram response or no messages found.');
                return null;
            }
        } else {
            console.error(`Error: ${responseTelegram.status} - ${responseTelegram.statusText}`);
            return null;
        }
    } catch (error) {
        console.error('Error making Telegram API request:', error.message);
        return null;
    }
}


module.exports = router;
