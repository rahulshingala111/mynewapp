/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
    CButton,
    CCol,
    CContainer,
    CRow,
    CHeader,
    CHeaderBrand,
    CHeaderToggler,
    CHeaderNav, CNavItem, CNavLink, CForm, CFormInput, CCollapse
} from "@coreui/react";


const Home = () => {
    return (
        <>
            <CHeader>
                <CContainer fluid>
                    <CHeaderBrand href="/">Header</CHeaderBrand>
                    <CHeaderNav>
                        <CNavItem>
                            <CNavLink href="/login">
                                Login
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink href="/register">Register</CNavLink>
                        </CNavItem>
                    </CHeaderNav>
                </CContainer>
            </CHeader>
        </>
    );
};

export default Home;
