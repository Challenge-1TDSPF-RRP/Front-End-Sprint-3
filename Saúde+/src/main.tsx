import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Error from './routes/Error/index.tsx';
import Home from './routes/Home/index.tsx';
import Login from "./routes/Login/index.tsx";
import Register from "./routes/Register/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/home", element: <Home/> },
      { path: "/register", element: <Register/> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
