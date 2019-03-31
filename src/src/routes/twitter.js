import React from 'react';
import {isAuthenticated} from '../auth';
import SidebarLayout from '../layouts/SidebarLayout';
import SearchPostByHashtag from '../components/twitter/SearchPostsByHashtag';
import User from '../components/twitter/User';
import Post from '../components/twitter/Post';


export default [
    {
        path: '',
        name: 'twitterSearchPostByHashtag',
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
        path: '/user',
        name: 'twitterUser',
        action: (context) => ({
            canActivate: isAuthenticated,
            component: (
                <SidebarLayout>
                    <User/>
                </SidebarLayout>
            ),
        }),
    },
    {
        path: '/post/:id',
        name: 'twitterPost',
        action: (context) => ({
            canActivate: isAuthenticated,
            component: (
                <SidebarLayout>
                    <Post
                        id={parseInt(context.params.id)}
                        userId={parseInt(context.params.userId)}
                        userName={context.params.userName}
                        userScreenName={context.params.userScreenName}
                    />
                </SidebarLayout>
            ),
        }),
    },
];
