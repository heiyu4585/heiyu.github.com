
const index = { template: '<div>index</div>' }

// Vue.use(Router)
import article from '../components/article';
import articleAdd from '../components/articleAdd';
import articleEdit from '../components/articleEdit';

export default ([
        {
            path: '/',
            name: 'index',
            component: index,
        },
        {
            path: '/article',
            name: 'article',
            component: article,
            children: [
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                {
                    path: 'add',
                    name:"add",
                    component: articleAdd
                },
                {
                    path: 'edit',
                    name:'edit',
                    component: articleEdit
                },
            ]
        }
    ]
)
