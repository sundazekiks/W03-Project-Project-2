
const router = require('express').Router();
const {
    GetAllFamilies,
    GetFamilyById,
    CreateFamily,
    AddToFamily,
    RemoveFromFamily
} = require('../controller/family.controller');

router.get('/', GetAllFamilies);
router.get('/:id', GetFamilyById);
router.post('/', CreateFamily);
router.put('/add', AddToFamily);
router.delete('/remove', RemoveFromFamily);

module.exports = router;