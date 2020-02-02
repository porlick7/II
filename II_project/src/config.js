const env = process.env.NODE_EVN || 'development'; //srodowisko developmentu kodu zwracanewprzypadku

if(env === 'test') return module.exports = require('./config.test')
else if(env === 'development') return module.exports = require('./config.dev')

throw new Error('not known ENV') 