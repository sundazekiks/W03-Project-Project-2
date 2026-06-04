
const router = require('express').Router();
const {
    GetAllFamilies,
    GetFamilyById,
    CreateFamily,
    AddToFamily,
    RemoveFromFamily
} = require('../controller/family.controller');
const isAuthenticated = require('../middleware/authenthicated');

router.get('/', isAuthenticated, GetAllFamilies);
router.get('/:id', isAuthenticated, GetFamilyById);
router.post('/', isAuthenticated, CreateFamily);
router.put('/add', isAuthenticated, AddToFamily);
router.delete('/remove', isAuthenticated, RemoveFromFamily);

module.exports = router;