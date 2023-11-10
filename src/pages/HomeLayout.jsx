import {  Outlet, useNavigation } from "react-router-dom"
import Navbar from "../components/Navbar"

const HomeLayout = () => {
  // layout that is being shared between all the pages <Outlet />
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const value='some value'
  return (
    <>
      <Navbar />
      <section className="page"
      >
        {
          isPageLoading ?<div className="loading"/>:
          <Outlet context={{ value }}/>
        }
      </section>
    </>
  )
}

export default HomeLayout
