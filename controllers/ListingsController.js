const router = require('express').Router()
const { getDatabase, ref, child, push, update, set, remove, onValue, query, orderByValue, orderByChild, equalTo, get } = require("firebase/database");
const firebase = require('../config/firebase')
const db = getDatabase(firebase);
const { generateRandomString } = require('../helpers/util')

router.get("/", (req, res) => {
    let getRef = ref(db, "listings")

    let sort = query(getRef, orderByValue())
    onValue(sort, snapshot => {

        let resp = snapshot.val()
        let newArr = []
        for (const key in resp) {
            resp[key].id = key
            newArr.push(resp[key])
            // newArr = Object.assign(resp, newArr)
        }

        res.json(newArr)
    })
})

// * STORE
router.post("/", async (req, res) => {
    let data = req.body
    let params = {
        category: data.category,
        title: data.title,
        condition: data.condition,
        price: data.price,
        description: data.description,
        photo: data.photo,
        shipping: data.shipping,
        payment: data.payment,
        user: data.user_uid
    }

    const postRef = ref(db, '/listings')
    const newPostRef = push(postRef)
    
    await set(newPostRef, params)
        .then(() => {
            res.json({ success: true, message: `${data.title} added successfully` })
        })
        .catch(err => {
            res.json({ success: false, message: err })
        })
})

// * GET LISTING BY id
router.get("/:id", (req, res) => {
    const getRef = ref(db, `listings/${req.params.id}`)
    onValue(getRef, snapshot => {
        res.json(snapshot)
    })
})

// * UPDATE
router.put("/:id", async (req, res) => {
    let data = req.body
    let params = {
        category: data.category,
        title: data.title,
        condition: data.condition,
        price: data.price,
        description: data.description,
        photo: data.photo,
        shipping: data.shipping,
        payment: data.payment,
        user: data.user_uid
    }

    await update(ref(db, 'listings/' + req.params.id), params)
    .then(() => {
        res.json({ success: true, message: `${data.title} updated successfully` })
    })
    .catch(err => {
        res.json({ success: false, message: err })
    })
})

// * DELETE
router.delete("/:key", async (req, res) => {
    const deleteRef = ref(db, 'listings/' + req.params.key)

    await remove(deleteRef)
        .then(() => {
            res.json({ success: true, message: "Listing deleted successfully" })
        })
        .catch(err => {
            res.json({ success: false, message: err })
        })
})

router.get('/me/:id', async (req, res) => {

    let queryRef = query(ref(db, 'listings'), orderByChild('user'), equalTo(req.params.id))

    get(queryRef).then(snapshot => {
        let newArr = []
        const data = snapshot.val()

        for (const key in data) {
            data[key].id = key
            newArr.push(data[key])
        }

        res.json(newArr)
    })
})

router.post('/:id/comment', async (req, res) => {
    const postRef = ref(db, 'comments')
    const newPostRef = push(postRef)

    const params = {
        listing: req.params.id,
        question: req.body.question
    }

    await set(newPostRef, params)
        .then(() => {
            res.json({ success: true, message: `Comment added successfully` })
        })
        .catch(err => {
            res.json({ success: false, message: err })
        })
})

router.get('/:id/comments', async (req, res) => {
    const getRef = ref(db, 'comments')

    onValue(getRef, (snapshot) => {
        res.json(snapshot.val())
    })
})

module.exports = router