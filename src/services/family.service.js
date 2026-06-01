const personService = require('./person.service');
const { ObjectId } = require('mongodb');

const service = {
    getFamilies: async (db) => {
        const families = await db.collection('families').find().toArray();
        return families;
    },
    getFamilyById: async (db, id) => {
        const family = await db.collection('families').findOne({ _id: new ObjectId(id) });
        return family;
    },
    createFamily: async (db, familyData) => {
        const result = await db.collection('families').insertOne(familyData);
        return result;
    },
    addToFamily: async (db, familyId, personId) => {
        const person = await personService.getById(db.collection('persons'), new ObjectId(personId));

        if (!person) {
            throw new Error('Person not found');
        }
        const result = await db.collection('families').updateOne(
            { _id: new ObjectId(familyId) },
            { $addToSet: { members: person } }
        );
        return result;
    },
    removeFromFamily: async (db, familyId, personId) => {

        const family = await service.getFamilyById(db, familyId);

        if (!family) {
            throw new Error('Family not found');
        }
        // remove the person from the family members array
        const members = family.members.filter(member => member._id.toString() !== personId);

        console.log('here?')
        const result = await db.collection('families').updateOne(
            { _id: new ObjectId(familyId) },
            { $set: { members: members } }
        );
        return result;
    }
}

module.exports = service;