import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ScheduleModal } from '../calendar/scheduleModal'

import usePeriodStore from '@/stores/periodStore.mjs'

export default function ModernNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [periods, setPeriods] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const { setPeriodId } = usePeriodStore()

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/periods')
        const data = await response.json()
        console.log('Periods:', data)
        setPeriods(data.data)
      } catch (error) {
        console.error('Error fetching periods:', error)
      }
    }

    fetchPeriods()
  }, [])

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-2xl text-green-600">UVM</span>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default">{selectedPeriod || 'Select Period'}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {periods.map((period) => (
                  <DropdownMenuItem
                    key={period.id}
                    onSelect={() => {
                      setSelectedPeriod(`${period.year}-${period.period}`)
                      setPeriodId(period.id)
                    }}
                  >
                    {`${period.year}-${period.period}`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ScheduleModal />
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="default" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-4 pb-3 border-t border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="w-full">
                  {selectedPeriod || 'Select Period'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {periods.map((period) => (
                  <DropdownMenuItem
                    key={period.id}
                    onSelect={() => {
                      setSelectedPeriod(`${period.year}-${period.period}`)
                      setPeriodId(period.id)
                    }}
                  >
                    {`${period.year}-${period.period}`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ScheduleModal />
          </div>
        </div>
      )}
    </nav>
  )
}

