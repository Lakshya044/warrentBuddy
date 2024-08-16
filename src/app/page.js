import React from 'react'

import AdminDashboard from './Admin_Dashboard/page'
import PoliceDashboard from './Police_Dashboard/page'

import UserDashboard from './User_Dashboard/page'
import UpperNavbar from '@/components/Nabar'
import LowerNavbar from '@/components/Navbar_Lower'
import HomeGrid from '@/components/Home/Home'
import Footer from '@/components/Footer'
import ClientLogin from '@/components/Login/ClientLogin'
import Registration from '@/components/Login/Registration'
function page() {
  return (
    <div>
      <UpperNavbar/>
      <LowerNavbar/>
      <HomeGrid/>
      <Footer/>
      <ClientLogin/>
      <Registration/>
      <PoliceDashboard/>
      <AdminDashboard/>
     <UserDashboard/>
    </div>
  )
}

export default page
