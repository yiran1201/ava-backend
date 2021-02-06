import db from '../utils/cache-util';

const handleMutation = (req, res) => {
  const mutation = req.body;
  const newSentence = db.handleMutation(mutation);
  res.json({msg: '', ok: true, text: newSentence});
};

export {handleMutation};
