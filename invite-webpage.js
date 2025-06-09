const http = require('http');

const invite = 'https://discord.com/oauth2/authorize?client_id=1380467869820915843&permissions=8&integration_type=0&scope=bot+applications.commands'; // Replace this with your actual invite link

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Discord Bot Invite</title>
</head>
<body>
  <h1>Invite the Discord Bot</h1>
  <p>Click the link below to invite the bot to your server:</p>
  <a href="${invite}" target="_blank" rel="noopener noreferrer">${invite}</a>
</body>
</html>
`;

console.log('Invite link:', invite);

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
