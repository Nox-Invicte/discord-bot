const {SlashCommandBuilder} = require('discord.js');

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
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Magic 8-Ball')
            .addField('Question', question)
            .addField('Answer', randomAnswer)
            .setTimestamp()
            .setFooter({ text: 'Ask your question!' });
        await interaction.reply({ embeds: [embed] });
    },
};