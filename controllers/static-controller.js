const getPing = (_, res) => {
  res.json({ok: true, msg: 'pong'});
};

const getInfo = (_, res) => {
  res.json({
    ok: true,
    author: {email: 'yiranchen1201@gmail.com', name: 'Yiran Chen'},
    frontend: {url: 'https://ava-yiranchen.uc.r.appspot.com'},
    language: 'node.js',
    sources: [
      'https://github.com/yiran1201/ava-frontend',
      'https://github.com/yiran1201/ava-backend',
    ].join(', '),
    answers: {
      1: [
        'For the data storage, instead of storing data in a real database, config a server cache to store all conversations in memory.',
        'For the data structure design, store all conversations in a list for the sake of convenient data processing read / filter / re-formatting.',
        'For realtime update, config web socket on both the server side and the client side, emitting and broadcasting the changes between user to the group.',
        'Establish a frontend router to distinguish each user, update the UI logic accordingly.',
        'Keep the server active on cloud.',
      ].join(' '),
      2: [
        'Optimize the conversation look up by building indexing or hashing.',
        'Build more user engagement feature, such as "Alice is typing..." in realtime.',
        'Upgrade the front end code to server side rendering(SSR) and improve the render performance.',
      ].join(' '),
      3: [
        'Remove the mutation logic; though it is fun,',
        'it involves too much details,',
        'which it is not efficient to assess the comprehensive strength of a Full Stack engineer.',
        'In addition, it will be helpful if we prepare a UI mock,',
        'so that the description could be more self-explanatory.',
      ].join(' '),
    },
  });
};

export {getPing, getInfo};
