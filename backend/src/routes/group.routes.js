const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groups.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, groupController.listGroups);
router.post('/', auth, groupController.createGroup);
router.delete('/:id', auth, groupController.deleteGroup);

module.exports = router;
