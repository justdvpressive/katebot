# Kate
A Discord bot for all!

## Setup
To get started, there are one of two routes. [Setup via Heroku](#heroku-setup) or [local setup](#local-setup)

### Heroku Setup
To set up on Heroku, create a new app and link it to this repository in any way you require. Then you need to set these environment variables:

- `token` (The bot's auth token)
- `name` (The bot's name, not yours)
- `owner` (Your Discord ID)
- `prefix` (The prefix for commands on the Bot)
- `firebaseApiKey` (An API key for Firebase (required for the `shorten` command))

Then you can simply push to Heroku and let the build... build.

### Local Setup
This bot comes bundled with a useful NPM package called [`dotenv`](https://npmjs.com/package/dotenv). It allows us to import environment variabled from a file called `.env`. An example of a `.env` file would be as follows:

```sh
# .env
token="NDYzNDnotrealDAyMitsNTY2.really.notaPtokenANgt62MoFdtFdude"
name="Kate"
owner="261816473830293504"
prefix="~"
firebaseApiKey="FIREBASE API KEY HERE!"
```

Then you can simply run `node index.js` or `npm start`. In the case of Yarn (My preferred package manager), `yarn start`. It will start Nodemon. For production, though, I __do__ reccomend `node index.js`.