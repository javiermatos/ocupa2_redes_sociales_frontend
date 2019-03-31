import qs from 'qs';
import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';
import routes from './routes';


// Create the router
const router = new UniversalRouter(routes);

export default router;

// https://github.com/kriasoft/universal-router/blob/master/docs/api.md#url-generation
export const reverse = generateUrls(
    router,
    {
        // encode: (value, token) => value,
        stringifyQueryParams: qs.stringify,
    },
);
