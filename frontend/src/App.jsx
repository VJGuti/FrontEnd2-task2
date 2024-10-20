
import ModernNavbar from './components/layouts/navbar-uvm'
import Footer from './components/layouts/footer'
import Calendar from './components/calendar/weeksByPeriod'
import UVMFacts from './components/layouts/info'

function App() {
  return (
    <>
      <ModernNavbar />
      <Calendar />
      <UVMFacts />
      <Footer />
    </>
  )
}

export default App
