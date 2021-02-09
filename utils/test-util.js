import {isEmpty} from 'lodash';

class DB {
  constructor() {
    this.store = {};
  }

  insertMutation(mutation) {
    const {author, conversationId, origin} = mutation;
    const {type, index, text} = mutation.data;
    if (!this.store[conversationId]) {
      this.store[conversationId] = {
        id: conversationId,
        text: '',
        mutations: [],
        lastMutation: {},
      };
    }
    const conversation = this.store[conversationId];
    const curText = conversation.text;
    conversation.text = curText.slice(0, index) + text + curText.slice(index);
    // record mutation
    const curMutation = {author, origin, type, index, text};
    conversation.mutations.push(curMutation);
    conversation.lastMutation = curMutation;
  }

  deleteMutation(mutation) {
    const {author, conversationId, origin} = mutation;
    const {type, index, length} = mutation.data;
    // conversation must exist
    const conversation = this.store[conversationId];
    const curText = conversation.text;
    conversation.text = curText.slice(0, index) + curText.slice(index + length);
    // record mutation
    const curMutation = {author, origin, type, index, length};
    conversation.mutations.push(curMutation);
    conversation.lastMutation = curMutation;
  }

  handleMutation(mutation) {
    const {type} = mutation.data;
    if (type === 'insert') {
      this.insertMutation(mutation);
    }
    if (type === 'delete') {
      this.deleteMutation(mutation);
    }
  }

  getConversationText(id) {
    const conversation = this.store[id];
    return conversation ? conversation.text : '';
  }

  getConversations() {
    return Object.entries(this.store)
      .map(([_, conversation]) => conversation)
      .map(({id, lastMutation, text}) => ({
        id,
        lastMutation,
        text,
      }));
  }
}
const db = new DB();

const getTest = (req, res) => {
  res.status(200).json('');
};

const testHandleMutation = (req, res) => {
  if (isEmpty(req.body)) {
    res.status(400).json({msg: '', ok: false, text: ''});
    return;
  }
  db.handleMutation(req.body);
  const {conversationId} = req.body;
  const text = db.getConversationText(conversationId);
  res.status(201).json({msg: '', ok: true, text});
};

const testGetConversations = (_, res) => {
  const conversations = db.getConversations();
  res.json({conversations, msg: '', ok: true});
};

export {getTest, testHandleMutation, testGetConversations};
