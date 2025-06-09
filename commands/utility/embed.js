const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Create your own embed message.')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Title of your embed.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
            .setDescription('Description of the embed message.')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL for the embed title link.'))
        .addStringOption(option =>
            option.setName('thumbnail')
            .setDescription('Thumbnail URL for the embed message.'))
        .addStringOption(option =>
            option.setName('image_url')
            .setDescription('Image URL for the embed message.')),


                
    async execute(interaction) {
        const title = interaction.options.getString('title'); 
        const url = interaction.options.getString('url');
        const desc = interaction.options.getString('description');
        const thumbnail = interaction.options.getString('thumbnail');
        const imgURL = interaction.options.getString('image_url');
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(title)
            .setURL(url??null) // Replace 'url' with a valid URL or remove this line if not needed
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL(), url: url??null }) // Replace 'name', 'iconurl', and 'url' with valid values or remove this line if not needed
            .setDescription(desc)
            .setThumbnail(thumbnail??null) // Replace 'thumbnail' with a valid thumbnail URL or remove this line if not needed
            .setImage(imgURL??null) // Replace 'imgURL' with a valid image URL or remove this line if not needed
            .setTimestamp()
        await interaction.reply({ embeds: [embed] });
    },
};