import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Contact from "./screens/Contact";
import LandingPage from "./screens/LandingPage";
import OurVision from "./screens/OurVision";
import About from "./screens/About";
import FindHelp from "./screens/FindHelp";
import FindJob from "./screens/FindJob";
import CareNurturers from "./screens/CareNurturers";
import MyProfile from "./screens/MyProfile";
import HelpList from "./components/HelpList";
import Login from "./screens/Login";
import { Provider } from "react-redux";
import store from "../store/store";
import RegisterPage from "./components/RegisterPage";
import RegisterForm from "./components/RegisterForm";
import AdminPage from "./screens/AdminPage";
import UserDetails from "./screens/UserDetails";
import ScrollToTop from "./components/ScrollToTop";

// Root layout that wraps all routes — ensures scroll-to-top on every navigation
function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      { path: "/about-us", element: <About /> },
      { path: "/find-help", element: <FindHelp /> },
      { path: "/find-job", element: <FindJob /> },
      { path: "/care-nurturers", element: <CareNurturers /> },
      { path: "/my-profile", element: <MyProfile /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/register/register-form", element: <RegisterForm /> },
      { path: "/caretakers", element: <HelpList /> },
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/user-details", element: <UserDetails /> },
      // { path: "/admin/contact-details", element: <ContactDetails /> },
      // { path: "/admin/booking-details", element: <BookingDetails /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
