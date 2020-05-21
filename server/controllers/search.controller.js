import Photo from '../models/photo.model.js';
import getErrorMessage from "../helpers/dbErrorHandler.js";
const search = async (req, res) => {

    const path = req.headers.referer;

    try {
        const searchStr = req.query.q;
        console.log('search.controller.js - > searchStr ', searchStr);
        if (!searchStr) {
            return res.status(400).json({message: 'Search string is empty'})
        }

        // if (location === 'photos') {
        //     data = await Photo.find({text: new RegExp(searchStr, 'i')});
        // } else if (location === 'albums') {
        //     data = await Album.find({title: new RegExp(searchStr, 'i')});
        // } else if (location === 'sellers') {
        //     data = await Member.find({lastName: new RegExp(searchStr, 'i')});
        // }

        await Photo.find({text: new RegExp(searchStr, 'i')}, (err, photo) => {
            if (err) return res.status(400).json({
                error: getErrorMessage(err)
            });
            return res.status(200).json({photo});
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: getErrorMessage(e)})
    }
};

export default {
    search,
}
