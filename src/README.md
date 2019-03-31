
# Starter WebApp Frontend

Just a(nother) starter webapp frontend project based on [React](https://reactjs.org/) + [Redux](https://redux.js.org/).

This project encourages the adoption of good practices (from my point of view). It is based/inspired in some nice
articles I found when trying to solve the issue of having a consistent React app to combine with API REST backends:

- [An Introduction to the Redux-First Routing Model](https://medium.freecodecamp.org/an-introduction-to-the-redux-first-routing-model-98926ebf53cb)
- [Usage (Redux-First Routing) with Redux](https://github.com/kriasoft/universal-router/issues/99)
- [Usage (Redux-First Routing) with Universal Router](https://github.com/mksarge/redux-first-routing/blob/master/docs/recipes/usage-with-universal-router.md)
- [Full stack Django: Quick start with JWT auth and React/Redux (Part I)](https://medium.com/netscape/full-stack-django-quick-start-with-jwt-auth-and-react-redux-part-i-37853685ab57)
- [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
- [You Probably Don’t Need Redux](https://medium.com/@blairanderson/you-probably-dont-need-redux-1b404204a07f)
- [Why I won’t be using Fetch API in my apps](https://medium.com/@shahata/why-i-wont-be-using-fetch-api-in-my-apps-6900e6c6fe78)
- [Maintaining API authentication using Axios](https://medium.com/@mateioprea/maintaining-api-authentication-using-axios-e70ba174da6)
- [Do I have to put all my state into Redux? Should I ever use React's setState()?](https://redux.js.org/faq/organizing-state#do-i-have-to-put-all-my-state-into-redux-should-i-ever-use-reacts-setstate)
- [You Aren’t Using Redux Middleware Enough](https://medium.com/@jacobp100/you-arent-using-redux-middleware-enough-94ffe991e6)
- [Where and When to Fetch Data With Redux](https://daveceddia.com/where-fetch-data-redux/)


## The Path...

After learning React for a while, I have discovered that it is a great library: it just do one thing and it do it well
(UI in web browsers). The problem is that for developing a web application, you have to solve routing, user
authentication, api communication... That means that React must be combined with some other libraries to address those
problems and create kind of a framework (as Angular). It is all about choices!

Giving the experience that I got using React, I created a wish list of desired features for the perfect framework:

- Important global state must be managed with Redux: browser history, user, credentials, privileges...
- Local state should be managed by component
- State must be global (in Redux) or local (in a component), but we must not allow *external sources of truth*
- Always use containers to fetch data: do not use router for that, what if router is changed? 
- Authentication must be pluggable (check authentication and authorization based on privileges)
- No tricks in base code: it must be plain simple, efficient, scalable and even boring (as we focus on business logic)
- It must handle API REST responses properly: status code 4xx and 5xx are fine and must be handled properly (that is a
good reason to choose [fetch](https://github.com/whatwg/fetch) for implementing the API REST client)
