const hostname = '127.0.0.1';
const port = 3000;

const app = require('../app/app');
const syncDatabase = require('./sync-database');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}.`);

    syncDatabase().then( ()=>{
        console.log('Database Sync')
    });
});