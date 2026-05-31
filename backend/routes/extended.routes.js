import express from 'express';
import { getCommodityExports, getStateBudgets, getMicrobiomeData, getVirtualTours } from '../controllers/extendedModules.controller.js';

const router = express.Router();

router.get('/exports', getCommodityExports);
router.get('/budgets', getStateBudgets);
router.get('/microbiome', getMicrobiomeData);
router.get('/tours', getVirtualTours);

export default router;
