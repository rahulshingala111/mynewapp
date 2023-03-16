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
import { cilWindowMaximize, cilUser, cilAddressBook, cilImagePlus, cilAlignLeft } from '@coreui/icons'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import axios from 'axios'

const AddProject = () => {
  const [name, setName] = useState()
  const [date, setDate] = useState(new Date())
  const [state, setState] = useState()
  const [description, setDescription] = useState()

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }
  const handleDate = (e) => {
    setDate(e.target.value)
  }
  const handleState = (e) => {
    setState(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: name,
      date: date,
      state: state,
      description: description,
    }
    axios
      .post('http://localhost:5000/dashboard/project/addproject/add', data)
      .then((result) => {
        console.log(result)
        window.location = '/dashboard/project/viewproject'
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
            <div className="bg-light d-flex flex-row align-items-center">
              <CContainer>
                <CRow className="justify-content-center">
                  <CCol md={9} lg={7} xl={6}>
                    <CCard className="mx-4">
                      <CCardBody className="p-4">
                        <CForm onSubmit={handleSubmit}>
                          <h1>Project</h1>
                          <p className="text-medium-emphasis">Add new Project</p>

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
                            <CFormInput type="date" onChange={handleDate} />
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
