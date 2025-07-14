require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on('ready', () => {
  console.log(`🤖 로그인 완료: ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== '채팅') return;
  if (interaction.user.id !== process.env.OWNER_ID) {
    return interaction.reply({ content: '이 명령어는 관리자만 사용할 수 있어요.', ephemeral: true });
  }

  const text = interaction.options.getString('내용');

  // 🟢 명령어 입력자는 아무 반응 안 보임
  await interaction.deferReply({ ephemeral: true });

  // 🟢 봇만 자연스럽게 채널에 출력
  await interaction.channel.send(text);
});

client.login(process.env.TOKEN);
