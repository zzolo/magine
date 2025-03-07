/**
 * Shared events object.
 */

import { Events } from '../Events';

export let events: Events;

export const generateEvents = () => {
  events = new Events();
  return events;
};

export const getEvents = () => {
  return events || generateEvents();
};
