import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Routes } from 'react-router'
import { Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import SettingPage from './pages/SettingPage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from "lucide-react";


const App = () => {
  const{authUser,checkAuth,isCheckingAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log(authUser);
  if(isCheckingAuth && !authUser){
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to={"/login"}/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/setting' element={<SettingPage/>}/>
      </Routes>
    </>
  )
}

export default App

