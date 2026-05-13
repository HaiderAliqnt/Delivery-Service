import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter ,RouterProvider } from 'react-router-dom'
import './index.css'
import Title_page  from './components/Title/title_page.jsx'
import SignIN_page from './components/SignIn/Sign_in.jsx'
import SignUP_page from './components/SignUp/signup.jsx'
import Layout from './layout.jsx'

// Import New Pages
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import DelivererHomePage from './pages/DelivererHomePage/DelivererHomePage.jsx'
// import NPCListPage from './pages/NPCListPage/NPCListPage.jsx'
// import NPCDetailPage from './pages/NPCDetailPage/NPCDetailPage.jsx'
import MyOrderPage from './pages/MyOrderPage/MyOrderPage.jsx'
import MyDeliveryPage from './pages/MyDeliveryPage/MyDeliveryPage.jsx'
import ShopSelectPage from './pages/ShopSelectPage/ShopSelectPage.jsx'
import NewOrderPage from './pages/NewOrderPage/NewOrderPage.jsx'
import OrderStatusPage from './pages/OrderStatusPage/OrderStatusPage.jsx'
import DelivererFeedPage from './pages/DelivererFeedPage/DelivererFeedPage.jsx'
import DelivererOrderPage from './pages/DelivererOrderPage/DelivererOrderPage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'
import OrderConfirmationPage from './pages/OrderConfirmation/OrderConfirmation.jsx'
import OrderConfirmedPage from './pages/OrderConfirmed/OrderConfirmed.jsx'
import OrderPickedUpPage from './pages/OrderPickedUp/OrderPickedUp.jsx'
import OrderDeliveredPage from './pages/OrderDelivered/OrderDelivered.jsx'
import SearchingPage from './pages/SearchingPage/SearchingPage.jsx'
import AssignedPage from './pages/AssignedPage/Assigned.jsx'
import DeliveredCustomerPage from './pages/DeliveredCustomerPage/DeliveredCustomerPage.jsx'
import PickedCustomerPage from './pages/PickedCustomerPage/PickedCustomerPage.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Title_page/>
      },
      {
        path: "/login",
        element: <SignIN_page/>
      },
      {
        path: "/signup",
        element: <SignUP_page/>
      },
      // Protected Routes
      {
        path: "/home",
        element: <ProtectedRoute><HomePage/></ProtectedRoute>
      },
      { //deliverer home page
        path: "/home/deliverer",
        element: <ProtectedRoute><DelivererHomePage/></ProtectedRoute>
      },
      {
        path:"/myOpenOrders",
        element: <ProtectedRoute><MyOrderPage/></ProtectedRoute>
      },
      {
        path:"/myOpenDeliveries",
        element: <ProtectedRoute><MyDeliveryPage/></ProtectedRoute>
      },
      {
        // path: "/browse/npcs", //never used in the project
        // element: <ProtectedRoute><NPCListPage/></ProtectedRoute>
      },
      {
        // path: "/browse/npcs/:id", //never used in the project
        // element: <ProtectedRoute><NPCDetailPage/></ProtectedRoute>
      },
      {
        path: "/order/new/shop", //have to integrate this route 
        element: <ProtectedRoute><ShopSelectPage/></ProtectedRoute>
      },
      {
        path: "/order/new", //customer pov
        element: <ProtectedRoute><NewOrderPage/></ProtectedRoute>
      },
      {
        path:"/order/searching", //customer searching for deliverers
        element:<ProtectedRoute><SearchingPage></SearchingPage></ProtectedRoute>
      },
      {
        path: "/order/assigned", //assigned page customer sees
        element:<ProtectedRoute><AssignedPage></AssignedPage></ProtectedRoute>
      },
      {
        path:"/order/customer/picked", //customer sees this when order gets picked
        element:<ProtectedRoute><PickedCustomerPage/></ProtectedRoute>
      },
      {
        path:"/order/customer/delivered",
        element:<ProtectedRoute><DeliveredCustomerPage/></ProtectedRoute>
      },
      {
        path: "/order/:id",
        element: <ProtectedRoute><OrderStatusPage/></ProtectedRoute>
      },
      {
        // path: "/deliver/feed",
        path:"/browse/orders",
        element: <ProtectedRoute><DelivererFeedPage/></ProtectedRoute>
      },
      {
        path: "/deliver/:id", //not used in the project
        element: <ProtectedRoute><DelivererOrderPage/></ProtectedRoute>
      },
      {
        path:"/order-confirmation/:id",
        element:<ProtectedRoute><OrderConfirmationPage/></ProtectedRoute>
      },
      {
        path:"/orderConfirmed",
        element:<ProtectedRoute><OrderConfirmedPage/></ProtectedRoute>
      },
      {
        path:"/order/deliverer/picked",
        element:<ProtectedRoute><OrderPickedUpPage/></ProtectedRoute>
      },
      {
        path:"/order/delivered",
        element:<ProtectedRoute><OrderDeliveredPage></OrderDeliveredPage></ProtectedRoute>
      },
      {
        path: "/profile",
        element: <ProtectedRoute><ProfilePage/></ProtectedRoute>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
