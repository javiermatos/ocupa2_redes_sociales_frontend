import React from 'react';
import {isAuthenticated} from '../auth';
import SidebarLayout from '../layouts/SidebarLayout';
import SearchPostByHashtag from '../components/instagram/SearchPostsByHashtag';
import User from '../components/instagram/User';
import Post from '../components/instagram/Post';


export default [
    {
        path: '',
        name: 'instagramSearchPostByHashtag',
        action: () => ({
            canActivate: isAuthenticated,
            component: (
                <SidebarLayout>
                    <SearchPostByHashtag/>
                </SidebarLayout>
            ),
        }),
    },
    {
        path: '/user/:id',
        name: 'instagramUser',
        action: (context) => ({
            canActivate: isAuthenticated,
            component: (
                <SidebarLayout>
                    <User id={parseInt(context.params.id)}/>
                </SidebarLayout>
            ),
        }),
    },
    {
        path: '/post/:id',
        name: 'instagramPost',
        action: (context) => ({
            canActivate: isAuthenticated,
            component: (
                <SidebarLayout>
                    <Post id={parseInt(context.params.id)}/>
                </SidebarLayout>
            ),
        }),
    },
];
