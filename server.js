const express = require('express');

const app = express();

const GoogleAssistant = require('./googleAssistant.js');

// const deviceCredentials = {
//   client_secret: '16Z1ksEPoLCsBGIq0Oyv982Z',
//   refresh_token: '1/kRQ8htNpTFWZaTdWTBHnZmlBSVKucNDgWVN9MJzrEHQ',
//   scopes: ['https://www.googleapis.com/auth/assistant-sdk-prototype'],
//   client_id: '1026086369065-pt5sedk4mmb5d5gudiiiou5cf14vo7ab.apps.googleusercontent.com',
//   token_uri: 'https://accounts.google.com/o/oauth2/token',
// };

// const homedir = require('homedir');
// const deviceCredentials = require(`${homedir()}/.config/google-oauthlib-tool/credentials.json`);
const deviceCredentials = require('./deviceCredentials.json');

const CREDENTIALS = {
  client_id: deviceCredentials.client_id,
  client_secret: deviceCredentials.client_secret,
  refresh_token: deviceCredentials.refresh_token,
  type: 'authorized_user',
};

const assistant = new GoogleAssistant(CREDENTIALS);

const getAssistantResponse = async prompt => {
  try {
    const response = await assistant.assist(prompt);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

app.get('/', async (req, res) => {
  try {
    if (!req.query.query || req.query.query === '') {
      throw Error('Please provide query.');
    } else {
      const response = await getAssistantResponse(req.query.query);
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
