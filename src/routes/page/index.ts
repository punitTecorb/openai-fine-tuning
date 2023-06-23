import { Router } from 'express';
import { Request, Response } from 'express';
import path from 'path';
const viewsDir = path.join(__dirname, '../../public/admin/views');

const baseRouter = Router();

/***********************************************************************************
 *                                  Front-end routes
 **********************************************************************************/
baseRouter.get('/', (_: Request, res: Response) => {
    res.redirect('/page')
});

//*********** Page*************//
baseRouter.get('/page', (_: Request, res: Response) => {
    res.sendFile('user/chatPage.html', { root: viewsDir });
});



export default baseRouter;