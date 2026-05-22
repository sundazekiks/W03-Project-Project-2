
const service = {
    getAll: async (db) => {
        try {
            const persons = await db.find().toArray();
            return persons;
        } catch (err) {
            throw new Error(err);
        }
    },
    getById: async (db, id) => {
        try {
            const person = await db.findOne({ _id: id });
            return person;
        } catch (err) {
            throw new Error(err);
        }
    },
    create: async (db, person) => {
        try {
            // console.log('In service create function, person:', person); // Log the person object for debugging
            const result = await db.insertOne(person);
            return result;
        } catch (err) {
            throw new Error(err);
        }
    },
    update: async (db, id, person) => {
        try {
            const result = await db.updateOne({ _id: id }, { $set: person });
            return result;
        } catch (err) {
            throw new Error(err);
        }
    },
    delete: async (db, id) => {
        try {
            const result = await db.deleteOne({ _id: id });
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = service;