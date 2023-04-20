/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
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
  CFormCheck,
} from '@coreui/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import emailjs from 'emailjs-com'

const Work = () => {
  const [data, setData] = useState()
  const [project, setProject] = useState()
  const [date, setDate] = useState(new Date())
  const [description, setDescription] = useState()
  const [hour, setHour] = useState()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await axios
      .get('http://localhost:5000/dashboard/employee/work/addwork/viewdata')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleProject = (e) => {
    setProject(e.target.value)
    console.log(e.target.value)
  }
  const handleDate = (e) => {
    setDate(e.target.value)
    console.log(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
    console.log(e.target.value)
  }
  const handleHour = (e) => {
    setHour(e.target.value)
    console.log(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const decoded = jwt_decode(Cookies.get('token'))
    const post = {
      project: project,
      date: date,
      description: description,
      hour: hour,
      createdBy: decoded.username,
    }
    const data = {
      // to_mail: 'rahulshingala111@gmail.com', //comment out for use
      createdBy: decoded.username,
      hours: hour,
      project: project,
      date: date,
      description: description,
    }

    axios
      .post('http://localhost:5000/dashboard/employee/work/addwork/adddata', post)
      .then(async (result) => {
        await emailjs
          .send('service_justforfun', 'template_justforfun', data, '6UGSluLlxd2vg2Aie')
          .then(
            (result) => {
              console.log(result.text)
            },
            (error) => {
              console.log(error.text)
            },
          )
        console.log(result)
        window.location = '/dashboard/employee/work/workhistory '
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // const handleemail = (e) => {
  //   e.preventDefault()
  //   const data = {
  //     message: 'sfdsf',
  //     to_mail: 'rahulshingala111@gmail.com',
  //   }
  //   emailjs.send('service_justforfun', 'template_justforfun', data, '6UGSluLlxd2vg2Aie').then(
  //     (result) => {
  //       console.log(result.text)
  //     },
  //     (error) => {
  //       console.log(error.text)
  //     },
  //   )
  // }

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <div className="bg-light d-flex flex-row align-items-center">
              <CContainer>
                <CForm className="row g-3" onSubmit={handleSubmit}>
                  <CCol md={6}>
                    <CFormSelect onChange={handleProject} label="Project">
                      <option>Select Project</option>
                      {data?.map((cat, index) => (
                        <option key={index}>{cat.name}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                    <CFormInput type="date" label="Date" onChange={handleDate} />
                  </CCol>
                  <CCol xs={6}>
                    <CFormTextarea
                      row={3}
                      label="Description"
                      placeholder="Must be 5 to 20 world in lenght"
                      onChange={handleDescription}
                    />
                  </CCol>
                  <CCol md={1}>
                    <CFormInput label="Hours" onChange={handleHour} />
                  </CCol>
                  <CCol xs={12}>
                    <CButton type="submit">Add Work</CButton>
                  </CCol>
                </CForm>
              </CContainer>
            </div>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default Work
