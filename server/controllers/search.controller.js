// import Seller from '../models/seller.model.js';
// import Album from '../models/album.model.js';
import Photo from '../models/photo.model.js';

const search = async (req, res) => {
    try {

        // const {searchStr} = req.body;
        let searchStr = 'руб';
        searchStr = `/${searchStr}/i`;

        const data = await Photo.find({text: /руб/i});
        if (!data) {
            return res.status(404).json({message: 'Sorry, items with name "' + searchStr + '" in DB not found'})
        }

        return res.json(data);
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'Something went wrong with search items in DB'})
    }

};

export default {
    search,
}
