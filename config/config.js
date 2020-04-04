module.exports = { // db from mongodb.com
    port: process.env.PORT || 5000,
    mongoUri: 'mongodb+srv://login:password@cluster0-v5uip.azure.mongodb.net/bd?retryWrites=true&w=majority',
    jwtSecret: 'secret string',
};
