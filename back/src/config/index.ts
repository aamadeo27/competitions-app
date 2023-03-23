import { config } from 'dotenv'
config({ path: '.env' })

const { STEAM_API_KEY, API_JWT_SECRET } = process.env
export const CREDENTIALS = process.env.CREDENTIALS === 'true'
export const ORIGIN = process.env.ORIGIN === 'true'
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  API_URL,
} = process.env
export const auth = {
  steam: {
    returnURL: `${API_URL}/auth/return`,
    realm: `${API_URL}`,
    apiKey: STEAM_API_KEY,
  },
  jwtSecret: API_JWT_SECRET,
}
