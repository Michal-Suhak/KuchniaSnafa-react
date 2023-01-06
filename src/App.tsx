import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OfferDetails from "./components/OfferDetails/OfferDetails";
import OfferList from "./components/OfferList/OfferList";
import { OfferType } from "./types/OfferType";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserEdit from "./components/EditUser/UserEdit";
import NavBar from "./components/NavBar/NavBar";
import { Provider } from "react-redux/es/exports";
import { store } from "./Redux/store";
import Order from "./components/Order/Order";
function App() {
  const [details, setDetails] = useState<OfferType>();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<OfferList {...{ setDetails }} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserEdit />} />
          <Route path="/podsumowanie" element={<Order />} />
          <Route
            path="/:title"
            element={
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
    </Provider>
  );
}

export default App;
