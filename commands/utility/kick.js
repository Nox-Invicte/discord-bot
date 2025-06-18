const {SlashCommandBuilder, MessageFlags} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want to kick.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for kicking the user'))
        .setDefaultMemberPermissions(0x00000002), // Only allow users with the 'Kick Members' permission to use this command

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);
        if (interaction.member.permissions.has('KickMembers')) {
            if (!member) {
                return interaction.reply({ content: 'User not found in this server.', flags: MessageFlags.Ephemeral });
            }
            if (member.user.bot) {
                return interaction.reply({ content: 'I cannot kick bots.', flags: MessageFlags.Ephemeral });
            }
            if (member.user.id === interaction.guild.ownerId) {
                return interaction.reply({ content: 'You cannot kick the server owner.', flags: MessageFlags.Ephemeral });
            }
            if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                return interaction.reply({ content: 'You cannot kick a member with a higher or equal role.', flags: MessageFlags.Ephemeral });
            }
            if (!member.kickable) {
                return interaction.reply({ content: 'I cannot kick this user. They might have a higher role or I lack permissions.', flags: MessageFlags.Ephemeral });
            }
            if (member.id === interaction.user.id) {
                return interaction.reply({ content: 'You cannot kick yourself.', flags: MessageFlags.Ephemeral });
            }
            if (member.id === interaction.client.user.id) {
                return interaction.reply({ content: 'I cannot kick myself.', flags: MessageFlags.Ephemeral });
            }
            
            try {
                await member.kick({ reason: reason });
                console.log(`Kicked ${user.tag} from the server. Reason: ${reason}`);
                await interaction.reply({ content: `Successfully kicked ${user.tag} from the server. \nReason: ${reason}` });
            } catch (error) {
                console.error('Error kicking member:', error);
                await interaction.reply({ content: 'There was an error trying to kick this user.', flags: MessageFlags.Ephemeral });
            }
        }
        else {
            console.log(`User ${interaction.user.tag} attempted to use the kick command without permission.`);
            console.log(`User ID: ${interaction.user.id}`);
            console.log(`Guild ID: ${interaction.guild.id}`);
            console.log(`Command: ${interaction.commandName}`);
            console.log(`Timestamp: ${new Date().toISOString()}`);
            console.log(interaction.guild.members.ownerId);
            return interaction.reply({ content: 'You do not have permission to use this command.', flags: MessageFlags.Ephemeral });
        }
    },
};
