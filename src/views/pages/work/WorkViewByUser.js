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
import emailjs from 'emailjs-com'

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

  const handlemail = () => {
    console.log('handleemail')
    let newproject = []
    for (let i = 0; i <= data.length; i++) {
      //console.log(data[i].project + 'and ' + data[i].hour)
      newproject[i] = data[i].project
      console.log('new project' + newproject[i])
    }
    // const datatosned = {
    //   //to_mail: 'rahulshingala111@gmail.com',
    // }

    // await emailjs
    //   .send('service_justforfun', 'template_report', datatosned, '6UGSluLlxd2vg2Aie')
    //   .then(
    //     (result) => {
    //       console.log(result.text)
    //     },
    //     (error) => {
    //       console.log(error.text)
    //     },
    //   )
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
