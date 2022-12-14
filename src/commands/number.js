const BaseSlashCommand = require('../utils/BaseSlashCommand');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const url = 'http://numbersapi.com/random?json=true';
const axios = require('axios').default;
axios.defaults.headers['content-type'] = 'text/plain';

module.exports = class NumberCommand extends BaseSlashCommand {
  constructor() {
    super('number');
  }

  async run(client, interaction) {
    await interaction.deferReply();
    try {
      //await interaction.editReply({ content: 'Flipping...' });
      let { data } = await axios.get(url);
      const res =
        data && data.found
          ? data.text
          : 'Couldnt find a random fact to give.. :(';
      return interaction.editReply({
        content: res,
      });
    } catch (error) {
      console.log(error);
      return interaction.editReply({
        content: 'Couldnt find a dad joke.. :(',
      });
    }
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription('Get a random number fact.')
      .toJSON();
  }
};
