const {SlashCommandBuilder,ActionRowBuilder,ModalBuilder,TextInputBuilder,TextInputStyle} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apply")
    .setDescription("Apply for TVCO"),

  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setTitle("TVCO Application")
      .setCustomId('apply');

    const name = new TextInputBuilder()
      .setCustomId("name")
      .setRequired(true)
      .setLabel("Username")
      .setStyle(TextInputStyle.Short)
      .setValue('Default');

    const why = new TextInputBuilder()
      .setCustomId("why")
      .setRequired(true)
      .setLabel("Why do you wish to join?")
      .setStyle(TextInputStyle.Paragraph)
      .setValue('Default');

    const factions = new TextInputBuilder()
      .setCustomId("factions")
      .setRequired(true)
      .setLabel("What factions are you in or were in?")
      .setStyle(TextInputStyle.Paragraph)
      .setValue('Default');

    const profilelink = new TextInputBuilder()
      .setCustomId("proflielink")
      .setRequired(true)
      .setLabel("Please provide your profile link.")
      .setStyle(TextInputStyle.Short)
      .setValue('Default');

    const firstactionrow = new ActionRowBuilder().addComponents(name);
    const secondactionrow = new ActionRowBuilder().addComponents(why);
    const thirdactionrow = new ActionRowBuilder().addComponents(factions);
    const fourthactionrow = new ActionRowBuilder().addComponents(profilelink);

    modal.addComponents(
      firstactionrow,
      secondactionrow,
      thirdactionrow,
      fourthactionrow
    );
    interaction.showModal(modal);
  }
};