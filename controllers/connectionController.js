const model = require('../models/connection');
const sports = require('../models/connection');
const rsvpModel = require('../models/rsvp');
const { DateTime } = require("luxon");

exports.index = (req, res, next)=>{
    //res.send('send all stories');
    model.find()
    .then(connections=>res.render('./connection/index', {connections}))
    .catch(err=>next(err));
};


exports.new = (req, res)=>{
    res.render('./connection/new');
};

exports.create = (req, res, next)=>{
    let test = req.body

    var t = test.startM.split(':');
    test.startTime = DateTime.local(2021,10,10, parseInt(t[0]), parseInt(t[1])).toLocaleString(DateTime.TIME_SIMPLE);
    t = test.endM.split(':');
    test.endTime = DateTime.local(2021,10,10, parseInt(t[0]), parseInt(t[1])).toLocaleString(DateTime.TIME_SIMPLE);

    //res.send('Created a new story');
    let sports =  new model(test);//create a new story doc
    sports.host = req.session.user;
    sports.save()//insert doc to database
    .then((sports)=>res.redirect('/connection'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
            req.flash('error', 'Database validation fail');
            res.redirect('back');
        }
        next(err);
    });
};

exports.show = (req, res, next)=>{
    let id = req.params.id;

    Promise.all([model.findById(id).populate('host', 'firstName lastName'), rsvpModel.count({connection:id, rsvp:"YES"})])
    .then(results=>{
        const [sports, rsvps] = results;
        if(sports) {
           return res.render('./connection/show', {sports, rsvps});
        } else {
            let err = new Error('Cannot find a connections with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(sports=>{
        if(sports) {
           return  res.render('./connection/edit', {sports});
        } else {
            let err = new Error('Cannot find a connections with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let sports = req.body;
    let id = req.params.id;

    var t = sports.startM.split(':');
        sports.startTime = DateTime.local(2021,10,10, parseInt(t[0]), parseInt(t[1])).toLocaleString(DateTime.TIME_SIMPLE);
        t = sports.endM.split(':');
        sports.endTime = DateTime.local(2021,10,10, parseInt(t[0]), parseInt(t[1])).toLocaleString(DateTime.TIME_SIMPLE);

    model.findByIdAndUpdate(id, sports, {useFindAndModify: false, runValidators: true})
    .then(sports=>{
        if(sports) {
            res.redirect('/connection/'+id); 
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
           }
    })
    .catch(err=> {
        if(err.name === 'ValidationError')
            err.status = 404;
            req.flash('error', 'Database validation fail');
            res.redirect('back');
        next(err)
    });
};
   

exports.delete = (req, res, next)=>{
    let id = req.params.id;

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(sports=>{
        if(sports){
            res.redirect('/connection');
        } else {
            let err = new Error('Cannot find a connections with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.editRsvp = (req, res, next)=>{
    console.log(req.body.rsvp);
    let id = req.params.id;
    rsvpModel.findOne({connection:id}).then(rsvp=>{
        if(rsvp){
            //update
            rsvpModel.findByIdAndUpdate(rsvp._id, {rsvp:req.body.rsvp}, {useFindAndModify: false, runValidators: true})
            .then(rsvp=>{
                req.flash('success', 'Successfully updated RSVP');
                res.redirect('/users/profile')
            }).catch(err=>{
                if(err.name === 'ValidationError') {
                    req.flash('error', err.message);
                    return res.redirect('/back');
                }
                next(err);});
        } else {
            let rsvp = new rsvpModel({
                connection: id,
                rsvp: req.body.rsvp,
                user: req.session.user
            });
            rsvp.save()
            .then(rsvp=>{
                req.flash('success', 'Successfully created RSVP');
                res.redirect('/users/profile');
            })
            .catch(err=>{
                req.flash('error', err.message);
                next(err)});
        }
    });
}

exports.deleteRsvp = (req, res, next)=>{
    let id = req.params.id;
    rsvpModel.findOneAndDelete({connection:id, user:req.session.user})
    .then(rsvp=>{
        req.flash('success', 'Successfully deleted RSVP');
        res.redirect('/users/profile');
    })
    .catch(err=>{
        req.flash('error', err.message);
         next(err)});
}
