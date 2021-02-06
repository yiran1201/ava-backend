import bodyParser from 'body-parser';
import cors from 'cors';
import Express from 'express';
import http from 'http';
import path from 'path';

import {
  addConversation,
  clearConversations,
  deleteConversation,
  getConversation,
  getConversations,
  resetConversations,
} from './controllers/conversation-controller';
import {handleMutation} from './controllers/mutation-controller';
import {getInfo, getPing} from './controllers/static-controller';
import {logRoute} from './utils/log-util';
import {connectSocket} from './utils/socket-util';

const app = Express();
// Temporarily accept requests from anywhere includes: https://app.ava.me (CORS policy).
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logRoute);

app.get('/ping', getPing);
app.get('/info', getInfo);
app.post('/mutations', handleMutation);
app.get('/conversation/:conversationId', getConversation);
app.delete('/conversation/:conversationId', deleteConversation);
app.post('/conversation', addConversation);
app.get('/reset-conversations', resetConversations);
app.get('/conversations', getConversations);
app.delete('/conversations', clearConversations);

/***********************
 * Static Files Import *
 ***********************/
app.get('/_ah/warmup', (_, res) => res.status(200).json('Warmup!'));
const root = path.join(__dirname, 'build');
app.use('/', Express.static(root));
app.use('/*', (_, response) => response.sendFile(`${root}/index.html`));

const server = http.createServer(app);
connectSocket(server);
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Running on port: ${port}`));
