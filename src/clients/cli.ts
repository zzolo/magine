import debugGenerator from 'debug';
import { io } from 'socket.io-client';
import chalk from 'chalk';

// Debugging
const debug = debugGenerator('magine:client-cli');

// Shortcuts
const bold = chalk.bold;
const red = chalk.red;
const gray = chalk.gray;
const green = chalk.green;
const yellow = chalk.yellow;

// Socket.IO client
const socket = io('ws://localhost:3377/', {
  reconnectionAttempts: 5
});

// Debugging
socket.io.on('ping', () => {
  debug(gray(`${bold('[PING]')}`));
});
socket.io.on('reconnect_attempt', (attempt) => {
  debug(gray(`${bold('[RECONNECT_ATTEMPT]')} ${attempt}`));
});
socket.io.on('reconnect', (attempt) => {
  debug(gray(`${bold('[RECONNECT]')} ${attempt}`));
});
socket.on('connect', () => {
  debug(green(`${bold('[CONNECT]')}`));
});
socket.on('disconnect', () => {
  if (socket.active) {
    debug(gray(`${bold('[DISCONNECT]')} Retrying...`));
  }
  else {
    debug(yellow(`${bold('[DISCONNECT]')}`));
  }
});

// Error handling
socket.io.on('error', (error) => {
  console.error(red(`${bold('[ERROR]')} ${error}`));
});
socket.io.on('reconnect_error', (error) => {
  console.error(red(`${bold('[RECONNECT_ERROR]')} ${error}`));
});
socket.io.on('reconnect_failed', () => {
  console.error(red(`${bold('[RECONNECT_FAILED]')}`));
});
socket.on('connect_error', () => {
  console.error(red(`${bold('[CONNECT_ERROR]')}`));
});

// Handle incoming messages
socket.on('state-update', (state) => {
  console.log(`${green(bold('[STATE]'))} ${JSON.stringify(state)}`);
});
