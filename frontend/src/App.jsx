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
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'


const App = () => {
  const{authUser,checkAuth,isCheckingAuth}=useAuthStore();
  const {theme}=useThemeStore();

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
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to={"/"}/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}/>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to={"/login"}/>}/>
        <Route path='/profile' element={authUser? <ProfilePage/>:<SignUpPage/> }/>
        <Route path='/setting' element={<SettingPage/>}/>
      </Routes>
      <Toaster/>
      <Footer/>
    </div>
  )
}

export default App

