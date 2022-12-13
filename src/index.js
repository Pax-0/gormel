require('dotenv').config();
const { Client, Routes, Collection, GatewayIntentBits } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');

const { BOT_TOKEN, APP_ID } = process.env;
const client = new Client({
  intents: [],
  rest: { version: '10' },
});

client.rest.setToken(BOT_TOKEN);

async function main() {
  try {
    client.slashCommands = new Collection();

    await registerCommands(client, '../commands');
    console.log(client.slashCommands.map((c) => c.name));
    const slashCommandsJson = client.slashCommands.map((cmd) =>
      cmd.getSlashCommandJSON()
    );
    //console.log(slashCommandsJson);
    await client.rest.put(Routes.applicationCommands(APP_ID), {
      body: slashCommandsJson,
    });
    registerEvents(__dirname, client);

    await client.login(BOT_TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
