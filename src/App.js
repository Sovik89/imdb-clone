import "./App.css";

import Header from ".//components/Header";
import Banner from ".//components/Banner";
import Movies from ".//components/Movies";
import Watchlist from ".//components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    
    <div className="App">
      {/* 
      
      Here we have two routes first route which consists of the banner as well as the movies
      
      */}
      <BrowserRouter>
        {/*Header is common for both the routes */}
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={<Watchlist />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;