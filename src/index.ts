import * as fs from 'fs';
import * as core from '@actions/core';

async function run() {
  try {
    const inputs = {
      registry: core.getInput('registry', {required: true}),
      scope: core.getInput('scope'),
      password: core.getInput('password'),
      authToken: core.getInput('authToken'),
      username: core.getInput('username'),
      email: core.getInput('email'),
      alwaysAuth: core.getInput('alwaysAuth'),
    };

    let {registry, scope, password, authToken, username, email} = inputs;
    let alwaysAuth = inputs.alwaysAuth === 'true';
    let npmrc;

    registry = !/[/]$/.test(registry) ? `${registry}/` : registry;
    const registryWithoutProtocol = registry.replace(/^[a-zA-Z]+[:]/, '');

    // Try to read existing file to append content
    // mostly for adding several registry urls via `uses` when needed
    try {
      npmrc = fs.readFileSync('./.npmrc', 'utf-8');
    } catch (e) {
      npmrc = '';
    }

    npmrc += `${scope}${scope ? ':' : ''}registry=${registry}\n`;

    if (password) {
      npmrc += `${registryWithoutProtocol}:_password=${password}\n`;
    }
    if (authToken) {
      npmrc += `${registryWithoutProtocol}:_authToken==${authToken}\n`;
    }
    if (username) {
      npmrc += `${registryWithoutProtocol}:username=${username}\n`;
    }
    if (email) {
      npmrc += `${registryWithoutProtocol}:email=${email}\n`;
    }
    if (alwaysAuth) {
      npmrc += `${registryWithoutProtocol}:always-auth=${alwaysAuth}\n`;
    }

    fs.writeFileSync('./.npmrc', npmrc, 'utf-8');

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
