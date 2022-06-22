const express = require('express');
const {
  getTrivia,
  addTrivia,
  updateOneTrivia,
  deleteOneTrivia,
} = require('../controllers/trivia.controller.js');

const router = express.Router();

router.route('/').get(getTrivia);
router.route('/').post(addTrivia);
router.route('/:id').patch(updateOneTrivia);
router.route('/:id').delete(deleteOneTrivia);

module.exports = router;
