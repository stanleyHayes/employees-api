const app = require("./app");

const keys = require("./config/keys");

const server = app.listen(keys.port, () => {
    console.log(`Server connected in ${keys.nodeENV} mode on port ${keys.port}`);
});

process.on('SIGTERM', () => {
    server.close(() => {
       console.log('Process terminated')
    });
});