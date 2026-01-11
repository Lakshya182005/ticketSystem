const express = require('express');
const router = express.Router();

const {newCategory,categoryList,deleteCategory} = require('../controllers/category.controllers');
const {validateId} = require('../middlewares/validateId');
const { auth } = require('../middlewares/auth');

router.post('/', auth, newCategory);        
router.get('/', categoryList);                     
router.delete('/:id', auth, validateId(), deleteCategory);

module.exports = router;
