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

const ViewProject = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await axios
      .get('http://localhost:5000/dashboard/project/addproject/view')
      .then((response) => {
        setData(response.data)
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
            <CForm>
              <CRow>
                <CCol xs={12}>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <div className="row">
                        <div className="col h3">Project</div>
                        <div className="col-md-4">
                          <CFormInput
                            type="text"
                            id="searchInput"
                            placeholder="Search"
                            onChange={(e) => requestSearch(e.target.value)}
                          />
                        </div>
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <CTable striped hover>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {data?.map((user, index) => (
                            <>
                              <CTableRow key={index}>
                                <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                                <CTableDataCell>{user.name}</CTableDataCell>
                                <CTableDataCell>{user.state}</CTableDataCell>
                                <CTableDataCell>{user.description}</CTableDataCell>
                                <CTableDataCell>{user.date}</CTableDataCell>
                              </CTableRow>
                            </>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CForm>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default ViewProject
