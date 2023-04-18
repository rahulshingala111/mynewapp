/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CImage,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'

const EmployeeWorkHistory = () => {
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3"></div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default EmployeeWorkHistory
