const {SlashCommandBuilder,ActionRowBuilder,ModalBuilder,TextInputBuilder,TextInputStyle, MessageFlags} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("apply")
    .setDescription("Apply for Mod"),

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setTitle("Mod Application")
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
      .setLabel("Why do you wish to become Mod?")
      .setStyle(TextInputStyle.Paragraph)
      .setValue('Default');

    const factions = new TextInputBuilder()
      .setCustomId("factions")
      .setRequired(true)
      .setLabel("which factions were you part of as a mod?")
      .setStyle(TextInputStyle.Paragraph)
      .setValue('Default');

    const reason = new TextInputBuilder()
      .setCustomId("reason")
      .setRequired(true)
      .setLabel("What will you do as a mod?")
      .setStyle(TextInputStyle.Paragraph)
      .setValue('Default');

    const firstactionrow = new ActionRowBuilder().addComponents(name);
    const secondactionrow = new ActionRowBuilder().addComponents(why);
    const thirdactionrow = new ActionRowBuilder().addComponents(factions);
    const fourthactionrow = new ActionRowBuilder().addComponents(reason);

    modal.addComponents(
      firstactionrow,
      secondactionrow,
      thirdactionrow,
      fourthactionrow
    );
    await interaction.showModal(modal);
    console.log(`Modal shown: ${interaction.customId}`);

	if (!interaction.isModalSubmit()) return;
	console.log(`Modal submitted: ${interaction.customId}`);

  async function handleModalSubmit(interaction) {
    if (interaction.customId === 'apply') {
      const nameValue = interaction.fields.getTextInputValue('name');
      const whyValue = interaction.fields.getTextInputValue('why');
      const factionsValue = interaction.fields.getTextInputValue('factions');
      const reasonValue = interaction.fields.getTextInputValue('reason');

      console.log(`Name: ${nameValue}`);
      console.log(`Why: ${whyValue}`);
      console.log(`Factions: ${factionsValue}`);
      console.log(`Reason: ${reasonValue}`);

      await interaction.reply({
        content: `Thank you for your application, ${nameValue}! Your responses have been recorded.`,
        flags: MessageFlags.Ephemeral
      });
    }
  }

  await handleModalSubmit(interaction);

    // Uncomment the following block if you want to handle modal submission
    // directly in this file instead of using the event listener.


	/*
	if (interaction.isModalSubmit() && interaction.customId === 'apply') {
		const nameValue = interaction.fields.getTextInputValue('name');
		const whyValue = interaction.fields.getTextInputValue('why');
		const factionsValue = interaction.fields.getTextInputValue('factions');
		const reasonValue = interaction.fields.getTextInputValue('reason');

		console.log(`Name: ${nameValue}`);
		console.log(`Why: ${whyValue}`);
		console.log(`Factions: ${factionsValue}`);
		console.log(`Reason: ${reasonValue}`);

		await interaction.reply({
			content: `Thank you for your application, ${nameValue}! Your responses have been recorded.`,
			ephemeral: true
		});
	}*/
  }
};