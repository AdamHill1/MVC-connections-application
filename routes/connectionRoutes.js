const express = require('express');
const controller = require('../controllers/connectionController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

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

module.exports = router;