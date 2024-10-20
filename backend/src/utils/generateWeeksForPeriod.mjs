import dayjs from 'dayjs'
import isoWeek from "dayjs/plugin/isoWeek.js";
import { addPeriodWeekDb } from '../db/db.mjs';

dayjs.extend(isoWeek);

/**
 * Genera 15 semanas para un periodo dado a partir de un día de la semana específico 
 * y la fecha de inicio.
 * @param {number} period_id - ID del periodo al que pertenecen las semanas.
 * @param {string} start_date - Fecha de inicio del periodo (YYYY-MM-DD).
 * @param {string} day_of_week - Día de la semana ("Lunes", "Martes").
 * @returns {Array} - Lista de semanas generadas.
 */
export const generateWeeksForPeriod = async (period_id, start_date, day_of_week) => {
  try {
    // Mapeo de días de la semana a su equivalente numérico ISO
    const dayMap = {
      "Lunes": 1,
      "Martes": 2,
      "Miercoles": 3,
      "Jueves": 4,
      "Viernes": 5,
      "Sabado": 6,
      "Domingo": 7,
    };

    const targetDay = dayMap[day_of_week]; // Obtener el día deseado

    // Convertir la fecha de inicio a un objeto dayjs
    let currentDate = dayjs(start_date);

    // Ajustar la fecha inicial para que coincida con el día de la semana deseado
    while (currentDate.isoWeekday() !== targetDay) {
      currentDate = currentDate.add(1, 'day');
    }

    const weeks = [];
    let weekNumber = 1;

    // Generar las 15 semanas
    while (weekNumber <= 15) {
      // Agregar la semana al array
      weeks.push({
        period_id,
        week_number: weekNumber,
        day_of_week,
        date: currentDate.format('YYYY-MM-DD'),
      });

      // Insertar la semana en la base de datos
      await addPeriodWeekDb(period_id, weekNumber, day_of_week, currentDate.format('YYYY-MM-DD'));

      // Sumar 7 días para la próxima semana
      currentDate = currentDate.add(7, 'days');
      weekNumber++;
    }

    return weeks;
  } catch (error) {
    console.error('Error generating weeks:', error);
    throw error;
  }
};

