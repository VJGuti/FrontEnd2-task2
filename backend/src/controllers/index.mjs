import { getVersionDb, getPeriodsDb, addPeriodDb, addPeriodWeekDb, getPeriodsWeeksByPeriodDb } from '../db/db.mjs';
import { generateWeeksForPeriod } from '../utils/generateWeeksForPeriod.mjs';


export const getVersion = async (req, res) => {
  try {
    const data = getVersionDb;

    return res.status(200).json({ data });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting version" });
  }
};

export const getPeriods = async (req, res) => {
  try {
    const data = getPeriodsDb
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error getting periods" });
  }
};

export const addPeriod = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const { year, period, start_date, end_date } = data;
      if (year && period && start_date && end_date) {
        const addingPeriod = await addPeriodDb(year, period, start_date, end_date)
        if (addingPeriod) {
          return res.status(200).json({ data });
        }
      }
      return res.status(400).json({ message: 'Bad Request' });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error adding period" });
  }
};

export const addPeriodWeek = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const { period_id, week_number, day_of_week, date } = data;
      if (period_id && week_number && day_of_week && date) {
        const addingWeek = await addPeriodWeekDb(period_id, week_number, day_of_week, date);
        if (addingWeek) {
          return res.status(200).json({ addingWeek });
        }
      }
      return res.status(400).json({ message: 'Bad Request' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding period week" });
  }
};


export const addWeeksforUniquePeriodByDay = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const { period_id, start_date, day_of_week } = data;
      if (period_id && start_date && day_of_week) {
        const weeks = generateWeeksForPeriod(period_id, start_date, day_of_week);
        return res.status(200).json({ weeks });
      }
      return res.status(400).json({ message: 'Bad Request' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error generating weeks" });
  }
};

export const getPeriodsWeeksByPeriodId = async (req, res) => {
  try {
    const data = req.params.period_id;
    if (data) {
      const period_id = data;
      const weeks = await getPeriodsWeeksByPeriodDb(period_id);
      return res.status(200).json({ weeks });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting periods" });
  }
}















