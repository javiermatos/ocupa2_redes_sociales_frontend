import React from 'react';
import {isAuthenticated} from '../auth';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthTokenLoginContainer from '../components/auth/AuthTokenLoginContainer';
import AuthTokenLogoutContainer from '../components/auth/AuthTokenLogoutContainer';


export default [
    {
        path: '/login',
        name: 'login',
        action: () => ({
            canActivate: () => (true),
            component: (
                <DefaultLayout>
                    <AuthTokenLoginContainer/>
                </DefaultLayout>
            ),
        }),
    },
    {
        path: '/logout',
        name: 'logout',
        action: () => ({
            canActivate: isAuthenticated,
            component: (
                <DefaultLayout>
                    <AuthTokenLogoutContainer/>
                </DefaultLayout>
            ),
        }),
    },
];
