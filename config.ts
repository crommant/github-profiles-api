import dotenv from 'dotenv'

dotenv.config()

export const GHTOKEN = process.env.GH_TOKEN;
export const PORT = process.env.PORT || 3000;