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
  var today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [startingDate, setStartingDate] = useState('2001-06-03')
  const [endingDate, setEndingDate] = useState(date)

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

  const handleStartingDate = (e) => {
    setStartingDate(e.target.value)
  }

  const handleEndingDate = (e) => {
    setEndingDate(e.target.value)
  }

  const handleResetFilter = () => {
    setStartingDate('2001-06-03')
    setEndingDate(date)
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

  let datefilter = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].date >= startingDate && data[i].date <= endingDate) {
      datefilter.push(data[i])
    }
  }

  var arr = datefilter
  var output = arr.reduce(function (accumulator, cur) {
    var project = cur.project,
      found = accumulator.find(function (elem) {
        return elem.project == project
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
                  <CRow>
                    <CCol sm={4}>
                      <div>
                        <h2>Project</h2>
                      </div>
                    </CCol>
                    <CCol sm={2}>
                      <CFormInput type="date" onChange={handleStartingDate} />
                    </CCol>
                    <CCol sm={2}>
                      <CFormInput type="date" onChange={handleEndingDate} />
                    </CCol>
                    <CCol sm={1}>
                      <CButton onClick={handleResetFilter}>Reset</CButton>
                    </CCol>
                    <CCol>
                      Export To {'  '}
                      <CSVLink data={data} filename="work_history" className="btn btn-primary">
                        CSV
                      </CSVLink>{' '}
                      <CButton onClick={handlePDF}>PDF</CButton>
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
                      {output?.map((user, index) => (
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
