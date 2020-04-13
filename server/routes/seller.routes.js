import express from 'express';
import sellerCtrl from '../controllers/seller.controller.js';

const router = express.Router();

router.route('/sellers')
    .get(sellerCtrl.list);

router.route('/sellers/add')
    .post(sellerCtrl.create);


export default router;

// router.post(
//     '/sellers/check',
//     async (req, res) => {
//         try {
//
//             const candidateSeller = await seller.find({});
//
//             res.status(200).json({message: candidateSeller});
//
//             candidateSeller.message.map((item) => {
//                 keys.map((element) => {
//                     if (item.title.toLowerCase().includes(element.toLowerCase())) {
//                         console.log(element, item.title);
//                         albums.push(item.id)
//                     }
//                 })
//             });
//
//         } catch (e) {
//             return res.status(500).json({message: 'Something went wrong with checking users'})
//         }
//     }
// );

