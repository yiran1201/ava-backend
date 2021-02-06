import db from '../utils/cache-util';

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
  const conversation = db.getConversation(conversationId);
  res.json(conversation);
};

const deleteConversation = (req, res) => {
  const {conversationId} = req.params;
  db.deleteConversation(conversationId);
  res.json({msg: '', ok: true});
};

export {
  getConversation,
  getConversations,
  deleteConversation,
  clearConversations,
  addConversation,
};
