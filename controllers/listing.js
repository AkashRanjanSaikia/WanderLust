const Listing = require("../Models/listing.js");


module.exports.index = async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs", { alllistings });

};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


module.exports.createNewListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "..", filename);
    const newListing = Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
};


module.exports.renderEditForm = async (req, res) => {

    let { id } = req.params;
    const list = await Listing.findById(id);
    if (!list) {
        req.flash("error", "Listing Does't exist!");
        res.redirect("/listings");
    }

    let orginalImageUrl = list.image.url;
    orginalImageUrl= orginalImageUrl.replace("/upload","/upload/w_200");


    res.render("listings/edit", { list ,orginalImageUrl });
};

module.exports.show = async (req, res) => {

    let { id } = req.params;

    const list = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("owner");
    if (!list) {
        req.flash("error", "Listing Does't exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { list });

};


module.exports.update = async (req, res) => {
    
    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    console.log(listing.image);

    if (typeof req.file !=="undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        
        listing.image = { url, filename };
        await listing.save();
    }
    console.log(listing.image);

    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`);
};


module.exports.delete = async (req, res) => {
    let { id } = req.params;
    let deleted_item = await Listing.findByIdAndDelete(id);
    console.log(deleted_item);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};