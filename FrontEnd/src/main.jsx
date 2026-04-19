import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter ,RouterProvider } from 'react-router-dom'
import Title_page  from './components/Title/title_page.jsx'
import SignIN_page from './components/Sing_in/Sign_in.jsx'
import SignUP_page from './components/sign-up/signup.jsx'
import Layout from './layout.jsx'
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//       {/* <Title_page/> */}
//       {/* <SignIN_page/> */}
//       <SignUP_page/>
//   </StrictMode>,
// )
function App() {
  return (
    <>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:
    [
      {
        index: true,
        element: <Title_page/>
      },
      {
        path: "/signin",
        element: <SignIN_page/>
      },
      {
        path: "/signup",
        element: <SignUP_page/>
      },

    ]
  }

]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
export default App