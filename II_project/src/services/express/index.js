const express = require('express');
// const cors = require('cors'); //cross-origin requests

const createServer = (routing, {port}) => {
    const app = express();
    // app.use(cors());
    app.use(express.json()); 
    app.use(routing); //app.use('/api', routing); 
    
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`); 
    });
    // return app;
}

module.exports = createServer;