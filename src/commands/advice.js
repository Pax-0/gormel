const BaseSlashCommand = require('../utils/BaseSlashCommand');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const url = 'https://api.adviceslip.com/advice';
const axios = require('axios').default;

module.exports = class AdviceCommand extends BaseSlashCommand {
  constructor() {
    super('advice');
  }

  async run(client, interaction) {
    await interaction.deferReply();
    try {
      //await interaction.editReply({ content: 'Flipping...' });
      let { data } = await axios.get(url);
      //console.log(data);
      const res =
        data && data.slip
          ? data.slip.advice
          : 'Couldnt think of a good advice to give.. :(';
      return interaction.editReply({ content: res });
    } catch (error) {
      console.log(error);
      return interaction.editReply({
        content: 'Couldnt think of a good advice to give.. :(',
      });
    }
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription('Words of wisdon, ask and you shall recieve.')
      .toJSON();
  }
};
