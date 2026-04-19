import { Router } from "react-router-dom"
import React from "react";
import { Outlet } from "react-router-dom";


function Layout() {
    return (
        <>
            <Outlet />
        </>
    )
}

export default Layout;