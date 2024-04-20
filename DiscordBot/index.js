require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const TOKEN = process.env.DISCORD_TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  console.log(message.content);
});
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.includes("candidate")) {
    message.reply({
      content: "please use register as candidate command",
    });
    return;
  }
  if (message.content.includes("voter")) {
    message.reply({
      content: "please use register as voter command",
    });
    return;
  }
  if (message.content.includes("vote")) {
    message.reply({
      content: "please use castvote command",
    });
    return;
  }
  message.reply({
    content: "hlo from bot",
  });
});

client.on("interactionCreate", (interaction) => {
  if (interaction.commandName === "iselectionactive") {
    console.log(interaction.commandName);
    interaction.reply(
      "yes! would you like to register as a candidate or voter"
    );
    return;
  }
  console.log(interaction.commandName);
  interaction.reply("pong!");
});

client.login(TOKEN);
