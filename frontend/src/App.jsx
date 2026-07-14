import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import About from "./pages/About";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    // <Authenticator>
    // {({ signOut, user }) => (
    //   <>
    //     <h1>Welcome, {user?.signInDetails?.loginId}</h1>
    //     <button onClick={signOut}>Sign out</button>
    <Authenticator.Provider>
      <BrowserRouter>
        <Navbar />

        <div className="app-shell py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route
              path="/cart"
              element={
                <Authenticator>
                  {({ signOut, user }) => (
                    <Cart />
                  )}
                </Authenticator>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Authenticator.Provider>
    //   </>
    // )}
    // </Authenticator>
  );
}

export default App;