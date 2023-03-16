/* eslint-disable */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilWindowMaximize, cilDrop, cilBook, cilPlus } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'a',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/a/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: 'Pages',
  },
  // {
  //   component: CNavGroup,
  //   name: 'Project',
  //   icon: <CIcon icon={cilWindowMaximize} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'View',
  //       to: '/dashboard/project/viewproject',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Add',
  //       to: '/dashboard/project/addproject',
  //     },
  //   ],
  // },
  {
    component: CNavItem,
    name: 'Add Work',
    to: '/dashboard/employee/work/addwork',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Work History',
    to: '/dashboard/employee/work/workhistory',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
]

export default _nav
