import express from 'express';
import memberCtrl from '../controllers/member.controller.js';

const router = express.Router();

router.route('/members/create')
    .post(memberCtrl.createMember);

router.route('/members')
    .post(memberCtrl.readMember);

router.route('/members_for_ids')
    .post(memberCtrl.readManyMembersForIds);

router.route('/members/update')
    .post(memberCtrl.updateMember);

// router.route('/members/delete')
//     .post(memberCtrl.deleteMember);

export default router;
