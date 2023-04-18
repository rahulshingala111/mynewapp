/* eslint-disable */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import navigationAdmin from '../_navAdmin'

import * as jose from 'jose'
import Cookies from 'js-cookie'

const AppSidebar =  (data) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // console.log(data.data)
  // const [newData, setNewData] = useState()
  // if (data.data === 'employee') {
  //   console.log('yesssss')
  // } else {
  //   console.log('nooo')
  // }
  // try {
  //   const secret = new TextEncoder().encode('rahulSecret')
  //   const jwt = Cookies.get('token')
  //   const { payload } = await jose.jwtVerify(jwt, secret)
  //   console.log(payload.username)
  // } catch (error) {
  //   console.log(error)
  // }
  var dataa = data.data;
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {dataa === 'admin' ? (
            <AppSidebarNav items={navigationAdmin} />
          ) : (
            <AppSidebarNav items={navigation} />
          )}
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
