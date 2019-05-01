# College Golf Stats

This project is a React application for handling personal and team golf statistics. Current version is deployed on: https://desktop-golf.herokuapp.com/

# Project Skeleton Top-level

This repository combines the client and server into a single repository that can be co-developed, tested and ultimately deployed to Heroku.

The client was created with [create-react-app](https://github.com/facebookincubator/create-react-app) (CRA) and the server is a separate Node.js application. The client-server integration is based on this [tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) and [repository](https://github.com/fullstackreact/food-lookup-demo). This repository will be referred to as the "top-level" to distinguish it from the client and server.

## Installing (and Adding) Dependencies

The skeleton is structured as three separate packages. A `postinstall` hook is included at the top level to automatically install the client and server dependencies, i.e. `npm install` also invokes:

```
npm install --prefix client
npm install --prefix server
```

The `--prefix` option treats the supplied path as the package root. In this case it is equivalent to `cd client` then `npm install` then `cd ..`.

*You will typically not need to install any dependencies in the top-level `package.json` file*. Most dependencies are needed by the client or the server and should be installed in the respective sub-packages, e.g. to install `react-boostrap` for your client application:

```
npm install --save react-boostrap --prefix client
```

## Running the Application

The combined application, client and server, can be run with `npm start` in the top-level directory. `npm start` launches the CRA development server on http://localhost:3000 and the backend server on http://localhost:3001. By setting the `proxy` field in the client `package.json`, the client development server will proxy any unrecognized requests to the server. By default this starts the server in hot-reloading mode (like with the client application).

## Testing

The client application can be independently tested as described in the [CRA documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests), i.e.:

```
npm test --prefix client
```

The server can be similarly independently tested:

```
npm test --prefix server
```

## Linting

Both the client and server can be independently linted via:

```
npm run lint --prefix client
```

and

```
npm run lint --prefix server
```

## Continuous Integration

The skeleton is setup for CI with Travis-CI. Travis will run build the client and test and lint both the client and the server.
