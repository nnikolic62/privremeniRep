import React, { useEffect } from 'react'
import { useAppSelector } from '../hooks'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

function ProtectRoute() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(Object.keys(user).length === 0){
        return <Navigate to='/login' replace />
    }
  return <Outlet />
}

export default ProtectRoute
