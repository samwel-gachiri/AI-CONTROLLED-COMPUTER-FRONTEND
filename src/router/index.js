import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: 'Let AI Control Your Computer'
        }
    },
    {
        path: '/features',
        name: 'Features',
        component: () => import('@/views/Features.vue'),
        meta: {
            title: 'Features'
        }
    },
    {
        path: '/pricing',
        name: 'Pricing',
        component: () => import('@/views/Pricing.vue'),
        meta: {
            title: 'Pricing'
        }
    },
    {
        path: '/enterprise',
        name: 'Enterprise',
        component: () => import('@/views/Enterprise.vue'),
        meta: {
            title: 'Enterprise Solutions'
        }
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/views/Blog.vue'),
        meta: {
            title: 'Blog'
        }
    },
    {
        path: '/blog/:slug',
        name: 'BlogPost',
        component: () => import('@/views/BlogPost.vue'),
        meta: {
            title: 'Blog Post'
        }
    },
    // {
    //     path: '/auth',
    //     name: 'Auth',
    //     component: () => import('@/views/Auth.vue'),
    //     meta: {
    //         title: 'Sign In'
    //     }
    // },
    {
        path: '/auth/signup',
        name: 'SignUp',
        component: () => import('@/views/auth/SignUp.vue'),
        meta: {
            title: 'Sign Up'
        }
    },
    {
        path: '/auth/organization/signup',
        name: 'OrganizationSignUp',
        component: () => import('@/views/auth/OrganizationSignUp.vue'),
        meta: {
            title: 'Register Organization'
        }
    },
    {
        path: '/auth/signin',
        name: 'SignIn',
        component: () => import('@/views/auth/SignIn.vue'),
        meta: {
            title: 'Sign In'
        }
    },
    {
        path: '/auth/success',
        name: 'AuthSuccess',
        component: () => import('@/views/auth/AuthSuccess.vue'),
        meta: {
            title: 'Authentication Successful'
        }
    },
    {
        path: '/auth/organization/signup',
        name: 'OrganizationSignUp',
        component: () => import('@/views/auth/OrganizationSignUp.vue'),
        meta: {
            title: 'Register Organization'
        }
    },
    {
        path: '/auth/signin',
        name: 'SignIn',
        component: () => import('@/views/auth/SignIn.vue'),
        meta: {
            title: 'Sign In'
        }
    },
    {
        path: '/auth/success',
        name: 'AuthSuccess',
        component: () => import('@/views/auth/AuthSuccess.vue'),
        meta: {
            title: 'Authentication Successful'
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        redirect: (to) => {
            // This will be handled by navigation guard to redirect based on role
            return '/dashboard/employee'
        }
    },
    {
        path: '/dashboard/admin',
        name: 'AdminDashboard',
        component: () => import('@/views/dashboard/AdminDashboard.vue'),
        meta: {
            title: 'Admin Dashboard',
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/dashboard/employee',
        name: 'EmployeeDashboard',
        component: () => import('@/views/dashboard/EmployeeDashboard.vue'),
        meta: {
            title: 'Employee Dashboard',
            requiresAuth: true
        }
    },
    {
        path: '/dashboard/admin',
        name: 'AdminDashboard',
        component: () => import('@/views/dashboard/AdminDashboard.vue'),
        meta: {
            title: 'Admin Dashboard',
            requiresAuth: true,
            requiresRole: 'admin'
        }
    },
    {
        path: '/dashboard/employee',
        name: 'EmployeeDashboard',
        component: () => import('@/views/dashboard/EmployeeDashboard.vue'),
        meta: {
            title: 'Employee Dashboard',
            requiresAuth: true,
            requiresRole: 'employee'
        }
    },
    // {
    //     path: '/privacy',
    //     name: 'Privacy',
    //     component: () => import('@/views/Privacy.vue'),
    //     meta: {
    //         title: 'Privacy Policy'
    //     }
    // },
    // {
    //     path: '/terms',
    //     name: 'Terms',
    //     component: () => import('@/views/Terms.vue'),
    //     meta: {
    //         title: 'Terms of Service'
    //     }
    // },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: () => import('@/views/NotFound.vue'),
    //     meta: {
    //         title: 'Page Not Found'
    //     }
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        } else {
            return { top: 0, behavior: 'smooth' }
        }
    }
})

// Navigation guards
router.beforeEach((to, from, next) => {
    // Set page title
    if (to.meta.title) {
        document.title = to.meta.title === 'Let AI Control Your Computer'
            ? 'Computer AI Automation - Let AI Control Your Computer'
            : `${to.meta.title} - Computer AI Automation`
    }

    // Check authentication
    if (to.meta.requiresAuth) {
        const userData = localStorage.getItem('user_data')
        const authToken = localStorage.getItem('auth_token')

        if (!userData || !authToken) {
            // Redirect to sign in with return URL
            next({
                path: '/auth/signin',
                query: { redirect: to.fullPath }
            })
            return
        }

        try {
            const user = JSON.parse(userData)

            // Check admin requirement
            if (to.meta.requiresAdmin && user.role !== 'admin') {
                next('/dashboard/employee')
                return
            }

            // Redirect dashboard based on role
            if (to.path === '/dashboard') {
                if (user.role === 'admin') {
                    next('/dashboard/admin')
                } else {
                    next('/dashboard/employee')
                }
                return
            }

            next()
        } catch (error) {
            // Invalid user data, redirect to sign in
            localStorage.removeItem('user_data')
            localStorage.removeItem('auth_token')
            next('/auth/signin')
            return
        }
    } else {
        next()
    }
})

export default router