import { v4 } from "uuid";
import { Home, Login, Signup, Admin } from "../pages/index.js";
import ProductsContainer from "../components/Admin/Products/ProductsContainer.jsx";
import Users from "../components/Admin/Users/Users.jsx";
import Dashboard from "../components/Admin/Dashboard/Dashboard.jsx";
import Orders from "../components/Admin/Orders/Orders.jsx";
import Products from "../pages/Products.jsx";
import Profile from "../pages/Profile.jsx";
import Layout from "../Layout/Layout.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import PersonalInfo from "../components/Profile/PersonalInfo.jsx";
import MyOrders from "../components/Profile/MyOrders.jsx";
import ReviewsComplaints from "../components/Profile/ReviewsComplaints.jsx";
import Cart from "../pages/Cart.jsx";

export default [
  {
    id: v4(),
    path: "/",
    element: <Layout />,
    children:[
      {
        id: v4(),
        index: true, 
        element: <Home />,
      },
     
      {
        id: v4(),
        path: "/products",
        element: <Products />,
       
      },
      {
        id: v4(),
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        id: v4(),
        path: "/profile",
        element: <Profile />,
        children:[
          {
            id: v4(),
            index: true,
            element: <PersonalInfo />,
          },
          {
            id: v4(),
            path: "orders",
            element:<MyOrders />
          },
          {
            id: v4(),
            path:'reviews',
            element:<ReviewsComplaints />
          }
        ]
      },
      {
        id: v4(),
        path:'cart',
        element:<Cart />
      }
    ]
  },
  {
    id: v4(),
    path: "/login",
    element: <Login />,
  },
  {
    id: v4(),
    path: "/signup",
    element: <Signup />,
  },
  {
    id: v4(),
    path: "/admin",
    element: <Admin />,
    children: [
      {
        id: v4(),
        path: "dashboard",
        index: true, 
        element: <Dashboard />,
      },
      {
        id: v4(),
        path: "products",
        element: <ProductsContainer />,
      },
      {
        id: v4(),
        path: "users",
        element: <Users />,
      },
      {
        id: v4(),
        path: "orders",
        element: <Orders />,
      },
      // {
      //   id: v4(),
      //   index: true, 
      //   element: <Dashboard />,
      // },
    ],
  },
 
];
