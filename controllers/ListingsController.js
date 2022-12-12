const router = require('express').Router()
const { getDatabase, ref, child, push, update, set, remove, onValue } = require("firebase/database");
const firebase = require('../config/firebase')

const db = getDatabase(firebase);

router.get("/", (req, res) => {
    let getRef = ref(db, "listings")
    onValue(getRef, snapshot => {
        res.json(snapshot)
    })
})

// * STORE
router.post("/", (req, res) => {
    let data = req.body

    let params = {
        category: data.category,
        title: data.title,
        condition: data.condition,
        price: data.price,
        description: data.description,
        photos: data.photos,
        shipping: data.shipping,
        payment: data.payment,
        // user: data.user
    }

    const postRef = ref(db, 'listings')
    const newPostRef = push(postRef)
    
    set(newPostRef, params)
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
router.put("/:id", (req, res) => {
    let data = req.body

    let params = {
        category: data.category,
        title: data.title,
        condition: data.condition,
        price: data.price,
        description: data.description,
        photos: data.photos,
        shipping: data.shipping,
        payment: data.payment
    }

    update(ref(db, 'listings/' + req.params.id), params)
        .then(() => {
            res.json({ success: true, message: `${data.title} updated successfully` })
        })
        .catch(err => {
            res.json({ success: false, message: err })
        });
})

// * DELETE
router.delete("/:key", (req, res) => {
    const deleteRef = ref(db, 'listings/' + req.params.key)

    remove(deleteRef)
        .then(() => {
            res.json({ success: true, message: "Listing deleted successfully" })
        })
        .catch(err => {
            res.json({ success: false, message: err })
        })
})

module.exports = router