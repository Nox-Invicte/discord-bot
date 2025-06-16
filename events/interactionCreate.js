const { Events, MessageFlags } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isModalSubmit()) {
			if (interaction.customId === 'apply') {
				const nameValue = interaction.fields.getTextInputValue('name');
				const whyValue = interaction.fields.getTextInputValue('why');
				const factionsValue = interaction.fields.getTextInputValue('factions');
				const reasonValue = interaction.fields.getTextInputValue('reason');

				console.log(`Name: ${nameValue}`);
				console.log(`Why: ${whyValue}`);
				console.log(`Factions: ${factionsValue}`);
				console.log(`Reason: ${reasonValue}`);

				// Send DM to guild owner
				try {
					const ownerId = interaction.guild.ownerId;
					const owner = await interaction.client.users.fetch(ownerId);
					await owner.send(
						`# New Mod Application Received:\n` +
						`## Name:\n${nameValue}\n\n` +
						`## Why:\n ${whyValue}\n\n` +
						`## Factions:\n ${factionsValue}\n\n` +
						`## Reason:\n ${reasonValue}`
					);
				} catch (error) {
					console.error('Failed to send DM to guild owner:', error);
				}

				await interaction.reply({
					content: `Thank you for your application, ${nameValue}! Your responses have been recorded.`,
					ephemeral: true
				});
				return;
			}
		}

		if (interaction.isButton()) {
			if (interaction.customId === 'invite') {
				const inviteLink = process.env.INVITE; // Ensure you have the invite link in your environment variables
				await interaction.reply({ content: `Click [here](${inviteLink}) to invite me to your server!`, flags: MessageFlags.Ephemeral });
				return;
			}
		}

		if (!interaction.isChatInputCommand()) return;

		// Check if the command is run in a DM
		if (!interaction.guild) {
			await interaction.reply({ content: 'Commands can only be run in Servers', flags: MessageFlags.Ephemeral });
			return;
		}

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
	},
};
