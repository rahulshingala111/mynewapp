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
import { Link, useNavigate } from 'react-router-dom'

const EmployeeWorkHistory = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await axios
      .get('http://localhost:5000/dashboard/employee/work/viewemployeework')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  var output = data.reduce(function (accumulator, cur) {
    var createdBy = cur.createdBy,
      found = accumulator.find(function (elem) {
        return elem.createdBy == createdBy
      })
    if (found) {
      found.hour += cur.hour
    } else {
      accumulator.push(cur)
    }
    return accumulator
  }, [])
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
                        <h2>Employee</h2>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow className="text-end">
                    {/* <CCol>
                      Export To {'  '}
                      <CSVLink
                        data={filterData}
                        filename="work_history"
                        className="btn btn-primary"
                      >
                        CSV
                      </CSVLink>{' '}
                       <CButton onClick={handlePDF}>PDF</CButton> 
                    </CCol> */}
                  </CRow>
                </CCardHeader>

                <CCardBody>
                  <CTable striped hover>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Hours</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {output?.map((user, index) => (
                        <>
                          <CTableRow key={index}>
                            <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                            <CTableDataCell>
                              <a
                                onClick={() => {
                                  navigate('/dashboard/employee/work/viewemployeework/viewbyuser', {
                                    state: {
                                      createdBy: user.createdBy,
                                    },
                                  })
                                }}
                              >
                                {user.createdBy}
                              </a>
                            </CTableDataCell>
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
