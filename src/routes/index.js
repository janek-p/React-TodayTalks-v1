import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader.js';

/**** Layouts ****/
const FullLayout = lazy(() => import('../layouts/'));

/**** Pages ****/
const AdminDashboard = lazy(() => import("../views/AdminDashboard.js"));
const Home = lazy(() => import("../views/Home.js"));
const Category = lazy(() => import("../views/Category.js"));
const Spotlight = lazy(() => import("../views/Spotlight.js"));
const BlogLayout3 = lazy(() => import("../views/BlogLayout3.js"));
const BlogsDetails = lazy(() => import("../views/BlogsDetailsPage.js"));
const Contact = lazy(() => import("../views/Contact.js"));
const About = lazy(() => import("../views/AboutUs.js"));
const Login = lazy(() => import("../views/Login.js"));
const Register = lazy(() => import("../views/Register.js"));
const Profile = lazy(() => import("../views/Profile.js"));
const NotFoundError = lazy(() => import("../views/error/NotFoundError.js"));
const ServerError = lazy(() => import("../views/error/ServerError.js"));
const NoPost = lazy(() => import("../views/error/No_post.js"));
// const NotFound = lazy(() => import("../views/NotFound.js")); // 404 Error page
// const ServerError = lazy(() => import("../views/ServerError.js")); // 500 Error page

/**** Routes ****/
const ThemeRoutes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <FullLayout />
      </Suspense>
    ),
    children: [
      { path: "/", exact: true, element: <Home /> },
      { path: "/news/:name", exact: true, element: <Category /> },
      { path: "/spotlight/:name", exact: true, element: <Spotlight /> },
      { path: "/bloglayout3", exact: true, element: <BlogLayout3 /> },
      { path: "/:title", exact: true, element: <BlogsDetails /> },
      { path: "/contact", exact: true, element: <Contact /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "*", element: <Navigate to="/404" /> }, // Navigate to 404 page for unmatched routes
    ],
  },
  {
    path: '/dashboard',
    element: <Suspense fallback={<Loader />}>{<AdminDashboard />}</Suspense>
  },
  {
    path: '/login',
    element: <Suspense fallback={<Loader />}>{<Login />}</Suspense>
  },
  {
    path: '/register',
    element: <Suspense fallback={<Loader />}>{<Register />}</Suspense>
  },
  {
    path: '/profile',
    element: <Suspense fallback={<Loader />}>{<Profile />}</Suspense>
  },
  {
    path: '/404',
    element: <Suspense fallback={<Loader />}>{<NotFoundError />}</Suspense>,
  },
  {
    path: '/500',
    element: <Suspense fallback={<Loader />}>{<ServerError />}</Suspense>,
  },
];

export default ThemeRoutes;
