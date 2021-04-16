const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let applisting = new Schema({
    appId: { type : String},
    icon: { type : String},
    developer: { type : String},
    score: { type : String},
    title: { type : String},
}, { collection: 'appList', timestamps: true, collation: { locale: 'en', strength: 1 } })

let appList = mongoose.model('appList', applisting);
module.exports = appList;