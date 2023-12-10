import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import RootLayout from "./RootLayout";
import Register from "./Register";
import RegistrationForm from "./RegistrationForm";
import NewRegister from "./NewRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <NewRegister />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/registration",
        element: <RegistrationForm />,
      },
    ],
  },
]);

// NewRegister is better password checker
function App() {
  return <RouterProvider router={router} />;
}

export default App;
