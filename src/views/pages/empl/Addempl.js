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
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios';

const Addempl = () => {

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
        const decoded = jwt_decode(Cookies.get('token'))
        axios
            .post("http://localhost:5000/dashboard/employee/addemployee/registeruser", {
                contact: contact,
                email: email,
                username: username,
                education: education,
                address: address,
                file: file,
                createdBy: decoded.username,
            })
            .then(
                (response) => {
                    console.log(response);
                    window.location = "/dashboard/employee";
                },
                (error) => {
                    console.log(error);
                }
            );
    };

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
                                                            <CIcon icon={cilUser} />
                                                        </CInputGroupText>
                                                        <CFormInput
                                                            placeholder="Username"
                                                            autoComplete="username"
                                                            onChange={handleUserName}
                                                            value={username}
                                                            required
                                                        />
                                                    </CInputGroup>
                                                    <CInputGroup className="mb-3">
                                                        <CInputGroupText>@</CInputGroupText>
                                                        <CFormInput
                                                            onChange={handleEmail}
                                                            placeholder="Email"
                                                            autoComplete="email"
                                                            value={email}
                                                        />
                                                    </CInputGroup>
                                                    <CInputGroup className="mb-3">
                                                        <CInputGroupText>
                                                            <CIcon icon={cilUser} />
                                                        </CInputGroupText>
                                                        <CFormInput
                                                            placeholder="Contact No."
                                                            autoComplete="contect"
                                                            onChange={handleContact}
                                                            value={contact}
                                                            required
                                                        />
                                                    </CInputGroup>
                                                    <CInputGroup className="mb-3">
                                                        <CInputGroupText> <CIcon icon={cilEducation} /></CInputGroupText>
                                                        <CFormInput
                                                            onChange={handleEducation}
                                                            placeholder="Education detail"
                                                            autoComplete="education"
                                                            value={education}
                                                            required
                                                        />
                                                    </CInputGroup>
                                                    <CInputGroup className="mb-3">
                                                        <CInputGroupText><CIcon icon={cilAddressBook} /></CInputGroupText>
                                                        <CFormTextarea
                                                            onChange={handleAddress}
                                                            rows={3}
                                                            placeholder="Address"
                                                            value={address}
                                                            required
                                                        ></CFormTextarea>
                                                    </CInputGroup>
                                                    <CInputGroup className="mb-3">
                                                        <CInputGroupText>
                                                            <CIcon icon={cilImagePlus} />
                                                        </CInputGroupText>
                                                        <CFormInput type="file" onChange={handleImage} required />
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

export default Addempl