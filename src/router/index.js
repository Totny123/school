import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    permission: ["sys_admin", "admin", "student"],
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    permission: ["sys_admin", "admin", "student"],
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    permission: ["sys_admin", "admin", "student"],
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index"),
        meta: {
          title: "首页",
          icon: "el-icon-s-home",
        },
      },
    ],
  },
  {
    path: "/admin",
    component: Layout,
    permission: ["sys_admin"],
    children: [
      {
        path: "index",
        name: "Admin",
        component: () => import("@/views/admin/index"),
        meta: {
          title: "楼宇管理员管理",
          icon: "el-icon-user",
        },
      },
    ],
  },
  {
    path: "/student",
    component: Layout,
    permission: ["sys_admin", "admin"],
    children: [
      {
        path: "index",
        name: "Student",
        component: () => import("@/views/student/index"),
        meta: {
          title: "学生管理",
          icon: "el-icon-user-solid",
        },
      },
    ],
  },
  {
    path: "/building",
    component: Layout,
    permission: ["sys_admin"],
    children: [
      {
        path: "index",
        name: "Building",
        component: () => import("@/views/building/index"),
        meta: {
          title: "楼宇管理",
          icon: "el-icon-office-building",
        },
      },
    ],
  },
  {
    path: "/dormitory",
    component: Layout,
    permission: ["sys_admin", "admin"],
    children: [
      {
        path: "index",
        name: "Dormitory",
        component: () => import("@/views/dormitory/index"),
        meta: {
          title: "宿舍管理",
          icon: "el-icon-school",
        },
      },
    ],
  },
  // {
  //   path: "/checkIn",
  //   component: Layout,
  //   permission: ["sys_admin", "admin"],
  //   children: [
  //     {
  //       path: "index",
  //       name: "CheckIn",
  //       component: () => import("@/views/checkIn/index"),
  //       meta: {
  //         title: "学生入住登记",
  //         icon: "el-icon-s-marketing",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/moveOut",
  //   component: Layout,
  //   permission: ["sys_admin", "admin"],
  //   children: [
  //     {
  //       path: "index",
  //       name: "MoveOut",
  //       component: () => import("@/views/moveOut/index"),
  //       meta: {
  //         title: "学生迁出登记",
  //         icon: "el-icon-scissors",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/repair/list",
    component: Layout,
    permission: ["sys_admin", "admin"],
    children: [
      {
        path: "index",
        name: "RepairList",
        component: () => import("@/views/repair/list"),
        meta: {
          title: "维修信息查询",
          icon: "el-icon-edit-outline",
        },
      },
    ],
  },
  {
    path: "/repair",
    component: Layout,
    permission: ["student"],
    children: [
      {
        path: "index",
        name: "Repair",
        component: () => import("@/views/repair/index"),
        meta: {
          title: "上报维修信息",
          icon: "el-icon-edit-outline",
        },
      },
    ],
  },
  {
    path: "/editUser",
    component: Layout,
    permission: ["sys_admin", "admin", "student"],
    children: [
      {
        path: "index",
        name: "EditUser",
        component: () => import("@/views/editUser/index"),
        meta: {
          title: "修改密码",
          icon: "el-icon-edit-outline",
        },
      },
    ],
  },
  {
    path: "/logOut",
    component: Layout,
    permission: ["sys_admin", "admin", "student"],
    children: [
      {
        path: "index",
        name: "LogOut",
        component: () => import("@/views/logOut/index"),
        meta: {
          title: "退出系统",
          icon: "el-icon-refresh-right",
        },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  {
    path: "*",
    redirect: "/404",
    hidden: true,
    permission: ["sys_admin", "admin", "student"],
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
