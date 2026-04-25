import { Router } from "react-router-dom"
import React from "react";
import { Outlet } from "react-router-dom";

export const FETCH_URL = "http://localhost:8000" 

function Layout() {
    return (
        <>
            <Outlet />
        </>
    )
}

export default Layout;