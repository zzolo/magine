import dotenv from '@dotenvx/dotenvx';

/**
 * Wrapper to load environment variables.
 */
export function loadEnvironment() {
  dotenv.config();

  process.env.MAGINE_ENV = process.env.MAGINE_ENV || 'development';
  process.env.MAGINE_RELAY_PORT = process.env.MAGINE_RELAY_PORT || '3000';
}
