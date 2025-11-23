const LandingPageRoutes = {
  path: "/",
        component: () => import("@/views/LandingPage/portfolioLanding.vue"),

  // component: () => import("@/views/DefaultLayout.vue"),
  // children: [
  //   //================ หน้าหลัก ================
  //   {
  //     path: "home",
  //     name: "HomePage",
  //     component: () => import("@/views/LandingPage/portfolioLanding.vue"),
  //     meta: { hideBreadcrumb: true }, // ปิด Breadcrumb
  //   },

  // ],
};

export default LandingPageRoutes;
