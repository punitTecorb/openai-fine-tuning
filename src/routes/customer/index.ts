import { Router } from 'express';
const baseRouter = Router();
import openai from './openAIApi';

// Setup routers
baseRouter.use('/openai', openai);
// Export default.
export default baseRouter;