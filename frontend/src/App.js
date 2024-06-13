import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import Results from './Components/Results';
import GuestRoutes from './Pages/GuestRoutes';
import Login from './Pages/Login';
import { LOGIN } from './redux/actions';
import Register from './Pages/Register';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import ProtectedRoutes from './Pages/ProtectedRoutes';
import Error404 from './Pages/Error404';
import Wallet from './Pages/Wallet';
import Transactions from './Pages/Transactions';
// import NftSearchForm from './Components/NftSearchForm';
import UserSettings from './Pages/UserSettings';
import Faq from './Pages/Faq';
import "../src/Style/index.css"
import HistoricalAnalysis from './Pages/HistoricalAnalysis';
import PremiumRoutes from './Pages/PremiumRoutes';
import BuyPremium from './Pages/BuyPremium';
// import SolSearchResults from './Components/SolSearchResults';
// import EthSearchResults from './Components/EthSearchResults';


function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      axios('/api/user')
          .then((res) => {
              dispatch({
                  type: LOGIN,
                  payload: res.data,
              });
            })
          .catch((err) => console.log(err))
          .finally(() => setLoaded(true));
  }, [dispatch]);

    return (
      loaded && (
        <BrowserRouter>
        <Navbar />
        <div className="App">
          <div className="container">
            <div className="row">
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route element={<ProtectedRoutes />}>
                    <Route path="/crypto" element={<SearchForm />} />
                    {/* <Route path='/nft' element={<NftSearchForm />} /> */}
                    <Route path="/results" element={<Results />} />
                    {/* <Route path='/ethsearchresults' element={<EthSearchResults />} />
                    <Route path='/solsearchresults' element={<SolSearchResults />} /> */}
                    <Route path='/wallet' element={<Wallet />} />
                    <Route path="/transactions/:id_crypto" element={<Transactions />} />
                    <Route path='/profile' element={<UserSettings />} />
                    <Route path='/faq' element={<Faq />} />
                    <Route path='/buypremium' element={<BuyPremium />} />
                  </Route>

                  <Route element={<PremiumRoutes />}>
                  <Route path='/analysis' element={<HistoricalAnalysis />} />
                  </Route>

                  <Route element={<GuestRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Route>
                  
                  <Route path="/404" element={<Error404 />} />
                  <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </div>
          </div>
        </div>
        </BrowserRouter>
        )
    );
}

export default App;
