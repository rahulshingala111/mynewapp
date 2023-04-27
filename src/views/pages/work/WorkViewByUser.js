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
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import mailchimpTx from '@mailchimp/mailchimp_transactional'
import jsPDF from 'jspdf'
import { autoTable } from 'jspdf-autotable'
const mailchimp = require('@mailchimp/mailchimp_transactional')('md-vSOG0VXINFRZ7wTjYQAlSg')

const EmployeeWorkHistory = () => {
  const [data, setData] = useState([])

  let location = useLocation()
  const employee = location.state.createdBy

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await axios
      .post('http://localhost:5000/dashboard/employee/work/viewemployeework/viewbyuser', {
        employee: location.state.createdBy,
      })
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const decoded = jwt_decode(Cookies.get('token'))

  let bodydata = []
  data.forEach((element, index, array) => {
    bodydata.push([index + 1, element.project, element.hour])
  })

  const handlemail = async () => {
    console.log('handleemail')
    await axios
      .post('http://localhost:5000/dashboard/mail', {
        bodydata: bodydata,
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CForm className="row gy-3 gx-3 align-items-center">
              <CCard className="mb-4">
                <CCardHeader>
                  <CRow className="text-end">
                    <CCol className="text-start">
                      <div>
                        <h2>{employee}</h2>
                      </div>
                    </CCol>
                    {decoded.username === 'admin' ? (
                      <CCol>
                        <CButton onClick={handlemail}>Send Email</CButton>
                      </CCol>
                    ) : null}
                  </CRow>
                  <CRow className="text-end"></CRow>
                </CCardHeader>

                <CCardBody>
                  <CTable striped hover>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Project</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Hours</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {data?.map((user, index) => (
                        <>
                          <CTableRow key={index}>
                            <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                            <CTableDataCell>{user.project}</CTableDataCell>
                            <CTableDataCell>{user.hour}</CTableDataCell>
                          </CTableRow>
                        </>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CForm>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default EmployeeWorkHistory
