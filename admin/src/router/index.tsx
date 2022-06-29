import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";

const Login = React.lazy(() => import("../pages/login"));
const Home = React.lazy(() => import("../pages/home"));

const lazyLoad = (children: React.ReactNode) => {
    return <Suspense fallback={<>loding</>}>{children}</Suspense>
}

const defaultRouter = [
    {
        path: "/",
        element: <Navigate to={'/login'} />
    }
]

const pageRouter = [
    {
        path: "/login",
        element: lazyLoad(<Login />)
    },
    {
        path: "/home",
        element: lazyLoad(<Home />)
    }
]

const router = [...defaultRouter, ...pageRouter];

export { router };