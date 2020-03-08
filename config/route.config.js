export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/txtEditor',
            name: 'editor.txt',
            icon: 'read',
            routes: [
              {
                name: 'wangEditor',
                path: '/txtEditor/wangEditor',
                icon: 'read',
                component: './wangEditor'
              },
              {
                name: 'react-quill',
                path: '/txtEditor/ReactQuill',
                icon: 'read',
                component: './ReactQuill/index'
              }
            ]
          },
          {
            path: '/codeEditor',
            name: 'editor.code',
            icon: 'read',
            component: './codeEditor'
          },
          {
            path: '/customChangeColors',
            name: '动态切换颜色',
            icon: 'read',
            component: './customChangeColors'
          },
          {
            path: '/uploadImg',
            name: '图片上传',
            icon: 'read',
            component: './Upload'
          },
          {
            path: '/drag',
            name: 'drag',
            icon: 'drag',
            routes: [{
              path: '/drag/vertical',
              name: 'vertical',
              icon: 'read',
              component: './drag'
            },{
              path: '/drag/horizon',
              name: 'horizon',
              icon: 'read',
              component: './drag/horizon'
            },{
              path: '/drag/mixDrag',
              name: 'mixDrag',
              icon: 'read',
              component: './drag/mixDrag'
            },{
              path: '/drag/tableDrag',
              name: 'tableDrag',
              icon: 'read',
              component: './drag/tableDrag'
            }]
          },
          {
            path: '/calendar',
            name: 'schedule',
            icon: 'schedule',
            component: './calendar'
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
          },
          {
            path: '/tool',
            name: 'tool',
            icon: "tool",
            routes: [
              { path: '/tool', redirect: '/tool/moment' },
              {
                path: '/tool/moment',
                name: 'moment',
                icon: 'date',
                component: './DataResolve/Moment.js'
              },
              {
                path: '/tool/ramda',
                name: 'ramda',
                icon: 'date',
                component: './DataResolve/Ramda.js'
              },
              {
                path: '/tool/echarts',
                name: 'echarts',
                icon: 'date',
                component: './DataResolve/Echarts.js'
              }
            ]
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]