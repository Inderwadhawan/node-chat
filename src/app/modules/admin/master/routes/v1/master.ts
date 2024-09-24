import express from 'express';
import organization from '../../../../../models/organization';
import {masterController} from "../../controllers/master"
const router = express.Router();

router.get('/getAllOrganization', masterController.getAllOrganization);
router.post('/createOrganization',masterController.createOrganization);


export default router;
