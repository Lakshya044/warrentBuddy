import React from 'react'

import AdminDashboard from './Admin_Dashboard/page'
import PoliceDashboard from './Police_Dashboard/page'

import UserDashboard from './User_Dashboard/page'
function page() {
  return (
    <div>
      {/* <PoliceDashboard/> */}
      {/* <AdminDashboard/> */}
     <UserDashboard/>
    </div>
  )
}

export default page
