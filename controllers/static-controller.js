const getPing = (_, res) => {
  res.json({ok: true, msg: 'pong'});
};

const getInfo = (_, res) => {
  res.json({
    ok: true,
    author: {email: 'yiranchen1201@gmail.com', name: 'Yiran Chen'},
    frontend: {url: 'string, the url of your frontend.'},
    language: 'node.js',
    sources:
      'string, the url of a github repository including your backend sources and your frontend sources',
    answers: {
      1: 'string, answer to the question 1',
      2: 'string, answer to the question 2',
      3: 'string, answer to the question 3',
    },
  });
};

export {getPing, getInfo};
