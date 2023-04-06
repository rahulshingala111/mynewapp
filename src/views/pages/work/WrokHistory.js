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
import { CSVLink, CSVDownload } from 'react-csv'
import jsPDF from 'jspdf'
import { autoTable } from 'jspdf-autotable'
const WorkHistory = () => {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await axios
      .get('http://localhost:5000/dashboard/employee/work/viewwork')
      .then((response) => {
        setData(response.data)
        setFilterData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handlePDF = () => {
    var doc_pdf = new jsPDF('portrait', 'px', 'a4')

    let bodydata = []
    data.forEach((element, index, array) => {
      bodydata.push([index + 1, element.project, element.hour, element.date, element.description])
    })

    doc_pdf.autoTable({
      head: [['#', 'Projects', 'Hours', 'Date', 'Description']],
      body: bodydata,
    })

    doc_pdf.save('test.pdf')
  }

  var today = new Date()
  const date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate()
  console.log(date)

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
                  <CRow>
                    <CCol sm={5}>
                      <div>
                        <h2>Project</h2>
                      </div>
                    </CCol>
                    <CCol sm={2}>
                      <CFormInput type="date" value={date} />
                    </CCol>
                    <CCol sm={2}>
                      <CFormInput type="date" value={date} />
                    </CCol>
                    <CCol>
                      <CSVLink data={data} filename="work_history" className="btn btn-primary">
                        Export To CSV
                      </CSVLink>{' '}
                      <CButton onClick={handlePDF}>Export to PDF</CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>

                <CCardBody>
                  <CTable striped hover>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Project</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Hours</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {data?.map((user, index) => (
                        <>
                          <CTableRow key={index}>
                            <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                            <CTableDataCell>{user.project}</CTableDataCell>
                            <CTableDataCell>{user.hour}</CTableDataCell>
                            <CTableDataCell>{user.date}</CTableDataCell>
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

export default WorkHistory
