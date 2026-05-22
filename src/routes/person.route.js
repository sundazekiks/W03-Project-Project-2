const { Router } = require('express');
const controller = require('../controller/person.controller');


const person = Router();

person.get('/', controller.GetAllPersons);

person.get('/:id', controller.GetPersonById);

person.post('/', controller.CreatePerson);

person.put('/:id', controller.UpdatePerson);

person.delete('/:id', controller.DeletePerson);

module.exports = person;