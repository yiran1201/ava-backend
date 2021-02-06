import uuid4 from 'uuid4';
import {buildConversations} from './seed-util';
// Build a mock in-memory database for the project
class InMemoryDB {
  constructor() {
    this.resetConversations();
  }

  resetConversations() {
    this.conversations = buildConversations(20);
  }

  insertMutation(mutation) {
    const conversation = this.getConversation(mutation.conversationId);
    const sentence = conversation.text;
    const {index, text} = mutation.data;
    const newSentence = sentence.slice(0, index) + text + sentence.slice(index);
    conversation.text = newSentence;

    // Update mutation
    conversation.lastMutation = mutation;
    conversation.mutations.unshift(mutation);
    const {author} = mutation;
    conversation.origin[author]++;
    return newSentence;
  }

  deleteMutation(mutation) {
    const conversation = this.getConversation(mutation.conversationId);
    const sentence = conversation.text;
    const {index, length} = mutation.data;
    const newSentence =
      sentence.slice(0, index) + sentence.slice(index + length);
    conversation.text = newSentence;

    // Update mutation
    conversation.lastMutation = mutation;
    conversation.mutations.unshift(mutation);
    const {author} = mutation;
    conversation.origin[author]++;
    return newSentence;
  }

  handleMutation(mutation) {
    return mutation.data.type === 'insert'
      ? this.insertMutation(mutation)
      : this.deleteMutation(mutation);
  }

  addConversation(text) {
    const id = `conversation-${uuid4()}`;
    const conversation = {
      id,
      mutations: [],
      lastMutation: {},
      text,
      origin: {alice: 0, bob: 0},
    };
    this.conversations.unshift(conversation);
  }

  deleteConversation(conversationId) {
    this.conversations = this.conversations.filter(
      ({id}) => id !== conversationId
    );
  }

  getConversation(conversationId) {
    return this.conversations.find(({id}) => id === conversationId);
  }

  getConversations() {
    return this.conversations.slice().map(({id, mutations, text}) => {
      let lastMutation = {};
      if (mutations.length) {
        const {author, data, origin} = mutations.slice().shift();
        lastMutation = {author, data, origin};
      }
      return {id, mutations, text, lastMutation};
    });
  }

  getConversationsAPI() {
    return this.conversations.slice().map(({id, mutations, text}) => {
      let lastMutation = {};
      if (mutations.length) {
        const {author, data, origin} = mutations.slice().shift();
        lastMutation = {author, data, origin};
      }
      return {id, lastMutation, text};
    });
  }

  clearConversations() {
    this.conversations.splice(0, this.conversations.length);
  }
}

const db = new InMemoryDB();
export default db;
