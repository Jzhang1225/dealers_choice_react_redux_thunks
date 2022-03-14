const express = require('express');
const app = express();
const path = require('path');
const { init } = require('./db/database')

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/api/people', require('./routes'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

const startUp = async() =>{
    await init();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
};

startUp();