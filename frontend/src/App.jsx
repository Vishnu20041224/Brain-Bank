
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Button } from "./components/ui/button"
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import Navbar from './pages/Navbar.jsx';
import Statistics from './pages/Statistics.jsx';
import Stat from './pages/Statistic.jsx';
const App = () => {
 


  return (
    <Router>
      <div className="min-h-screen bg-gray-200">
        <Navbar/>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/statistics" element={<Statistics/>} />
            <Route path="/stat" element={<Stat/>} />
          </Routes>
        </main>

      </div>
    </Router>


    // <div className="flex min-h-svh flex-col items-center justify-center">
    //   <Button>Home Page</Button>
    // </div>
  )
}

export default App