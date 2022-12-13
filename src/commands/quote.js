const BaseSlashCommand = require('../utils/BaseSlashCommand');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const url = 'https://api.fisenko.net/v1/quotes/en/random';
const axios = require('axios').default;

module.exports = class QuoteCommand extends BaseSlashCommand {
  constructor() {
    super('quote');
  }

  async run(client, interaction) {
    await interaction.deferReply();
    try {
      //await interaction.editReply({ content: 'Flipping...' });
      let { data } = await axios.get(url);

      const res = data ? data : 'Couldnt find a good quote to give.. :(';
      return interaction.editReply({
        content: `${res.text}\n\n - ${res.author.name}`,
      });
    } catch (error) {
      console.log(error);
      return interaction.editReply({
        content: 'Couldnt find a good quote to give.. :(',
      });
    }
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription('Your go-to for quotes ;)')
      .toJSON();
  }
};
