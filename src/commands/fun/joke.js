import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';
import fetch from 'node-fetch';



async function fetchAndReturn(interaction, reply = true) {
  fetch(`https://icanhazdadjoke.com/slack`, {
    method: `GET`,
  }).then(async (data) => {
    let sus = await data.json();

    let reply1 = await interaction[reply ? 'reply' : 'update']({
      embeds: [
        new MessageEmbed()
          .setTitle(`Joke`)
          .setDescription(sus?.attachments[0].text)
          .setColor(`RANDOM`)
          .setFooter({
            text: interaction.user.username,
            iconURL: interaction.member.displayAvatarURL(),
          }),
      ],
      components: [
        new MessageActionRow().addComponents([
          new MessageButton()
            .setLabel(`ANOTHER!`)
            .setEmoji(`🍺`)
            .setStyle(`SECONDARY`)
            .setCustomId(`another`),
        ]),
      ],
      fetchReply: true,
    });

    let collector = reply1.createMessageComponentCollector({
      time: 50000,
//      filter,
      type: `BUTTON`,
      max: 1
    });

    collector.on(`collect`, async (i) => {
      collector.resetTimer();
      fetchAndReturn(i, false)
    });

    collector.on(`end`, async (collected, reason) => {
   if(reason === `time`){
      reply1.components[0].components[0].disabled = true;
      await reply1.edit({
        components:[reply1.components[0]]
      })
    }
    })
  });
}

const joke = {
	data: new SlashCommandBuilder()
    .setName(`joke`)
    .setDescription(`Tells you a joke`),
	async run(client, interaction) {
    fetchAndReturn(interaction)
	},
};
export default joke;