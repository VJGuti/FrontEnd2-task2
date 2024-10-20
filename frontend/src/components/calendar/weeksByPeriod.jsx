import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import usePeriodStore from '@/stores/periodStore.mjs'

export default function Calendar() {
  const [weeks, setWeeks] = useState([])
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)
  const { periodId } = usePeriodStore()

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/periods/${periodId}/weeks`)
        const data = await response.json()
        setWeeks(data.weeks)
        setCurrentWeekIndex(0)
      } catch (error) {
        console.error('Error fetching weeks:', error)
      }
    }

    if (periodId) {
      fetchWeeks()
    }
  }, [periodId])

  const currentWeek = weeks[currentWeekIndex]

  const handlePreviousWeek = () => {
    setCurrentWeekIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const handleNextWeek = () => {
    setCurrentWeekIndex((prevIndex) => Math.min(weeks.length - 1, prevIndex + 1))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getWeekDates = (startDate) => {
    const start = new Date(startDate)
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      return date
    })
  }

  if (!currentWeek) {
    return <div className="w-full h-screen flex items-center justify-center">Cargando...</div>
  }

  const weekDates = getWeekDates(currentWeek.date)

  return (
    <div className="w-full bg-white">
      <div className="bg-green-900 text-white p-4">
        <h2 className="text-2xl font-bold text-center">Calendario UVM</h2>
      </div>
      <div className="p-4">
        <div className="bg-gray-100 p-4 mb-4">
          <h3 className="text-center text-xl text-black font-semibold">
            Semana {currentWeek.week_number} - {currentWeek.year}-{currentWeek.period}
          </h3>
        </div>
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousWeek}
            disabled={currentWeekIndex === 0}
            className="border-green-900 text-green-900 hover:bg-green-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-lg font-medium text-green-900">
            {formatDate(weekDates[0].toISOString())} - {formatDate(weekDates[6].toISOString())}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextWeek}
            disabled={currentWeekIndex === weeks.length - 1}
            className="border-green-900 text-green-900 hover:bg-green-100"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
            <div key={day} className="text-center font-medium text-green-900">
              {day}
            </div>
          ))}
          {weekDates.map((date, index) => (
            <div
              key={index}
              className="aspect-square flex items-center justify-center border border-gray-200 rounded-md hover:bg-green-50 transition-colors"
            >
              <span className="text-lg text-black">{date.getDate()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
