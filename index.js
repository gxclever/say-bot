require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`🤖 로그인 완료: ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.id !== process.env.CLIENT_ID) return;
  if (!message.content.startsWith('!채팅')) return;

  const text = message.content.replace('!채팅', '').trim();
  if (text.length > 0) {
    message.channel.send(text);
    message.delete().catch(() => {});
  }
});

client.login(process.env.TOKEN);
