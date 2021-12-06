const express = require('express');
const controller = require('../controllers/connectionController');
const {isLoggedIn, isAuthor, isNotAuthor} = require('../middlewares/auth');
const {validateId, validateRsvp, validateResult} = require('../middlewares/validator');

const router = express.Router();

//GET /connection: send all stories to the user

router.get('/', controller.index);

//GET /connection/new: send html for for creating a new story

router.get('/new', isLoggedIn, controller.new);

//POST /connection: create a new story

router.post('/', isLoggedIn, controller.create);

//GET /connection/:id: send details of story identified by id

router.get('/:id', validateId, controller.show);

//GET /connection/:id/edit: send html form for editing an existing story

router.get('/:id/edit', isLoggedIn, validateId, isAuthor, controller.edit);

//PUT /connection/:id: update the story identified by id

router.put('/:id', isLoggedIn, validateId, isAuthor, controller.update);

//DELETE /connection/:id, delete the story idnetified by id

router.delete('/:id', isLoggedIn, validateId, isAuthor, controller.delete);

router.post('/:id/rsvp', validateId, isLoggedIn, isNotAuthor, validateRsvp, validateResult, controller.editRsvp);

router.delete('/:id/rsvp', validateId, isLoggedIn, controller.deleteRsvp);

module.exports = router;