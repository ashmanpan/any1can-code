const express = require('express');
const expressWs = require('express-ws');
const pty = require('node-pty');
const path = require('path');

const app = express();
expressWs(app);

app.use(express.static('public'));

// WebSocket endpoint for terminal
app.ws('/terminal', (ws, req) => {
    console.log('Terminal connection established');

    // Spawn a pseudo-terminal
    const shell = pty.spawn('bash', [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });

    // Send terminal output to client
    shell.on('data', (data) => {
        try {
            ws.send(data);
        } catch (ex) {
            // Client disconnected
        }
    });

    // Receive input from client
    ws.on('message', (msg) => {
        shell.write(msg);
    });

    ws.on('close', () => {
        shell.kill();
        console.log('Terminal connection closed');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Terminal server running on http://localhost:${PORT}`);
});