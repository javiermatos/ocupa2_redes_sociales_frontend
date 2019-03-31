import qs from 'qs';
import React from 'react';
import {isAuthenticated} from '../auth';
import Main from '../components/Main';
import Redirection from '../components/Redirection';
import {reverse} from '../router';
import authRoutes from './auth';
import SidebarLayout from '../layouts/SidebarLayout';
import instagramRoutes from './instagram';
import twitterRoutes from './twitter';


const mainRoutes = [
    {
        path: '',
        name: 'main',
        action: () => {
            return {
                canActivate: isAuthenticated,
                component: (
                    <SidebarLayout>
                        <Main/>
                    </SidebarLayout>
                ),
            };
        },
    },
];

const notFoundRoute = {
    path: '(.*)',
    name: 'notFound',
    action: () => ({
        canActivate: isAuthenticated,
        component: (
            <SidebarLayout>
                <div>Not found!</div>
            </SidebarLayout>
        ),
    }),
};

const routes = {
    children: [
        ...mainRoutes,
        ...authRoutes,
        {path: '/instagram', children: instagramRoutes},
        {path: '/twitter', children: twitterRoutes},
        notFoundRoute,
    ],
    async action(context) {
        console.log('router context', context);
        console.log('middleware: start');
        const {canActivate, component} = await context.next();
        console.log('middleware: stop');
        if (canActivate === undefined || !canActivate(context)) {
            const loginPath = reverse('login');
            const logoutPath = reverse('logout');
            const mainPath = '/';  // reverse('main');
            let to = loginPath;
            if (![loginPath, logoutPath, mainPath].includes(context.pathname)) {
                to += qs.stringify({next: context.pathname}, {addQueryPrefix: true});
            }
            return (<Redirection to={to}/>);
        }
        return component;
    },
};

export default routes;
