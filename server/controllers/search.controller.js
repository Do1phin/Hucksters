// import Seller from '../models/seller.model.js';
// import Album from '../models/album.model.js';
import Photo from '../models/photo.model.js';

const search = async (req, res) => {
    console.log(11111111111111)

    try {

        const searchStr = req.query.q;
        console.log('searchStr ', searchStr)
        if (!searchStr) {
            return res.status(400).json({message: 'Search string is empty'})
        }

        const data = await Photo.find({text: new RegExp(searchStr, 'i')});
        if (!data) {
            return res.status(404).json({message: 'Sorry, items with name "' + searchStr + '" in DB not found'})
        }

        return res.json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Something went wrong with search items in DB'})
    }

};

export default {
    search,
}
