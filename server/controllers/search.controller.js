// import Seller from '../models/seller.model.js';
// import Album from '../models/album.model.js';
import Photo from '../models/photo.model.js';

const search = async (req, res) => {
    console.log(11111111111111)

    const path = req.headers.referer;
    // const a = new RegExp(/q=.+?(?=&)/g);
    // console.log('aaaaa ', a)

    try {

        const searchStr = req.query.q;
        console.log('search.controller.js - > searchStr ', searchStr);
        if (!searchStr || searchStr === undefined) {
            return res.status(400).json({message: 'Search string is empty'})
        }
        let data;
        // if (location === 'photos') {
        //     data = await Photo.find({text: new RegExp(searchStr, 'i')});
        // } else if (location === 'albums') {
        //     data = await Album.find({title: new RegExp(searchStr, 'i')});
        // } else if (location === 'sellers') {
        //     data = await Seller.find({lastName: new RegExp(searchStr, 'i')});
        // }

        data = await Photo.find({text: new RegExp(searchStr, 'i')});

        if (!data) {
            return res.status(404).json({message: 'Sorry, items with name "' + searchStr + '" in DB not found'})
        }

        return res.json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Something went wrong with search items in DB'})
    }

};

const test = async (req, res) => {
    db.companies.findOne({_id: user.company})

};

export default {
    search,
    test
}
