const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const commands = new Map();
// Load all commands from the commands directory
const fs = require('node:fs');
const path = require('node:path');
const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
commandFiles.forEach(file => {
    if (file === 'help.js') return; // skip this file itself to avoid recursion
    const command = require(`./${file}`);
    if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
    }
});

// Define the slash command builder

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help with the bot commands.'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Help - Available Commands')
            .setDescription('Here are the commands you can use:')
            .setTimestamp();

        // Iterate through the commands map and add each command to the embed
        // Sort commands alphabetically by name
        Array.from(commands.entries()).sort((a, b) => a[0].localeCompare(b[0])).forEach(([name, command]) => {
            embed.addFields({ name: `/${name}`, value: command.data.description || 'No description available.' });
        });

        await interaction.reply({ embeds: [embed] });
    }
};