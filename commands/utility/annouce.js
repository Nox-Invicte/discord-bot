const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('Announce something to the server.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message you want to announce.')
                .setRequired(true)),
	async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(':loudspeaker: Announcement :loudspeaker:')
            .setDescription(interaction.options.getString('message'))
            .setTimestamp()
            .setFooter({ text: 'Announcement from ' + interaction.user.username });
		await interaction.reply({embeds: [embed]});
	},
};