// import Vue from 'vue'
import Router from 'vue-router'
// // import SitePfm from '../components/SitePfm'
// console.log("=========");
// // import HelloWorld from '@/components/HelloWorld'
// console.log(111111);
const pagePfm = {
  template: '<div>这个是pagePfm内容</div>'
}
// const User = {
//   template: `
//     <div class="user">
//       <h2>User {{ $route.params.id }}</h2>
//       <router-view></router-view>
//     </div>
//   `
// }

const index = { template: '<div>index</div>' }

// Vue.use(Router)
import layout from 'components/layout'
import sitePfm from '../components/SitePfm'
export default ([
    {
      path: '/',
      name: 'index',
      component: layout,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        { path: '/', component: index },

        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'pagePfm', component: pagePfm },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'sitePfm', component: sitePfm }
      ]
    }
  ]
)
