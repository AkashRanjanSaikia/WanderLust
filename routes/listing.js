const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedIn, isOwner,validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudeonfig.js");
const upload = multer({ storage });



router.route("/")
.get(wrapAsync(listingController.index))

.post(isloggedIn,
    upload.single('listing[image][url]'),
    validateListing,
    wrapAsync(listingController.createNewListing)
    );


//new listing Form
router.route("/new")
.get(isloggedIn, listingController.renderNewForm);



router.route("/:id")
.get(wrapAsync(listingController.show))
.put(isloggedIn,isOwner,upload.single('listing[image][url]'), validateListing,wrapAsync(listingController.update))
.delete(isloggedIn,isOwner, wrapAsync(listingController.delete));



router.get("/:id/edit", isloggedIn,isOwner, wrapAsync(listingController.renderEditForm));




module.exports = router;

