import { Facebook, Twitter, Youtube, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Location</h2>
            <p className="mb-2"> 8C25+M62, Av. Principal de Carvajal, Valera 3102, Trujillo, Venezuela</p>
            <p className="mb-2"></p>
            <p> UVM - Info: info@uvm.edu.ve</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Connect</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Youtube size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-green-800 pt-8 flex justify-between items-center">
          <div className="text-sm">
            <a href="#" className="hover:underline mr-4">Accessibility</a>
            <a href="#" className="hover:underline">Privacy/Terms of Use</a>
          </div>
          <div className="text-sm">
            © 2024 Example University
          </div>
        </div>
      </div>
    </footer>
  )
}
