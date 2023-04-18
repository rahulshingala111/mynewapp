/* eslint-disable */
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Home = React.lazy(() => import('./views/pages/home/Home'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const AddEmployee = React.lazy(() => import('./views/pages/empl/Addempl'))
const EditEmployee = React.lazy(() => import('./views/pages/empl/Editempl'))
const ViewEmployee = React.lazy(() => import('./views/pages/empl/Viewempl'))

const ViewProject = React.lazy(() => import('./views/pages/project/ViewProject'))
const AddProject = React.lazy(() => import('./views/pages/project/AddProject'))

const Work = React.lazy(() => import('./views/pages/work/Work'))
const WorkHistory = React.lazy(() => import('./views/pages/work/WrokHistory'))
const EmployeeWorkHistory = React.lazy(() => import('./views/pages/work/EmployeeWorkHistory'))

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" name="Home" element={<Home />} />

            <Route path="/dashboard" name="Home" element={<Dashboard />} />

            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />

            <Route exact path="/dashboard/employee/addemployee" name="Add Employee" element={<AddEmployee />} />
            <Route exact path="/dashboard/employee/editemployee" name="Edit Employee" element={<EditEmployee />} />
            <Route exact path="/dashboard/employee/viewemployee" name="View Employee" element={<ViewEmployee />} />

            <Route exact path="/dashboard/project/viewproject" name="View Project" element={<ViewProject />} />
            <Route exact path="/dashboard/project/addproject" name="Add Project" element={<AddProject />} />
            
            <Route exact path="/dashboard/employee/work/addwork" name="Add Work" element={<Work />} />
            <Route exact path="/dashboard/employee/work/workhistory" name="Work history" element={<WorkHistory />} />
            <Route exact path="/dashboard/employee/work/employeeworkhistory" name="Work history" element={<EmployeeWorkHistory />} />

            <Route path="/*" name="Page 404" element={<Page404 />} />
            <Route path="/500" name="Page 500" element={<Page500 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
