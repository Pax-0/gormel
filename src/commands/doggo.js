const BaseSlashCommand = require('../utils/BaseSlashCommand');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const doggoAPI = 'https://api.thedogapi.com/v1/images/search';
const axios = require('axios').default;
const { doggoAPIKey } = require('../../config.json');
axios.defaults.headers['x-api-key'] = doggoAPIKey;

module.exports = class DoggoCommand extends BaseSlashCommand {
  constructor() {
    super('doggo');
  }

  async run(client, interaction) {
    await interaction.deferReply();
    try {
      await interaction.editReply({ content: 'Looking for a doggo...' });
      const { data } = await axios.get(doggoAPI);

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
        content: 'Couldnt find a good doggo.. :(',
      });
    }
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription('Looking for a doggo pic to boost your mood?')
      .toJSON();
  }
};
