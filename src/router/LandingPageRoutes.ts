const LandingPageRoutes = {
  path: "/",
  component: () => import("@/views/DefaultLayout.vue"),
//   children: [
//     // หน้่าหนลัก
//     {
//       name: "HomePage",
//       path: "",
//       component: () => import("@/views/LandingPage/HomePage/HomePage.vue")
//     },
//     // --- เกี่ยวกับเรา
//       {
//         path: 'management/overview',
//         name: 'AboutOverview',
//         component: () => import("@/views/LandingPage/AboutUs/Overview.vue")
//       },
//        {
//         path: 'management/board',
//         name: 'AboutBoard',
//         component: () => import('@/views/LandingPage/AboutUs/Board.vue')
//       },
//       {
//         path: 'management/policy',
//         name: 'AboutMilestone',
//         component: () => import('@/views/LandingPage/AboutUs/Milestone.vue')
//       },
//         // --- ทรัพย์สินที่ลงทุน
//       {
//         path: 'assets/invested',
//         name: 'AssetsInvested',
//         component: () => import('@/views/LandingPage/AssetInvestment/InvestedAssets.vue')
//       },


//     // {
//     //   name: "CompensationPage",
//     //   path: "unitholdersInformation/compensation",
//     //   component: () =>
//     //     import(
//     //       "@/views/LandingPage/InvestorRelation/UnitholdersInformation/Compensation.vue"
//     //     ),
//     // },
//     // {
//     //   name: "StockQuotePage",
//     //   path: "StockInformation/StockQuote",
//     //   component: () =>
//     //     import(
//     //       "@/views/LandingPage/InvestorRelation/StockInformation/StockQuote.vue"
//     //     ),
//     // },
//   ],
children: [
      {
        path: '',
        name: 'LandingPage',
        component: () => import('@/views/LandingPage/HomePage/HomePage.vue')
      },
      // --- เกี่ยวกับเรา
      {
        path: 'aboutUs/overview',
        name: 'AboutOverview',
        component: () => import('@/views/LandingPage/AboutUs/Overview.vue')
      },
      {
        path: 'aboutUs/board',
        name: 'AboutBoard',
        component: () => import('@/views/LandingPage/AboutUs/Board.vue')
      },
      {
        path: 'aboutUs/policy',
        name: 'AboutMilestone',
        component: () => import('@/views/LandingPage/AboutUs/Milestone.vue')
      },

      // --- การบริหารจัดการ
      {
        path: 'management/manager',
        name: 'ManagementManager',
        component: () => import('@/views/LandingPage/ManageMent/ReitManage.vue')
      },
      {
        path: 'management/structure',
        name: 'ManagementStructure',
        component: () => import('@/views/LandingPage/ManageMent/OrganizationalStructure.vue')
      },
      {
        path: 'management/managementTeam',
        name: 'ManagementTeam',
        component: () => import('@/views/LandingPage/ManageMent/ManagementTeam.vue')
      },
           {
        path: 'management/board',
        name: 'BoardDirectors',
        component: () => import('@/views/LandingPage/ManageMent/BoardDirectors.vue')
      },
      {
        path: 'management/trust-tee',
        name: 'TrustTee',
        component: () => import('@/views/LandingPage/ManageMent/BoardDirectors.vue')
      },


      // --- ทรัพย์สินที่ลงทุน
      {
        path: 'assets/invested',
        name: 'AssetsInvested',
        component: () => import('@/views/LandingPage/AssetInvestment/InvestedAssets.vue')
      },

      // --- นักลงทุนสัมพันธ์ > ข้อมูลการเงิน
      {
        path: 'financial/financial-statement',
        name: 'FinancialStatement',
        component: () => import('@/views/LandingPage/InvestorRelation/FinancialInformation/FinancialStatement.vue')
      },
      {
        path: 'financial/nav',
        name: 'FinancialNAV',
        component: () => import('@/views/LandingPage/InvestorRelation/FinancialInformation/UnitNAV.vue')
      },

      // --- นักลงทุนสัมพันธ์ > ข้อมูลราคาหลักทรัพย์
      {
        path: 'stockInformation/stockQuote',
        name: 'StockQuote',
        component: () => import('@/views/LandingPage/InvestorRelation/StockInformation/StockQuote.vue')
      },
      {
        path: 'stockInformation/historicalPrice',
        name: 'StockHistory',
        component: () => import('@/views/LandingPage/InvestorRelation/StockInformation/HistoricalPrice.vue')
      },

      // --- นักลงทุนสัมพันธ์ >  ข้อมูลผู้ถือหน่วยทรัสต์
      {
        path: 'unitholdersInformation/UnitholdersStructure',
        name: 'UnitholdersStructure',
        component: () => import('@/views/LandingPage/InvestorRelation/UnitholdersInformation/UnitholdersStructrure.vue')
      },
        {
        path: 'unitholdersInformation/UnitholdersMeeting',
        name: 'UnitholdersMeeting',
        component: () => import('@/views/LandingPage/InvestorRelation/UnitholdersInformation/UnitholdersMeeting.vue')
      },
      {
        path: 'unitholdersInformation/compensation',
        name: 'HolderCompensation',
        component: () => import('@/views/LandingPage/InvestorRelation/UnitholdersInformation/Compensation.vue')
      },

      // --- นักลงทุนสัมพันธ์ > เอกสาร
      {
        path: 'documents/annual',
        name: 'DocumentAnnual',
        component: () => import('@/views/LandingPage/InvestorRelation/PublishedDocments/AnnualReports.vue')
      },
      {
        path: 'documents/appraisalReport',
        name: 'AppraisalReport',
        component: () => import('@/views/LandingPage/InvestorRelation/PublishedDocments/AppraisalReport.vue')
      },
      {
        path: 'documents/prospectus',
        name: 'DocumentProspectus',
        component: () => import('@/views/LandingPage/InvestorRelation/PublishedDocments/ProspectusSummary.vue')
      },
      {
        path: 'documents/investor',
        name: 'DocumentInvestor',
        component: () => import('@/views/LandingPage/InvestorRelation/PublishedDocments/DocForInvestors.vue')
      },

      // --- ห้องข่าว
      {
        path: 'news/setAnnouncements',
        name: 'SETAnnouncements',
        component: () => import('@/views/LandingPage/NewRoom/SETAnnouncements.vue')
      },
      {
        path: 'news/OtherNews',
        name: 'OtherNews',
        component: () => import('@/views/LandingPage/NewRoom/OtherNews.vue')
      },

      // --- ติดต่อเรา
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/LandingPage/ContactUs/ContactUs.vue')
      }
    ]
};

export default LandingPageRoutes;
