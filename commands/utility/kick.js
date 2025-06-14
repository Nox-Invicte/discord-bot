const {SlashCommandBuilder} = require('discord.js');

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
        if (guild.members.ownerId === interaction.user.id) {
            if (!member) {
                return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
            }
            if (member.user.bot) {
                return interaction.reply({ content: 'I cannot kick bots.', ephemeral: true });
            }
            if (member.user.id === interaction.guild.ownerId) {
                return interaction.reply({ content: 'You cannot kick the server owner.', ephemeral: true });
            }
            if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                return interaction.reply({ content: 'You cannot kick a member with a higher or equal role.', ephemeral: true });
            }
            if (!member.kickable) {
                return interaction.reply({ content: 'I cannot kick this user. They might have a higher role or I lack permissions.', ephemeral: true });
            }
            if (member.id === interaction.user.id) {
                return interaction.reply({ content: 'You cannot kick yourself.', ephemeral: true });
            }
            if (member.id === interaction.client.user.id) {
                return interaction.reply({ content: 'I cannot kick myself.', ephemeral: true });
            }
            
            try {
                await member.kick({ reason: reason });
                console.log(`Kicked ${user.tag} from the server. Reason: ${reason}`);
                await interaction.reply({ content: `Successfully kicked ${user.tag} from the server. \nReason: ${reason}`, ephemeral: false });
            } catch (error) {
                console.error('Error kicking member:', error);
                await interaction.reply({ content: 'There was an error trying to kick this user.', ephemeral: true });
            }
        }
        else {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }
    },
};
