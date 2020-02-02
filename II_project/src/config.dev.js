module.exports = {
    http: {
        port: 9000,
    },
    mongoDb: {
        host: 'mongodb://localhost/tasks',
        options: {
            debug: false,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        }
    },
    jwtExpiration: "30d" 
}