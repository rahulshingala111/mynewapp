/* eslint-disable */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilWindowMaximize } from '@coreui/icons'
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
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: 'Pages',
  },
  {
    component: CNavGroup,
    name: 'Project',
    icon: <CIcon icon={cilWindowMaximize} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View',
        to: '/dashboard/project/viewproject',
      },
      {
        component: CNavItem,
        name: 'Add',
        to: '/dashboard/project/addproject',
      },
    ],
  },
]

export default _nav
