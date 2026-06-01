const { getDb } = require('../db/mongodb');
const { ObjectId } = require('mongodb');
const familyService = require('../services/family.service');

async function GetAllFamilies(req, res) {
    // #swagger.tags = ['Family']
    // #swagger.description = 'Endpoint to get all families.'
    try {
        const db = await getDb();
        const families = await familyService.getFamilies(db);
        res.status(200).json(families);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function GetFamilyById(req, res) {
    // #swagger.tags = ['Family']
    // #swagger.description = 'Endpoint to get a family by ID.'
    try {
        const db = await getDb();
        const familyId = req.params.id;
        const family = await familyService.getFamilyById(db, familyId);
        if (!family) {
            return res.status(404).json({ error: 'Family not found' });
        }
        res.status(200).json(family);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function CreateFamily(req, res) {
    // #swagger.tags = ['Family']
    // #swagger.description = 'Endpoint to create a new family.'
    try {
        const { familyName, members } = req.body;
        const db = await getDb();
        const familyData = req.body;
        const result = await familyService.createFamily(db, familyData);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function AddToFamily(req, res) {
    // #swagger.tags = ['Family']
    // #swagger.description = 'Endpoint to add a person to a family.'
    try {
        const { familyId, personId } = req.body;
        const db = await getDb()
        const result = await familyService.addToFamily(db, familyId, personId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function RemoveFromFamily(req, res) {
    // #swagger.tags = ['Family']
    // #swagger.description = 'Endpoint to remove a person from a family.'
    try {
        const { familyId, personId } = req.body;
        const db = await getDb();
        const result = await familyService.removeFromFamily(db, familyId, personId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    GetAllFamilies,
    GetFamilyById,
    CreateFamily,
    AddToFamily,
    RemoveFromFamily
};