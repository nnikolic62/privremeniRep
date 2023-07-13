import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import { Container } from "@mui/material";
import StoreDialog from '../components/StoreDialog';
import { useAppSelector } from '../hooks';

function Root() {
  const isOpen =  useAppSelector((state) => state.dialog.visible);
  return (
    <>
      <header>
        <MainNavigation />
        <StoreDialog />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Root
