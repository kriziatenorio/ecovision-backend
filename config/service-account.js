require('dotenv').config()
const env = process.env

const config = {
    "type": env.TYPE,
    "project_id": env.FIREBASE_PROJECT_ID,
    "private_key_id": env.PRIVATE_KEY_ID,
    "private_key": env.PRIVATE_KEY,
    "client_email": env.CLIENT_EMAIL,
    "client_id": env.CLIENT_ID,
    "auth_uri": env.AUTH_URI,
    "token_uri": env.TOKEN_URI,
    "auth_provider_x509_cert_url": env.AUTH_PROVIDER_CERT_URL,
    "client_x509_cert_url": env.CLIENT_CERT_URL
}

module.exports = config