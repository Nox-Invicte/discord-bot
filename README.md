# discord-bot

discord-bot is a versatile Discord bot built with discord.js, designed to provide a variety of utility commands and event-driven features to enhance your Discord server experience.

## Features

- Modular command system with a variety of utility commands such as 8ball, embed messages, user info, moderation commands (kick), and more.
- Event handling for seamless interaction with Discord events.
- Easy to extend with additional commands and event handlers.
- Uses environment variables for secure configuration.

## Commands Overview

The bot includes several utility commands located in the `commands/utility` directory, including but not limited to:

- `8ball` - Ask the magic 8ball a question.
- `embed` - Create rich embedded messages.
- `help` - Display help information about commands.
- `intro` - Introduction or welcome messages.
- `invite` - Generate an invite link for the bot.
- `kick` - Kick a user from the server.
- `ping` - Check the bot's latency.
- `modals` - Handle modal interactions.
- `server` - Server-related commands.
- `user` - User information commands.
- `announce` - Make announcements in channels.

## Getting Started

To run the bot, you will need to have Node.js installed and set up environment variables for your Discord bot token and other necessary IDs.

The bot's main entry point is `bot.js`, which loads commands and event handlers dynamically.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the bot.

## License

This project is licensed under the ISC License.
