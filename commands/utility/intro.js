const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('intro')
        .setDescription('Provides a brief introduction to the bot and its features.'),
    async execute(interaction) {
        await interaction.reply(`Hello! I am ${interaction.client.user.username}, a bot designed by ${interaction.client.user.id}`);
    }
};
// This command provides a brief introduction to the bot and its features.