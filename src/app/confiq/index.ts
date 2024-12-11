
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.join((process.cwd(),'.env'))})
export default {
    port:process.env.PORT,
    database_url:process.env.DATABASE_URL,
    default_pass:process.env.DEFAULT_PASS,
    bcrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS,
    NODE_ENV:process.env.NODE_ENV

}