import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";

const Login = React.lazy(() => import("../pages/login"));
const Home = React.lazy(() => import("../pages/home"));
const BaseCategory = React.lazy(() => import("../components/baseCategory"))
const BaseGoods = React.lazy(() => import("../components/baseGoods"))
const Categorylist = React.lazy(() => import("../pages/categoryList"));
const Welcome = React.lazy(() => import("../pages/welcome"));
const Goods = React.lazy(() => import("../pages/goods"));
const BaseHeros = React.lazy(() => import("../components/baseHeros"))
const Herolist = React.lazy(() => import("../pages/heroList"));
const Articleedit = React.lazy(() => import("../pages/articleEdit"));
const Articlelist = React.lazy(() => import("../pages/articleList"));
const AdEdit = React.lazy(() => import("../pages/adEdit"));
const Adlist = React.lazy(() => import("../pages/adList"));
const Userlist = React.lazy(() => import("../pages/userList"));
const UserEdit = React.lazy(() => import("../pages/userEdit")) 

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
                path: "categories/add",
                key: "/categories/add",
                title: "新建分类",
                element: lazyLoad(<BaseCategory />)
            },
            {
                path: "categories/add/:id",
                key: "/categories/edit",
                title: "编辑分类",
                element: lazyLoad(<BaseCategory />)
            },
            {
                path: "categories/list",
                key: "/categories/list",
                title: "分类列表页",
                element: lazyLoad(<Categorylist />)
            },
            {
                path: "goods/add",
                key: "/goods/add",
                title: "新建物品",
                element: lazyLoad(<BaseGoods />)
            },
            {
                path: "goods/add/:id",
                key: "/goods/edit",
                title: "编辑物品",
                element: lazyLoad(<BaseGoods />)
            },
            {
                path: "goods/list",
                key: "/goods/list",
                title: "物品列表页",
                element: lazyLoad(<Goods />)
            },
            {
                path: "heros/add",
                key: "/heros/add",
                title: "新建英雄",
                element: lazyLoad(<BaseHeros />)
            },
            {
                path: "heros/add/:id",
                key: "/heros/edit",
                title: "编辑英雄",
                element: lazyLoad(<BaseHeros />)
            },
            {
                path: "heros/list",
                key: "/heros/list",
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
                path: "article/articleedit/:id",
                key: "/article/articleedit/:id",
                title: "编辑文章页",
                element: lazyLoad(<Articleedit />)
            },
            {
                path: "article/articlelist",
                key: "/article/articlelist",
                title: "文章列表页",
                element: lazyLoad(<Articlelist />)
            },
            {
                path: "ad/adEdit",
                key: "/ad/adEdit",
                title: "新建广告位页",
                element: lazyLoad(<AdEdit />)
            },
            {
                path: "ad/adEdit/:id",
                key: "/ad/adEdit/:id",
                title: "广告位编辑页",
                element: lazyLoad(<AdEdit />)
            },
            {
                path: "ad/adlist",
                key: "/ad/adlist",
                title: "广告位列表页",
                element: lazyLoad(<Adlist />)
            },
            {
                path: "user/useredit",
                key: "/user/useredit",
                title: "新建用户页",
                element: lazyLoad(<UserEdit />)
            },
            {
                path: "user/useredit/:id",
                key: "/user/useredit/:id",
                title: "编辑用户页",
                element: lazyLoad(<UserEdit />)
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