const { getDb } = require('../db/mongodb');
const service = require('../services/person.service');
const { Person } = require('../models/');
const { ObjectId } = require('mongodb');



const GetAllPersons = async (req, res) => {
    // #swagger.description = 'Get all persons.'

    try {
        const db = await getDb();
        const persons = await service.getAll(db.collection('persons'));
        res.json({ persons });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const GetPersonById = async (req, res) => {
    // #swagger.description = 'Get a person by their ID. The ID should be a valid MongoDB ObjectId.'

    try {
        const id = new ObjectId(req.params.id); // Get the ID from the request parameters and convert it to an ObjectId
        const db = await getDb();
        const person = await service.getById(db.collection('persons'), id);

        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json({ person });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const CreatePerson = async (req, res) => {
    // #swagger.description = 'Create a new person.'
    try {
        const db = await getDb();
        // console.log('Request body:', req.body); // Log the request body for debugging
        const newPerson = Person({ ...req.body }); // Get the new person data from the request body
        // console.log('Creating person:', newPerson); // Log the new person data for debugging
        const result = await service.create(db.collection('persons'), newPerson); // Use the service to create the person
        res.status(201).json({ message: 'Person created', id: result.insertedId }); // Respond with the ID of the newly created person
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const UpdatePerson = async (req, res) => {
    // #swagger.description = 'Update an existing person by their ID. The ID should be a valid MongoDB ObjectId.'
    try {
        const id = new ObjectId(req.params.id); // Get the ID from the request parameters and convert it to an ObjectId
        const db = await getDb();
        const updatedPerson = Person({ ...req.body }); // Get the updated person data from the request body
        const result = await service.update(db.collection('persons'), id, updatedPerson); // Use the service to update the person

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json({ message: 'Person updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const DeletePerson = async (req, res) => {
    // #swagger.description = 'Delete a person by their ID. The ID should be a valid MongoDB ObjectId.'
    try {
        const id = new ObjectId(req.params.id); // Get the ID from the request parameters and convert it to an ObjectId
        const db = await getDb();
        const result = await service.delete(db.collection('persons'), id); // Use the service to delete the person

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json({ message: 'Person deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



module.exports = { GetAllPersons, GetPersonById, CreatePerson, UpdatePerson, DeletePerson };