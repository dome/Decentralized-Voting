const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "iselectionactive",
    description: "Tell if the Election is active or not.",
  },
  {
    name: "registerascandidate",
    description: "Register with candidate address",
    options: [
      {
        name: "address",
        description: "Your address",
        type: 3, // 3 represents string type for the address
        required: true,
      },
    ],
  },
  {
    name: "castvote",
    description: "cast vote to an address",
    options: [
      {
        name: "address",
        description: "add candidate address to vote",
        type: 3, // 3 represents string type for the address
        required: true,
      },
    ],
  },
  {
    name: "registerasvoter",
    description: "Register with voter address",
    options: [
      {
        name: "address",
        description: "Your address",
        type: 3, // 3 represents string type for the address
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken("add your token here");
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("add your app id here"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
