import { SlashCommandBuilder } from '@discordjs/builders';
import config from '../../config.js';
import util from 'util';
import { MessageEmbed } from 'discord.js'
export const evalcmd = {
	data: new SlashCommandBuilder()
		.setName(`eval`)
		.setDescription(`Evaluates the given code`)
		.addStringOption((code) => code.setName(`code`).setDescription(`Code to be evaled`).setRequired(true)),

	async run(client, interaction) {
		if (!config.devs.includes(interaction.user.id))
			return await interaction.reply({
				content: `This command can only be used by developers!`,
				ephemeral: true,
			});

		let code = interaction.options.getString(`code`);

		try {

		 	if (code.includes(`.send`) || code.includes(`reply`)) {
				let tokenCheck = code.split(`.send`)[1] ?? code.split(`.reply`)[1];
				let checkEvaled = eval(tokenCheck);

				if (checkEvaled && checkEvaled.includes(client.token))
					return await interaction.reply({
						content: `Code was not executed because a token leak was detected in it!`,
						ephemeral: true,
					});
			} 

          
            code = code.replace(`token`, "[Something Important]")
            let output;

			let evaled = await eval(code);

			 output = evaled;

            if(!evaled || evaled == `undefined` || evaled == null) output = `\`\`\`fix\nNo output\n\`\`\``
            
            
            if(evaled && evaled.type !== `string`){
                output = `\`\`\`js\n` + util.inspect(output) + `\n\`\`\``
            }

            console.log(output, evaled)

            if(output.length > 1024){
                output = `\`\`\`fix\nLarge Output ~ ${output.length} characters!\n\`\`\``
            }
              try{
            await interaction.reply({
                embeds:[
                    new MessageEmbed()
                    .setTitle(`Evaled`)
                    .setDescription(`\`\`\`js\n${code}\n\`\`\``)
                    .addField(`Output`, output)
                    .setColor(`GREEN`)
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({dynamic: true})
                    })
                ]
            }) 

        } catch {
            await interaction.followUp({
                embeds:[
                    new MessageEmbed()
                    .setTitle(`Evaled`)
                    .setDescription(`\`\`\`js\n${code}\n\`\`\``)
                    .addField(`Output`, output)
                    .setColor(`GREEN`)
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({dynamic: true})
                    })
                ]
            })
        }
           
		} catch (err1) {
              return await interaction.reply({
                    embeds:[
                        new MessageEmbed()
                        .setTitle(`Error`)
                        .setDescription(`\`\`\`js\n${code}\n\`\`\``)
                        .addField(`Output`, `\`\`\`js\n${err1}\n\`\`\``)
                        .setColor(`RED`)
                        .setFooter({
                            text: interaction.user.tag,
                            iconURL: interaction.user.displayAvatarURL({dynamic: true})
                        })
                    ]
                }) 
                
            
        }
	},
};
