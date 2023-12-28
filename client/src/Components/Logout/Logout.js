import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate=useNavigate()
  function handleLogout(){
    localStorage.removeItem('chatAppUser')
    navigate('/login')
  }
  return (
    <div className='logout btn' style={{borderRadius:'50%'}} onClick={handleLogout}>
      <i className="fa-solid fa-right-from-bracket"  style={{cursor:'pointer',color:`var(--text)`}}></i>
    </div>
  )
}

export default Logout