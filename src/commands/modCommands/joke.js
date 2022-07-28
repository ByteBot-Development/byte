import { SlashCommandBuilder }  from '@discordjs/builders'
import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import {inspect} from 'util';
const kick = {
    data: new SlashCommandBuilder()
    .setName(`joke`)
    .setDescription(`Tells you a joke`),
    async run(client,interaction){
     fetch(`https://icanhazdadjoke.com/slack`,{
        method: `GET`
     }).then(async data => {
        let sus = await data.json()
   //    console.log(sus.attachments[0].text)
        await interaction.reply({
            embeds: [
              new MessageEmbed()
              .setTitle(`Joke`)
               .setDescription(sus?.attachments[0].text) 
              .setColor(`RANDOM`)
              .setFooter({
                text: interaction.user.username,
                iconURL: interaction.member.displayAvatarURL()
              })
            ]
        })
     })

    
    }
}
export default kick;