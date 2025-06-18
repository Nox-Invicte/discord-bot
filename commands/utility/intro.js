const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('intro')
        .setDescription('Provides a brief introduction to the bot and its features.'),
    async execute(interaction) {
        await interaction.reply(`Hello! I am `+`<@${interaction.client.user.id}>`+`, a bot designed by Nox_Invicte. I am here to assist you with various tasks and provide information. Here are some of my features:
- **/help**: Get a list of all available commands and their descriptions.`);
    }
};
// This command provides a brief introduction to the bot and its features.