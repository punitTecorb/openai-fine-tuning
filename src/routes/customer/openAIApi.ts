import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import openaiController from '@controllers/customer/openAIApi';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    resByUserRole: '/resByUserRole',
    resByAssistantRole:'/resByAssistantRole',
    resBySystemRole:'/resBySystemRole',
    getAllModel:'/getAllModel',
    UploaddataFile:'/UploaddataFile',
    CreateFineTune:'/CreateFineTune',
    createCompletions:'/createCompletions',
    getFineTuneList:'/getFineTuneList'
} as const;

/////////////////////// Response by user role ///////////////////////
router.post(p.resByUserRole, async (req: any, res: Response) => {
    const data = await openaiController.resByUserRole(req.body);
    return res.status(OK).send({ data, code: OK, message:'success',result:data});
});

/////////////////////// Response by assistant role ///////////////////////
router.post(p.resByAssistantRole, async (req: any, res: Response) => {
    const data = await openaiController.resByAssistantRole(req.body);
    return res.status(OK).send({ data, code: OK, message:'success',result:data});
});

/////////////////////// Response by system role ///////////////////////
router.post(p.resBySystemRole, async (req: any, res: Response) => {
    const data = await openaiController.resBySystemRole(req.body);
    return res.status(OK).send({ data, code: OK, message:'success',result:data});
});

/////////////////////// Response by system role ///////////////////////
router.get(p.getAllModel, async (req: any, res: Response) => {
    const data = await openaiController.getAllModel();
    return res.status(OK).send({ data, code: OK, message:'success',result:data});
});

/////////////////////// Upload file ///////////////////////
router.get(p.UploaddataFile, async (req: any, res: Response) => {
    const data = await openaiController.UploaddataFile();
    return res.status(OK).send({ data, code: OK, message:'success',result:data});
});

/////////////////////// Create fine-tune ///////////////////////
router.get(p.CreateFineTune, async (req: any, res: Response) => {
    const data = await openaiController.CreateFineTune();
    return res.status(OK).send({ data, code: OK, message:'success'});
});

/////////////////////// Get fine-tune ///////////////////////
router.get(p.getFineTuneList, async (req: any, res: Response) => {
    const data = await openaiController.getFineTuneList();
    return res.status(OK).send({ data, code: OK, message:'success'});
});

/////////////////////// Create fine-tune ///////////////////////
router.post(p.createCompletions, async (req: any, res: Response) => {
    const data = await openaiController.createCompletions(req.body);
    return res.status(OK).send({ data, code: OK, message:'success'});
});
// Export default
export default router;