const { Router } = require('express');
const controller = require('../controller/person.controller');
const isAuthenticated = require('../middleware/authenthicated');


const person = Router();

person.get('/', isAuthenticated, controller.GetAllPersons);

person.get('/:id', isAuthenticated, controller.GetPersonById);

person.post('/', isAuthenticated, controller.CreatePerson);

person.put('/:id', isAuthenticated, controller.UpdatePerson);

person.delete('/:id', isAuthenticated, controller.DeletePerson);

module.exports = person;