const BaseSlashCommand = require('../utils/BaseSlashCommand');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const catAPI = 'https://api.thecatapi.com/v1/images/search';
const axios = require('axios').default;
const { catAPIKey } = require('../../config.json');
axios.defaults.headers['x-api-key'] = catAPIKey;

module.exports = class CatCommand extends BaseSlashCommand {
  constructor() {
    super('cat');
  }

  async run(client, interaction) {
    await interaction.deferReply();
    try {
      await interaction.editReply({ content: 'Looking for a cute cat...' });
      let { data } = await axios.get(catAPI);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.member.displayName,
          iconURL: interaction.member.displayAvatarURL(),
        })
        .setImage(data[0].url);

      return interaction.editReply({ content: 'Found one!', embeds: [embed] });
    } catch (error) {
      console.log(error);
      return interaction.editReply({
        content: 'Couldnt find a catto.. :(',
      });
    }
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription('Get a cute picture of a catto')
      .toJSON();
  }
};
