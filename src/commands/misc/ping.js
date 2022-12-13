const BaseSlashCommand = require('../../utils/BaseSlashCommand');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class PingCommand extends BaseSlashCommand {
  constructor() {
    super('ping');
  }

  async run(client, interaction) {
    try {
      let time = Date.now();
      await interaction.deferReply();
      return interaction.editReply({
        content: `Pong! ${Date.now() - time} ms`,
      });
    } catch (error) {
      console.log(error);
      return interaction.reply({
        content:
          'There was an error while handling your request, please let an admin know. ',
      });
    }
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("test the bot's responsiveness")
      .toJSON();
  }
};
