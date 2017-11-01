import express from 'express';
import Poll from './schema';

const router = express.Router();

router.get('/population', (req, res) => {
  const data = [
    {age: "<5", population: 2704659},
    {age: "5-13", population: 4499890},
    {age: "14-17", population: 2159981},
    {age: "18-24", population: 3853788},
    {age: "25-44", population: 14106543},
    {age: "45-64", population: 8819342}
  ];
  res.json(data);
});

router.get('/poll/:id', (req, res) => {
  console.log('req.params =', req.params);
  Poll.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      res.send(err.message);
      return;
    }
    if (doc) {
      res.json(doc.dataPoints);
    }
  });
});

router.post('/newpoll', (req, res) => {
  const title = req.body.question.replace(/\s+/g, ' ');
  
  let choiceArr = req.body.choices.split(',');
  choiceArr = choiceArr.map(choice => choice.trim().replace(/\s+/g, ' ').toLowerCase());
  choiceArr = [ ...new Set(choiceArr) ];
  const dataPoints = choiceArr.map(choice => ({label: choice, value: 0}));
  
  const newPoll = new Poll({ title, dataPoints });
  newPoll.save(function(err, savedPoll) {
    if (err) {
      console.log('Not saved');
      res.send(err.message);
      return;
    }
    res.json(savedPoll);
    console.log('Poll saved');
  });
});

router.post('/vote/:id', (req, res) => {
  console.log('req.body =', req.body);
  console.log('req.params =', req.params);
  Poll.update({ "dataPoints._id": req.params.id }, {'$inc': {'dataPoints.$.value': 1}}, (err, doc) => {
    if (err) res.send(err.message);
    if (doc) res.json(doc);
  });
});

export default router;
