import { Router } from 'express';
import { getPeriods, getVersion, addPeriod, addWeeksforUniquePeriodByDay, getPeriodsWeeksByPeriodId } from '../controllers/index.mjs';


const router = Router();

router.get('/version', getVersion)
router.get('/periods', getPeriods)
router.get('/periods/:period_id/weeks', getPeriodsWeeksByPeriodId)
router.post('/periods', addPeriod)
router.post('/periods/weeks', addWeeksforUniquePeriodByDay)

export const indexRouter = router;
