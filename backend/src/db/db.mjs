import { neon } from "@neondatabase/serverless"
import { config } from 'dotenv'
config()

export const connection = async () => {
  try {
    const db = neon(process.env.DATABASE_URL)
    if (!db) throw new Error("Database connection failed")
    return db
  } catch (error) {
    console.log(error)
  }
}

const db = await connection()

export const getVersionDb = await db`SELECT version()`
console.log(getVersionDb)

export const getPeriodsDb = await db`SELECT * FROM periods`
console.log(getPeriodsDb)

export const addPeriodDb = async (year, period, start_date, end_date) => {
  return await db`
    INSERT INTO periods (year, period, start_date, end_date) 
    VALUES (${year}, ${period}, ${start_date}, ${end_date})
  `;
};

export const addPeriodWeekDb = async (period_id, week_number, day_of_week, date) => {
  return await db`
    INSERT INTO period_weeks (period_id, week_number, day_of_week, date) 
    VALUES (${period_id}, ${week_number}, ${day_of_week}, ${date})
  `;
};

export const getPeriodsWeeksByPeriodDb = async (period_id) => {
  try {
    return await db`
      SELECT 
        p.id AS period_id,
        p.year,
        p.period,
        p.start_date,
        p.end_date,
        pw.id AS week_id,
        pw.week_number,
        pw.day_of_week,
        pw.date
      FROM periods p
      INNER JOIN period_weeks pw ON p.id = pw.period_id
      WHERE p.id = ${period_id};
    `;
  } catch (error) {
    console.log("Error fetching periods and weeks: ", error);
    throw error;
  }
};

