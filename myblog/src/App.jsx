import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const Layout =()=>{
  return(
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>, 
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/single",
        element: <Single/>
      },
      {
        path: "/write",
        element: <Write/>
      }

    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/post/:id",
    element: <Single/>,
  },
  {
    path: "/write",
    element: <Write/>,
  },
  
  
]);

function App(){
  return(
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
    
  )
}



export default App;