/* eslint-disable */

/* Example Configuration */
// CHARM_PORT: 8080
// CHARM_DB_HOST: 'localhost'
// CHARM_DB_NAME: 'charm'
// CHARM_DB_PORT: 27017
// CHARM_USERNAME: 'mark'
// CHARM_PASSWORD: 'bullpup'
// CHARM_COOKIE_SECRET: 'abracadabra'
// CHARM_DB_ADMIN: 'mark'
// CHARM_DB_ADMIN_PASSWORD: 'bullpup'

const CHARM = /^CHARM_/i;

function getEnvironment() {
  return Object.keys(process.env)
    .filter(key => CHARM.test(key))
    .reduce(
      (env, key) => {
        env[key.substr(6)] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
      }
    );
}

var env = getEnvironment();

module.exports = env;
