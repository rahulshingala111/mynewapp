/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilEducation, cilUser, cilAddressBook, cilImagePlus, cilAlignLeft } from '@coreui/icons'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import { ReactDatePicker } from 'react-datepicker'

const AddProject = () => {
  const [startDate, setStartDate] = useState(new Date())

  const handleName = () => {}
  const handleDescription = () => {}
  const handleDate = () => {}
  const handleState = () => {}

  const handleSubmit = () => {}
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <div className="bg-light d-flex flex-row align-items-center">
              <CContainer>
                <CRow className="justify-content-center">
                  <CCol md={9} lg={7} xl={6}>
                    <CCard className="mx-4">
                      <CCardBody className="p-4">
                        <CForm onSubmit={handleSubmit}>
                          <h1>Employee</h1>
                          <p className="text-medium-emphasis">Add new Employee</p>

                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilAlignLeft} />
                            </CInputGroupText>
                            <CFormInput placeholder="name" onChange={handleName} required />
                          </CInputGroup>

                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <ReactDatePicker />
                          </CInputGroup>

                          <CInputGroup className="mb-3">
                            <CInputGroupText component="label">State</CInputGroupText>
                            <CFormSelect
                              onChange={handleState}
                              options={[
                                { label: 'new', value: 'new' },
                                { label: 'process', value: 'process' },
                                { label: 'completed', value: 'completed' },
                                { label: 'cancel', value: 'cancel' },
                                { label: 'disabled', value: 'disabled', disabled: true },
                              ]}
                              required
                            />
                          </CInputGroup>

                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilAddressBook} />
                            </CInputGroupText>
                            <CFormTextarea
                              rows={3}
                              placeholder="Must be 5 to 20 world in lenght"
                              onChange={handleDescription}
                            ></CFormTextarea>
                          </CInputGroup>

                          <div className="d-grid">
                            <CButton type="submit" color="success">
                              Add
                            </CButton>
                          </div>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CContainer>
            </div>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default AddProject
