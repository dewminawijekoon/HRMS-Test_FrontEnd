import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import SupervisorLayout from 'layouts/SupervisorLayout';
import EmployeeLayout from 'layouts/EmployeeLayout';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    path: '/',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    path: '/reset-password',
    element: lazy(() => import('./views/auth/signin/fogetpassword'))
  },
  {
    path: '/Admin/*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '',
        element: lazy(() => import('./views/dashboard/Admin'))
      },{
        exact: 'true',
        path: '/leave-request-form',
        element: lazy(() => import('./views/LeaveRequestForm'))
      },
      {
        exact: 'true',
        path: '/employees',
        element: lazy(() => import('./views/Employees'))
      },{
        exact: 'true',
        path: '/employees/add-employee',
        element: lazy(() => import('./views/Profile/add_employee'))
      },
      {
        exact: 'true',
        path: '/employees/profile',
        element: lazy(() => import('./views/Profile/index'))
      },
      {
        exact: 'true',
        path: '/leave-applications',
        element: lazy(() => import('./views/LeaveApplications/index'))
      },
      {
        exact: 'true',
        path: '/leave-applications/leave-request-form',
        element: lazy(() => import('./views/LeaveRequestForm/index'))
      },
      {
        exact: 'true',
        path: '/reports',
        element: lazy(() => import('./views/Reports'))
      },
      {
        exact: 'true',
        path: '/employees/profile',
        element: lazy(() => import('./views/Profile/index'))
      },
    ]
  }, 
  {
    path: '/Employee/*',
    layout: EmployeeLayout,
    routes: [
      {
        path: '',
        element: lazy(() => import('./views/dashboard/Employee'))
      },
      {
        path: 'leave-request-form',
        element: lazy(() => import('./views/LeaveForm'))
      },
      {
        path: 'log-out',
        element: lazy(() => import('./views/auth/signin/SignIn1'))
      }
    ]
  },

  //Supervisor Dashboard
  {
    path: '/supervisor/*',
    layout: SupervisorLayout,
    routes: [
      {
        exact: 'true',
        path: '',
        element: lazy(() => import('./views/dashboard/Supervisor'))
      },
      {
        exact: 'true',
        path: '/employees',
        element: lazy(() => import('./views/Employees'))
      },
      {
        exact: 'true',
        path: '/leave-form',
        element: lazy(() => import('./views/LeaveForm'))
      },
      {
        exact: true,
        path: '/leave-applications',
        element: lazy(() => import('./views/LeaveApplications'))
      },
      {
        // This directly points to the leave request form under /leave-applications
        exact: true,
        path: '/leave-applications/leave-request-form',
        element: lazy(() => import('./views/LeaveRequestForm'))
      },
      {
        exact: 'true',
        path: '/reports',
        element: lazy(() => import('./views/Reports'))
      },
      {
        exact: 'true',
        path: '/profile',
        element: lazy(() => import('./views/Profile'))
      }
    ]
  }
];

export default routes;
