const router = require('express').Router()
const multer  = require('multer')
const { storage } = require('../config/multer')
const { getDatabase, ref, push, update, set, remove, onValue, query, orderByValue } = require("firebase/database");
const firebase = require('../config/firebase')
const db = getDatabase(firebase);
const { generateRandomString, imageUploads } = require('../helpers/util')
const upload = multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/images") // * pass the path here
        },
        filename(req, file, callback) {
            let filename = file.originalname;
            let fileNameExtension = filename.split(".")[1]
            let newFileName = generateRandomString(12) + "." + fileNameExtension
            
            callback(null, newFileName)
            // callback(null, file.originalname)
        }
    }),
    fileFilter: (req, file, callback) => {
        if (file.mimetype!== 'image/png' && file.mimetype!== 'image/jpeg' && file.mimetype!== 'image/jpg'){
            callback(new Error('Only png, jpeg, and jpg are allowed!'))
        }
        
        callback(null, file.originalname);
    } })

router.get("/", (req, res) => {
    let getRef = ref(db, "listings")

    let sort = query(getRef, orderByValue('title'))
    onValue(sort, snapshot => {
        res.json(snapshot)
    })
})

// * STORE
router.post("/", upload.array('photos', 12), async (req, res) => {
    let data = req.body
    let photos = []
    
    req.files.forEach(file => {
        photos.push("/images/" + file.filename)
    });

    let params = {
        category: data.category,
        title: data.title,
        condition: data.condition,
        price: data.price,
        description: data.description,
        photos: photos,
        shipping: data.shipping,
        payment: data.payment,
        // user: data.user
    }

    const postRef = ref(db, 'listings')
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
router.put("/:id", upload.array('photos', 12), async (req, res) => {
    let data = req.body
    let photos = []

    req.files.forEach(file => {
        photos.push("/images/" + file.filename)
    });

    let params = {
        category: data.category,
        title: data.title,
        condition: data.condition,
        price: data.price,
        description: data.description,
        photos: photos,
        shipping: data.shipping,
        payment: data.payment
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

module.exports = router