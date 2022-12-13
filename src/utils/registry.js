const path = require('path');
const fs = require('fs/promises');

async function registerCommands(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    //console.log('File: ', file);
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory())
      await registerCommands(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Command = require(path.join(filePath, file));
      const cmd = new Command();
      client.slashCommands.set(cmd.name, cmd);
      console.log(`Registering ${cmd.name}`);
    }
  }
}

async function registerEvents(dir, client) {
  const eventsPath = path.join(dir, 'events');
  const eventFiles = await fs.readdir(eventsPath);
  eventFiles.filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

module.exports = {
  registerCommands,
  registerEvents,
};
