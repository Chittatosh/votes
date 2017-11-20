import express from 'express';
//import assert from 'assert';
import Poll from './schema';

const router = express.Router();

router.get('/all', (req, res) => {
  Poll.find({})
    .then(pollArr => res.json(pollArr))
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

router.get('/poll/:id', (req, res) => {
  Poll.findOne({ _id: req.params.id })
    .then(poll => res.json(poll.dataPoints))
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

router.post('/vote/:id', (req, res) => {
  Poll.findOneAndUpdate({ 'dataPoints._id': req.params.id }, {'$inc': {'dataPoints.$.value': 1}}, {new: true})
    .then(updatedPoll => res.json(updatedPoll))
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

router.post('/newchoice/:id', (req, res) => {
  Poll.findOneAndUpdate({ _id: req.params.id }, { $push: { dataPoints: req.body }}, {new: true})
    .then(updatedPoll => res.json(updatedPoll))
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

router.post('/newpoll', (req, res) => {
  const title = req.body.question.replace(/\s+/g, ' ');
  
  let choiceArr = req.body.choices.split(',');
  choiceArr = choiceArr.map(choice => choice.trim().replace(/\s+/g, ' ').toLowerCase());
  choiceArr = [ ...new Set(choiceArr) ];
  const dataPoints = choiceArr.map(choice => ({label: choice, value: 0}));
  
  const newPoll = new Poll({ title, dataPoints });
  newPoll.save()
    .then(savedPoll => {
      console.log('savedPoll:', savedPoll);
      res.redirect('/');
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

export default router;
