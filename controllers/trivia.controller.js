const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

const getTrivia = async (req, res) => {
  try {
    let db = getDb();
    const total = parseInt(req.query.total) || 5;
    const level = req.query.level;
    if (!level) {
      return res.status(400).json({
        status: 'failed',
        message: 'Trivia level is a required field',
      });
    }
    const query = { level: level.toLowerCase() };
    const options = {
      sort: { title: -1 },
      limit: total,
      projection: { _id: 0 },
    };
    const cursor = db.collection('trivia').find(query, options);
    const results = await cursor.toArray();
    if (!results || results.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: `No documents found with level ${level}`,
      });
    }
    res.status(200).json({
      status: 'success',
      total_questions: results.length,
      results,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong',
    });
  }
};

const addTrivia = async (req, res) => {
  try {
    let db = getDb();
    const question = req.body;
    const result = await db.collection('trivia').insertOne(question);
    if (!result) {
      return res.status(200).json({ msg: 'Document could not be created' });
    }
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong',
    });
  }
};

const updateOneTrivia = async (req, res) => {
  try {
    let db = getDb();
    const triviaId = req.params.id;
    if (!ObjectId.isValid(triviaId)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Not a valid trivia id',
      });
    }
    const update = req.body;
    const result = await db
      .collection('trivia')
      .updateOne({ _id: ObjectId(triviaId) }, { $set: update });
    if (!result || result.modifiedCount === 0) {
      res.status(200).json({
        status: 'success',
        message: `Document with id ${triviaId} could not be updated`,
      });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong',
    });
  }
};

const deleteOneTrivia = async (req, res) => {
  try {
    let db = getDb();
    const triviaId = req.params.id;
    if (!ObjectId.isValid(triviaId)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Not a valid trivia id',
      });
    }
    const result = await db
      .collection('trivia')
      .deleteOne({ _id: ObjectId(triviaId) });
    if (!result || result.deletedCount === 0) {
      return res.status(200).json({
        status: 'success',
        message: `Document with id ${triviaId} could not be deleted`,
      });
    }
    res.status(204).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'failed',
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  getTrivia,
  addTrivia,
  updateOneTrivia,
  deleteOneTrivia,
};
