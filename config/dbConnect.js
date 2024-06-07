const mongoose = require('mongoose');

const dbConnect = () => {
    const uri ="mongodb+srv://bikash:bikash@cluster0.d6mqmni.mongodb.net"
    if (!uri) {
        throw new Error('MONGODB_URI environment variable is not defined');
    }
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = dbConnect