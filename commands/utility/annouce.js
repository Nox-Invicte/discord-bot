const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('Announce something to the server.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message you want to announce.')
                .setRequired(true)),
	async execute(interaction) {
		await interaction.reply('## :loudspeaker: :loudspeaker: **Announcement:** \n' + interaction.options.getString('message'));
	},
};