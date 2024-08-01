import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Homepage/Home'
import ChatInterface from './Chatbot/ChatInterface'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Users } from 'lucide-react'
function App() {
  const [count, setCount] = useState(0)
  // onbeforeunload = function() { localStorage. removeItem('user','Chatuse'); return ''; };
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/*Just call the path name in the login and signup
          and store the user id in the local storage.
        */}

        <Route path="/chat" element={<ChatInterface />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
