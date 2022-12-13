const { Events } = require('discord.js');
const {
  unverifiedRoleID,
  verifyChannelID,
  welcomeMessage,
} = require('../../config.json');

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    if (member.user.bot) return;
    try {
      await member.roles.add(unverifiedRoleID, 'AutoRole');

      let verifyChannel = await member.guild.channels.fetch(verifyChannelID);
      const content = welcomeMessage.replace('{mention}', member.toString());

      if (verifyChannel) {
        return verifyChannel.send({ content: content });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
