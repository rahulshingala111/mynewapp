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
import { async } from 'regenerator-runtime'
const WorkHistory = () => {
  const [refreshData, setRefreshData] = useState(1)
  const [filterData, setFilterData] = useState([])

  useEffect(() => {
    getData()
  }, [refreshData])

  const getData = async () => {
    await axios
      .get('http://localhost:5000/dashboard/employee/work/viewwork')
      .then((response) => {
        setFilterData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handlePDF = () => {
    var doc_pdf = new jsPDF('portrait', 'px', 'a4')

    let bodydata = []
    filterData.forEach((element, index, array) => {
      bodydata.push([index + 1, element.project, element.hour, element.date, element.description])
    })

    doc_pdf.autoTable({
      head: [['#', 'Projects', 'Hours', 'Date', 'Description']],
      body: bodydata,
    })

    doc_pdf.save('test.pdf')
  }
  const handleApply = async () => {
    await axios
      .post('http://localhost:5000/dashboard/employee/work/viewwork/filtered', {
        sdate: document.getElementById('abc').value,
        edate: document.getElementById('bcd').value,
      })
      .then((response) => {
        setFilterData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleResetFilter = () => {
    setRefreshData(Math.random())
  }
  var output = filterData.reduce(function (accumulator, cur) {
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
                  <CRow className="text-end">
                    <CCol className="text-start">
                      <div>
                        <h2>Project</h2>
                      </div>
                    </CCol>
                    <CCol sm={2}>
                      <CFormInput type="date" id="abc" />
                    </CCol>
                    <CCol sm={2}>
                      <CFormInput type="date" id="bcd" />
                    </CCol>
                    <CCol sm={2}>
                      <CButton onClick={handleApply}>Apply</CButton>{' '}
                      <CButton onClick={handleResetFilter}>Reset</CButton>
                    </CCol>
                  </CRow>
                  <CRow className="text-end">
                    <CCol>
                      Export To {'  '}
                      <CSVLink
                        data={filterData}
                        filename="work_history"
                        className="btn btn-primary"
                      >
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
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {output?.map((user, index) => (
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

export default WorkHistory
