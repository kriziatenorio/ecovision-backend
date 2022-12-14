const router = require('express').Router()

// * Firebase Configs
const admin = require('../config/firebase-admin')
const { ref, set, onValue } = require("firebase-admin"); // getDatabase for not admin
const db = admin.database()

const firebase = require('../config/firebase') // * firebase app configuration
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')
const auth = getAuth()
// const db = getDatabase(firebase)

// * utilities
const { fixedName } = require('../helpers/util')

router.post('/register', async (req, res) => {
    let data = req.body
    
    let name = fixedName(data.name)
    let password = data.password;

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
});

// * LOGIN USER
router.post('/login', async (req, res) => {
    let data = req.body

    await signInWithEmailAndPassword(auth, data.email, data.password)
        .then(userCredential => {
            res.json({
                success: true,
                message: `Login success`,
                data: userCredential
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