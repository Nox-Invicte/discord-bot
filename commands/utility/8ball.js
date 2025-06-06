const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask a question and get an answer from the magic 8-ball.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question you want to ask the magic 8-ball.')
                .setRequired(true)),
                
    async execute(interaction) {
        const question = interaction.options.getString('question'); 
        const answers = ['yes', 'no', 'maybe', 'definitely', 'ask again later', 'absolutely not', 'certainly', 'probably not'];
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Magic 8-Ball')
            .addFields(
                { name: 'Question', value: question },
                { name: 'Answer', value: randomAnswer }
            )
            .setTimestamp()
            .setFooter({ text: 'Ask your question!' });
        await interaction.reply({ embeds: [embed] });
    },
};