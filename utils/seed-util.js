import uuid4 from 'uuid4';
import faker from 'faker';

const buildConversations = (sample) => {
  const conversations = [];
  while (conversations.length < sample) {
    const text = faker.lorem.sentence();
    const id = `conversation-${uuid4()}`;
    conversations.push({
      id,
      mutations: [],
      lastMutation: {},
      text,
      origin: {alice: 0, bob: 0},
    });
  }
  return conversations;
};

export {buildConversations};
