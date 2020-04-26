import Group from '../models/group.model.js';

const groupCreate = async (req, res) => {
    const {groupId, name, photo, size} = req.body;

    try {
        const groupCandidate = await Group.findOne({groupId});

        if (groupCandidate) {
            return res.status(400).json({success: false, message: `Group with id ${groupId} already exist`})
        }

        const group = new Group({
            groupId,
            size,
            name,
            photo
        });

        await group.save();

        return res.status(200).json({success: true, message: `Group with id ${groupId} was created successfully in DB`})

    } catch (e) {
        return res.status(500).json({success: false, e, message: 'Something went wrong with created group in DB'})
    }
};

const groupRemove = async (req, res) => {
    const {groupId} = req.body;
    console.log(req.body)

    try {
        await Group.deleteOne({groupId:groupId})
    } catch (e) {
        return res.status(500).json({success: false, e, message: 'Something went wrong with deleted group in DB'})
    }
};

const groupList = async (req, res) => {

    try {

        await Group.find()
            .exec((e, groups) => {
                if (e) return res.status(400).json({success: false, e, message: 'No groups'});
                return res.status(200).json({success: true, groups})
            });

    } catch (e) {
        return res.status(500).json({success: false, e, message: 'Something went wrong with load list groups'})
    }
};



export default {
    groupCreate,
    groupList,
    groupRemove,
}
