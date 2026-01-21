import React, { useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'

const CandidateLayout = ({children}) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}/>

      <div className="flex-1 flex flex-col">
        <Navbar role="candidate" toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />

        <main className="flex-1 p-6 mt-16 lg:mt-20  lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}

export default CandidateLayout