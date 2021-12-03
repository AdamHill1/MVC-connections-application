const sports = require('../models/connection');

//check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    }else {
        req.flash('error', 'You are logged in already');
        return res.redirect('/users/profile');
    }
};


//check if user is authenticated
exports.isLoggedIn = (req, res, next) =>{
    if(req.session.user){
        return next();
    }else {
        req.flash('error', 'You need to log in first');
        return res.redirect('/users/login');
    }
};

//check if user is author of the sports
exports.isAuthor = (req, res, next) =>{
    let id = req.params.id;
    sports.findById(id)
    .then(sports=>{
        if(sports) {
            if(sports.host == req.session.user){
                return next();
            } else{
                let err = new Error('Unathorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }
    })
    .catch(err=>next(err));
};

exports.isNotAuthor = (req, res, next) =>{
    let id = req.params.id;
    sports.findById(id)
    .then(sports=>{
        if(sports) {
            if(sports.host != req.session.user){
                return next();
            } else{
                let err = new Error('Unathorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }
    })
    .catch(err=>next(err));
};