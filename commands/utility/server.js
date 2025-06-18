const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		const server = interaction.guild;
		const embed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle('Server Information')
		.addFields(
			{ name: 'Server Name', value: server.name, inline: true },
			{ name: 'Member Count', value: server.memberCount.toString(), inline: true },
			{ name: 'Created At', value: server.createdAt.toDateString(), inline: true },
			{ name: 'Owner', value: `<@${server.ownerId}>`, inline: true }
		)
		.setThumbnail(server.iconURL() || '')
		.setTimestamp()
		await interaction.reply({ embeds: [embed] });

		// interaction.guild is the object representing the Guild in which the command was run
		
	},
};
// This command provides basic information about the server where the command was invoked.
// It uses interaction.guild to get the Guild object, which contains information about the server.