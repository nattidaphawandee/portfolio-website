const AuthRoutes = {
  path: '/auth',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  // @/layouts/blank/BlankLayout.vue
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'LandingPage',
      path: '/homepage',
      component: () => import('@/views/homePage/homePage.vue')
    },
     {
      name: 'CompensationPage',
      path: '/unitholdersInformation/compensation',
      component: () => import('@/views/LandingPage/InvestorRelation/UnitholdersInformation/Compensation.vue')
    },
    {
      name: ' StockQuotePage  ',
      path: '/StockInformation/StockQuote',
      component: () => import('@/views/LandingPage/InvestorRelation/StockInformation/StockQuote.vue')
    },
    // {
    //   name: 'FullLayout',
    //   path: '/FullLayout',
    //   component: () => import('@/layouts/full/FullLayout.vue')
    // },
    {
      name: 'LoginPage',
      path: '/login',
      component: () => import('@/views/loginPage/loginPage.vue')
    },
    {
      path: '/login/:provider',
      component: () => import('@/views/loginPage/loginPage.vue')
    }
  ]
};

export default AuthRoutes;
