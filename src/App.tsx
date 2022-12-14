import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OfferDetails from './components/OfferDetails/OfferDetails'
import OfferList from './components/OfferList/OfferList'
import { OfferType } from './types/OfferType'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

function App() {
  const [details, setDetails] = useState<OfferType>();

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OfferList {...{setDetails}}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/:title" element={
          <OfferDetails
            title={details?.title || ""}
            description={details?.description || ""} 
            price={details?.price || 0} 
            calories={details?.calories || ""} 
            photoUrl={details?.photoUrl || ""} 
          />
        } 
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App
