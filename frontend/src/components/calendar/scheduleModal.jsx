import { useState } from 'react'
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import usePeriodStore from '@/stores/periodStore.mjs'

export function ScheduleModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(undefined)
  const [selectedDay, setSelectedDay] = useState(undefined)
  const { periodId } = usePeriodStore()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedDate || !selectedDay) {
      console.error('Please select both a date and a day of the week')
      return
    }

    const formData = {
      period_id: periodId,
      start_date: format(selectedDate, 'yyyy-MM-dd'),
      day_of_week: selectedDay
    }

    try {
      const response = await fetch('http://localhost:3000/api/periods/weeks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        console.log('Schedule submitted successfully')
        setIsOpen(false)
        setSelectedDate(undefined)
        setSelectedDay(undefined)
      } else {
        const errorData = await response.json()
        console.error('Failed to submit schedule:', errorData)
      }
    } catch (error) {
      console.error('Error submitting schedule:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-green-600 text-white hover:bg-green-700">Programar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-600">Programar Semanas</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-green-600">Fecha de Inicio</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left text-black font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Seleccione una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-green-600">Día de la Semana</label>
            <Select onValueChange={setSelectedDay} value={selectedDay}>
              <SelectTrigger className="w-full text-black">
                <SelectValue placeholder="Seleccione un día" />
              </SelectTrigger>
              <SelectContent>
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700">Enviar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
