import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";

const Login = React.lazy(() => import("../pages/login"));
const Home = React.lazy(() => import("../pages/home"));
const Category = React.lazy(() => import("../pages/category"));
const Welcome = React.lazy(() => import("../pages/welcome"));
const Goods = React.lazy(() => import("../pages/goods"));
const Heroedit = React.lazy(() => import("../pages/heroEdit"));
const Herolist = React.lazy(() => import("../pages/heroList"));
const Articleedit = React.lazy(() => import("../pages/articleEdit"));
const Articlelist = React.lazy(() => import("../pages/articleList"));
const Adlist = React.lazy(() => import("../pages/adList"));
const Userlist = React.lazy(() => import("../pages/userList"));

const lazyLoad = (children: React.ReactNode) => {
    return <Suspense fallback={<>loding</>}>{children}</Suspense>
}

const defaultRouter = [
    {
        path: "/",
        element: <Navigate to={'/login'} />
    }
]

export interface IRouter {
    title?: string
    path: string
    key: string
    children?: IRouter[]
}

const pageRouter = [
    {
        path: "/login",
        element: lazyLoad(<Login />)
    },
    {
        path: "/home",
        key: "home",
        title: "首页",
        element: lazyLoad(<Home />),
        children: [
            {
                path: "welcome",
                key: "/welcome",
                title: "欢迎页",
                element: lazyLoad(<Welcome />)
            },
            
            {
                path: "categories/list",
                key: "/categories/list",
                title: "分类管理页",
                element: lazyLoad(<Category />)
            },
            {
                path: "goods/list",
                key: "/goods/list",
                title: "物品管理页",
                element: lazyLoad(<Goods />)
            },
            {
                path: "hero/heroedit",
                key: "/hero/heroedit",
                title: "新建英雄页",
                element: lazyLoad(<Heroedit />)
            },
            {
                path: "hero/herolist",
                key: "/hero/herolist",
                title: "英雄列表页",
                element: lazyLoad(<Herolist />)
            },
            {
                path: "article/articleedit",
                key: "/article/articleedit",
                title: "新建文章页",
                element: lazyLoad(<Articleedit />)
            },
            {
                path: "article/articlelist",
                key: "/article/articlelist",
                title: "文章列表页",
                element: lazyLoad(<Articlelist />)
            },
            {
                path: "ad/adlist",
                key: "/ad/adlist",
                title: "广告位管理页",
                element: lazyLoad(<Adlist />)
            },
            {
                path: "user/userlist",
                key: "/user/userlist",
                title: "用户列表页",
                element: lazyLoad(<Userlist />)
            }
        ]
    }
]

const router = [...defaultRouter, ...pageRouter];

export { router, pageRouter };