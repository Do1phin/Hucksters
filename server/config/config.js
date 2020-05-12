const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'My secret key',
    mongoUri: 'mongodb+srv://mikhail:FXMyt2Aq52zf9qP@cluster0-v5uip.azure.mongodb.net/test?retryWrites=true&w=majority'
};

// export default config;
