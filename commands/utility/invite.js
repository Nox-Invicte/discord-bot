const {SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, MessageFlags} = require('discord.js');
const {invite} = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Get the bot invite link.'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Poseidon Invite Link')
                .setDescription(`Hello! I am ${interaction.client.user.username}, a bot designed by Nox_Invicte. \nClick the button below to invite me to your server.`)
                .setThumbnail(interaction.client.user.displayAvatarURL()) // Replace with your bot's avatar URL
                .setURL(invite)
                .setFooter({ text: 'Thank you for inviting me!' });
            const button = new ButtonBuilder()
            .setCustomId("invite") // Set a custom ID for the button (not used in this case, but can be useful for future interactions)
            .setLabel('Invite')
            .setStyle(ButtonStyle.Primary)
           // .setURL(invite); // Set the URL for the button to redirect to the invite link

        // Create an action row and add the button to it
            const row = new ActionRowBuilder()
                .addComponents(button);

            await interaction.reply({embeds: [embed], components: [row]});
        } catch (error) {
            console.error('Error sending invite link:', error);
            await interaction.reply({ content: 'There was an error trying to send the invite link.', flags: MessageFlags.Ephemeral });
        }
    },
};