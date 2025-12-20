const mongoose = require('mongoose');

const databaseConnection = async (url) => {
    try{
        await mongoose.connect(url);
        console.log('database is connected successfully');
    }catch(error){
        console.error('database is failed to connect');
        throw error;
    }
}

module.exports = databaseConnection;