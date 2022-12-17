const router = require('express').Router()

// * Firebase Configs
const admin = require('../config/firebase-admin')
const { ref, set, onValue } = require("firebase-admin"); // getDatabase for not admin
const db = admin.database()

const firebase = require('../config/firebase') // * firebase app configuration
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')
const auth = getAuth()
// const db = getDatabase(firebase)

// * encryption
const bcrypt = require('bcrypt')
const salt = 10

// * utilities
const { fixedName } = require('../helpers/util')

// * jwt and cookie
const { sign } = require('jsonwebtoken')
const { serialize } = require('cookie')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/register', async (req, res) => {
    let data = req.body
    // console.log(data)
    
    let name = fixedName(data.name)
    let password = data.password; // bcrypt.hashSync(data.password, salt) // * hash password here

    await createUserWithEmailAndPassword(auth, data.email, password)
        .then(userCredential => {
            const postRef = db.ref(`users/${userCredential.user.uid}`)

            postRef.set({ name: name, createdAt: Date.now() })
                .then(() => {
                    res.status(200).json({ 
                        success: true, 
                        message: `You have registered successfully`,
                        data: userCredential
                    })
                })
                .catch(err => res.status(404).json({ success: false, message: err }))
        })
        .catch(err => res.json(err))

    // admin.auth().createUser({
    //     email: data.email,
    //     emailVerified: true,
    //     password: password,
    //     displayName: name
    // }).then(record => {
    //     const postRef = db.ref(`users/${record.uid}`)

    //     postRef.set({ name: name, createdAt: Date.now() })
    //         .then(() => {
    //             res.status(200).json({ success: true, message: `${name} is registered successfully` })
    //         })
    //         .catch(err => res.status(404).json({ success: false, message: err }))
    // }).catch(err => res.status(500).json(err))
});

// * LOGIN USER
router.post('/login', async (req, res) => {
    let data = req.body

    await signInWithEmailAndPassword(auth, data.email, data.password)
        .then(userCredential => {
            let getToken = userCredential.user.stsTokenManager.accessToken
            
            const token = sign({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                access_token: getToken,
                token_type: 'Bearer',
                expires_in: 3600 * 24 * 30
            }, JWT_SECRET)

            const serialize = serialize("ecovision-site", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 3600 * 24 * 30,
                path: "/"
            })

            res.set('Set-Cookie', serialize).json({ success: true })

            res.json({
                success: true,
                // message: `Welcome back ${userCredential._tokenResponse.displayName}!`,
                // data: userCredential
            })
        })
        .catch(err => res.json(err))
})

router.post('/logout', async (req, res) => {
    await auth.signOut()
        .then(() => {
            res.json({
                success: true,
                message: "Sign out successfully"
            })
        })
        .catch(err => res.json(err))
})

router.get('/details', async (req, res) => {
    let data = req.body

    await admin.auth().getUserByEmail(data.email)
        .then(record => {
            let getRef = db.ref(`users/${record.uid}`)

            getRef.on('value', snapshot => {
                let user = snapshot.val()
                res.json({ record, user })
            }, errorObject => {
                res.json(errorObject)
            })
        })
        .catch(err => res.json(err))
})

module.exports = router