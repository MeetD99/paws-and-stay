import React from 'react'
import './index.css'
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link ,
  RouterProvider,
  createBrowserRouter,
  Outlet

} from "react-router-dom";

import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx';
import UserSignup from './pages/UserSignup.jsx';
import UserSignin from './pages/UserSignin.jsx';
import Footer from './components/Footer';
import AddPets from './pages/AddPets.jsx';
import MyPets from './pages/MyPets.jsx';
import FacilityHome from './pages/FacilityHome.jsx';

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
    
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserSignup />
  },
  {
    path: "/login",
    element: <UserSignin />
  },
  {
    path: "/dashboard",
    element: <Layout/>,
    children: [
      {
        path: '/dashboard',
        element: <Home />
      },
      {
        path: '/dashboard/addpet',
        element: <AddPets />
      },
      {
        path: '/dashboard/mypets',
        element: <MyPets />
      },
    ]
  },
  {
    path: "/facilitydashboard",
    element: <Layout/>,
    children: [
      {
        path: '/facilitydashboard',
        element: <FacilityHome />
      },
      {
        path: '/facilitydashboard/addservice',
        element: <AddPets />
      },
      {
        path: '/facilitydashboard/myservices',
        element: <MyPets />
      },
    ]
  }
]);

export default function App() {
  return (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );
}
