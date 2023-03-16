/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'

const WorkHistory = () => {
  return (
    <>
      <div>
        <AppSidebar/>
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">Inside Work History</div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default WorkHistory
