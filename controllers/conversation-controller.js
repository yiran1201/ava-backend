import db from '../utils/cache-util';

const resetConversations = (_, res) => {
  const conversations = db.resetConversations();
  res.json({conversations, msg: '', ok: true});
};

const getConversations = (_, res) => {
  const conversations = db.getConversationsAPI();
  res.json({conversations, msg: '', ok: true});
};

const clearConversations = (_, res) => {
  db.clearConversations();
  res.json({msg: '', ok: true});
};

const addConversation = (req, res) => {
  const {text} = req.body;
  db.addConversation(text);
  res.json({msg: '', ok: true});
};

const getConversation = (req, res) => {
  const {conversationId} = req.params;
  if (!db.hasConversation(conversationId)) {
    return res.status(400).json({
      msg: 'conversation does not exist.',
      ok: false,
    });
  }
  const conversation = db.getConversation(conversationId);
  res.json(conversation);
};

const deleteConversation = (req, res) => {
  const {conversationId} = req.params;
  if (!db.hasConversation(conversationId)) {
    return res.status(400).json({
      msg: 'conversation does not exist.',
      ok: false,
    });
  }
  db.deleteConversation(conversationId);
  res.json({msg: '', ok: true});
};

export {
  getConversation,
  getConversations,
  deleteConversation,
  clearConversations,
  addConversation,
  resetConversations,
};
