/* eslint-disable */
import React, { useState } from 'react'
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
  CFormTextarea
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from "../../../components/index";
import CIcon from "@coreui/icons-react";
import { cilEducation, cilUser, cilAddressBook, cilImagePlus } from "@coreui/icons";
import axios from 'axios';
import { useLocation } from "react-router-dom";

const Editempl = () => {

  let location = useLocation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [education, setEducation] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState();

  const handleUserName = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handleContact = (e) => {
    console.log(e.target.value);
    setContact(e.target.value);
  };
  const handleEducation = (e) => {
    console.log(e.target.value);
    setEducation(e.target.value);
  };
  const handleAddress = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImage = async (e) => {
    const filee = e.target.files[0];
    const base64 = await convertToBase64(filee);
    setFile(base64);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submited");

    axios
      .post("http://localhost:5000/dashboard/employee/addemployee/edituser", {
        contact: contact,
        email: email,
        username: username,
        education: education,
        address: address,
        file: file,
        id: location.state.id
      })
      .then(
        (response) => {
          console.log(response);
          window.location = "/dashboard/employee/viewemployee";
        },
        (error) => {
          console.log(error);
        }
      );
  };
  console.log(location.state.username);

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
                          <h1>Edit Employee</h1>
                          <p className="text-medium-emphasis">Edit Employee</p>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder={location.state.username}
                              autoComplete="username"
                              onChange={handleUserName}
                              value={username}
                              required
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>@</CInputGroupText>
                            <CFormInput
                              placeholder={location.state.email}
                              onChange={handleEmail}
                              autoComplete="email"
                              value={email}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder={location.state.contact}
                              autoComplete="contect"
                              onChange={handleContact}
                              value={contact}
                              required
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText> <CIcon icon={cilEducation} /></CInputGroupText>
                            <CFormInput
                              placeholder={location.state.education}
                              onChange={handleEducation}
                              autoComplete="education"
                              value={education}
                              required
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText><CIcon icon={cilAddressBook} /></CInputGroupText>
                            <CFormTextarea
                              placeholder={location.state.address}
                              onChange={handleAddress}
                              rows={3}
                              value={address}
                              required
                            ></CFormTextarea>
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilImagePlus} />
                            </CInputGroupText>
                            <CFormInput type="file" placeholder={location.state.image} onChange={handleImage} required />
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

export default Editempl