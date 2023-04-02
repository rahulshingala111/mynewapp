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
import 'jspdf-autotable'
const WorkHistory = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await axios
      .get('http://localhost:5000/dashboard/employee/work/viewwork')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handlePDF = () => {
    var doc_pdf = new jsPDF()
    autoTable(doc_pdf, {
      head: [['Name', 'Email', 'Country']],
      body: [
        ['David', 'david@example.com', 'Sweden'],
        ['Castille', 'castille@example.com', 'Spain'],
        // ...
      ],
    })

    doc_pdf.save('test.pdf')
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
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <CTable striped hover>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Project</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Hours</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
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
                                <CTableDataCell>{user.description}</CTableDataCell>
                              </CTableRow>
                            </>
                          ))}
                          <CTableRow>
                            <CTableHeaderCell>
                              <CSVLink
                                data={data}
                                filename="work_history"
                                className="btn btn-primary"
                              >
                                Export To CSV
                              </CSVLink>
                            </CTableHeaderCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableHeaderCell>
                              <CButton onClick={handlePDF}>Export to PDF</CButton>
                            </CTableHeaderCell>
                          </CTableRow>
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

export default WorkHistory
