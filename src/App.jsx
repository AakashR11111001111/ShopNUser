import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import { useState, createContext } from 'react'
import Home from './Components/Home/Home'
import Layout from './Layout'
import Products from './Components/Products/Products'
import Users from './Components/Users/Users'
import ContactUs from './Components/ContactUs/ContactJs'
export const userContext = createContext()

function App() {
  
  const [userData, setUserData] = useState({
    DisplayName: "",
    PhotoURL: "",
    uid: "",
  })
  const router = createBrowserRouter([{
    path: "/",
    element: <Login />
  },{
    element: <Layout />,
    children: [{
      path: "/home",
      element: <Home />
    },
    {
      path: "/products",
      element: <Products />
    },
    {
      path: "/users",
      element: <Users />
    },
    {
      path:"/contactus",
      element: <ContactUs />
    }
  ]
  }])
  return (
    <userContext.Provider value={{userData, setUserData}}>
      <RouterProvider router={router}>
        <h1>Hello world</h1>
      </RouterProvider>
    </userContext.Provider>
  )
}

export default App
