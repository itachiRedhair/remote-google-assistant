const express = require('express');

const app = express();

const GoogleAssistant = require('./googleAssistant.js');

// const homedir = require('homedir');
// const deviceCredentials = require(`${homedir()}/.config/google-oauthlib-tool/credentials.json`);

const deviceCredentials = require(`./devicecredentials.json`);

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
