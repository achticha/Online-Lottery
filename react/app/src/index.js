import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/้Home';
import Company from './pages/company';
import Lotto from './pages/lotto';
import Index from './pages/Findex';
import BillSale from './pages/BillSale';
import LottoInShop from './pages/LottoInShop';
import LottoForSend from './pages/LottoForSend';
import Bonus from './pages/Bonus';
import SaleBonus from './pages/SaleBonus';
import ReportIncome from './pages/Reportincome';
import LottoIsBonus from './pages/LottoIsBonus';
import ReportProfit from './pages/ReportProfit';
import User from './pages/User';
import ChangePrice from './pages/ChangePrice';
import Banner from './pages/Banner';
import Lottery from './pages/lottery';
import HomePage from './pages/homepage';
import AA from './pages/aa'
import Slip from './pages/Slip'


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/buy",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/company",
    element: <Company />,
  },
  {
    path: "/lotto",
    element: <Lotto />,
  },
  {
    path: "/changePrice",
    element: <ChangePrice />,
  },
  {
    path: "/billSale",
    element: <BillSale />,
  },
  {
    path: "/lottoInShop",
    element: <LottoInShop />,
  },
  {
    path: "/lottoForSend",
    element: <LottoForSend />,
  },
  {
    path: "/bonus",
    element: <Bonus />,
  },
  {
    path: "/saleBonus",
    element: <SaleBonus />,
  },
  {
    path: "/lottoIsBonus",
    element: <LottoIsBonus />,
  },
  {
    path: "/reportIncome",
    element: <ReportIncome />,
  },
  {
    path: "/reportProfit",
    element: <ReportProfit />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/banner",
    element: <Banner />,
  },
  {
    path: "/lottery",
    element: <Lottery />,
  },
  {
    path: "/hh",
    element: <HomePage />,
  },
  {
    path: "/aa",
    element: <AA />,
  },
  {
    path: "/slip",
    element: <Slip />,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
