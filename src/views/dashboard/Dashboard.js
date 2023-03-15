/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'
import axios from 'axios'
import Cookies from 'js-cookie'

const Dashboard = () => {
  const [data, setData] = useState()

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    const token = Cookies.get('token')
    const auth = {
      headers: {
        myheader: token,
      },
    }
    axios
      .get('http://localhost:5000/dashboard', auth)
      .then((response) => {
        setData(response.data)
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
        window.location = '/login'
      })
  }
  return (
    <>
      <div>
        <AppSidebar data={data} />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">Inside Dasboard</div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default Dashboard
