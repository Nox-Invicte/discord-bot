const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild

		function formatDuration(ms) {
			const seconds = Math.floor(ms / 1000);
			const minutes = Math.floor(seconds / 60);
			const hours = Math.floor(minutes / 60);
			const days = Math.floor(hours / 24);
			const years = Math.floor(days / 365);
			const months = Math.floor((days % 365) / 30);
			const remainingDays = (days % 365) % 30;
			let result = '';
			if (years > 0) result += years + ' years ';
			if (months > 0) result += months + ' months ';
			result += remainingDays + ' days';
			return result;
		}

		embed = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle(interaction.user.tag+"'s Information")
			.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
		.addFields(
			{ name: '**User ID :**', value: interaction.user.id, inline: true },
			{ name: '**Avatar :**', value: `[Link](${interaction.user.displayAvatarURL({ dynamic: true })})`, inline: true },
			{ name: '**Account Created :**', value: interaction.user.createdAt.toDateString(), inline: true }
		)
		.addFields(
			{ name: '**Joined Server :**', value: interaction.member.joinedAt.toDateString(), inline: true },
			{ name: '**Account Age :**', value: formatDuration(Date.now() - interaction.user.createdAt), inline: true },
			{ name: '**Server Age :**', value: formatDuration(Date.now() - interaction.member.joinedAt), inline: true }
		)
		.setFooter({ text: 'User Information' })
		.setTimestamp();
		// The embed includes the user's username, user ID, and the date they joined the server.
		await interaction.reply({ embeds: [embed] });
	},
};
// This command provides basic information about the user who invoked it.
// It uses interaction.user to get the User object and interaction.member to get the GuildMember object.