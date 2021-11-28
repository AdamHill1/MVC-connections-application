const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    topic: {type: String, required: [true, 'topic is required']},
    title: {type: String, required: [true, 'title is required']},
    host: {type: Schema.Types.ObjectId, ref:'User'},
    details: {type: String, required: [true, 'details is required'], 
                minLength: [10, 'the content should have at least 10 characters']},
    location: {type: String, required: [true, 'location is required']},
    date: {type: String, required: [true, 'date is required']},
    startTime: {type: String, required: [true, 'startTime is not set']},
    startM: {type: String, required: [true, 'startM is required']},
    endTime: {type: String, required: [true, 'endTime is not set']},
    endM: {type: String, required: [true, 'endM is required']},
    image: {type: String, required: [true, 'image is required']},
},
{timestamps: true}
);
//collection name is stories in the database
module.exports = mongoose.model('sports', connectionSchema);





















/*const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');
const connection = [
    {
        id: "1",
        topic: "Boys",
        title: "Boys Practice 11-14",
        host: "Adam",
        details: "Boys ages 11 to 14 can come and show off their skills. They will also be trained on some new skills and to help fix bad habits they might have.",
        location: "1000 E Morehead St, Charlotte, NC 28204",
        date: "2021-06-12",
        startTime: "5:00 AM",
        startM: "05:00",
        endTime: "6:00 AM",
        endM: "06:00",
        image: "https://www.pennlive.com/resizer/Klg4lhjU2RaV_znAMPAQlaiW6aQ=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/ETXGIBKNRFBL3G6FGHYZOJXIAQ.jpg"
    },
    {
        id: "2",
        topic: "Boys",
        title: "Boys Practice 6-10",
        host: "Adam",
        details: "Boys ages 6 to 10 can come and show off their skills. They will also be trained on some new skills and to help fix bad habits they might have.",
        location: "1000 E Morehead St, Charlotte, NC 28204",
        date: "2021-07-12",
        startTime: "5:00 AM",
        startM: "05:00",
        endTime: "6:00 AM",
        endM: "06:00",
        image: "https://www.localsyr.com/wp-content/uploads/sites/63/2021/08/Devendorf-Basketball-Camp.jpg?w=600&h=600&crop=1"
    },
    {
        id: "3",
        topic: "Boys",
        title: "Boys Practice 15-18",
        host: "Adam",
        details: "Boys ages 15 to 18 can come and show off their skills. They will also be trained on some new skills and to help fix bad habits they might have.",
        location: "1000 E Morehead St, Charlotte, NC 28204",
        date: "2021-08-12",
        startTime: "5:00 AM",
        startM: "05:00",
        endTime: "6:00 AM",
        endM: "06:00",
        image: "https://bristolsport.azureedge.net/media/45808/jmp_bristol_flyers_half_term_camp_rs_055.jpg?w=753&h=565&mode=crop&scale=both&quality=80"
    },
    {
        id: "4",
        topic: "Girls",
        title: "Girls Practice 15-18",
        host: "Adam",
        details: "Girls ages 15 to 18 can come and show off their skills. They will also be trained on some new skills and to help fix bad habits they might have.",
        location: "1000 E Morehead St, Charlotte, NC 28204",
        date: "2021-09-12",
        startTime: "5:00 AM",
        startM: "05:00",
        endTime: "6:00 AM",
        endM: "06:00",
        image: "https://static01.nyt.com/images/2015/01/17/business/jpWealth/jpWealth-superJumbo.jpg"
    },
    {
        id: "5",
        topic: "Girls",
        title: "Girls Practice 11-14",
        host: "Adam",
        details: "Girls ages 11 to 14 can come and show off their skills. They will also be trained on some new skills and to help fix bad habits they might have.",
        location: "1000 E Morehead St, Charlotte, NC 28204",
        date: "2021-09-15",
        startTime: "5:00 AM",
        startM: "05:00",
        endTime: "6:00 AM",
        endM: "06:00",
        image: "https://www.nyurban.com/wp-content/uploads/2018/08/DSC1642-001-649x435.jpg"

    },
    {
        id: "6",
        topic: "Girls",
        title: "Girls Practice 6-10",
        host: "Adam",
        details: "Girls ages 6 to 10 can come and show off their skills. They will also be trained on some new skills and to help fix bad habits they might have.",
        location: "1000 E Morehead St, Charlotte, NC 28204",
        date: "2021-09-12",
        startTime: "5:00 AM",
        startM: "05:00",
        endTime: "6:00 AM",
        endM: "06:00",
        image: "https://www.laparks.org/sites/default/files/facility/rosecrans-recreation-center/images/rosecrans-gym-floor-34.jpg"
    }
];


exports.find = () => connection;

exports.findById = id => connection.find(connections => connections.id === id);

exports.save = function(connections) {
    var t = connections.startM.split(':');
        connections.startTime = DateTime.local(2021,10,10, parseInt(t[0]), parseInt(t[1])).toLocaleString(DateTime.TIME_SIMPLE);
        t = connections.endM.split(':');
        connections.endTime = DateTime.local(2021,10,10, parseInt(t[0]), parseInt(t[1])).toLocaleString(DateTime.TIME_SIMPLE);
    connections.id = uuidv4();
    connection.push(connections);
};

exports.updateById = function(id, newConnections){
    let connections = connection.find(connection => connection.id === id);
    if(connections){
        connections.topic = newConnections.topic
        connections.title = newConnections.title
        connections.host = newConnections.host
        connections.details = newConnections.details
        connections.location = newConnections.location
        connections.date = newConnections.date
        connections.startM = newConnections.startM
        connections.endM = newConnections.endM
        connections.image = newConnections.image

        var t = connections.startM.split(':');
        connections.startTime = DateTime.local(2021,10,10, parseInt(t[0]), parseInt(t[1])).toLocaleString(DateTime.TIME_SIMPLE);
        t = connections.endM.split(':');
        connections.endTime = DateTime.local(2021,10,10, parseInt(t[0]), parseInt(t[1])).toLocaleString(DateTime.TIME_SIMPLE);

    return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id){
    let index = connection.findIndex(connection => connection.id === id);
    if(index !== -1){
        connection.splice(index, 1);
        return true;
    } else{
        return false;
    }
}
*/