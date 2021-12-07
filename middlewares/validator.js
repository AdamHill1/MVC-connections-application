const {body} = require('express-validator');
const {validationResult} = require('express-validator');

exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateRsvp = [body('rsvp').isIn(['YES', 'NO', 'MAYBE'])];


exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];


exports.validateLogIn = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateStory = [body('topic', 'Topic cannot be empty').notEmpty().trim().escape(),
body('title', 'Title cannot be empty').notEmpty().trim().escape(),
body('details', 'Details has to be at least 10 characters').trim().escape().isLength({min: 10}),
body('location', 'Location cannot be empty').notEmpty().trim().escape(),
body('date', 'Date cannot be empty').notEmpty().trim().escape(),
body('startM', 'Start Time cannot be empty').notEmpty().trim().escape(),
body('endM', 'End Time cannot be empty').notEmpty().trim().escape(),
body('image', 'Timage cannot be empty').notEmpty().trim().escape()
];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}