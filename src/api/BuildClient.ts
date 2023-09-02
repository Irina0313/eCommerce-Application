//import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
  // PasswordAuthMiddlewareOptions,
  // AnonymousAuthMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

// export enum APIKeys {
//   projectKey = 'digitaldreamteam',
//   clientId = 'LVGRElUkuiKZNWoY7K0Nqo8q',
//   secret = 'j1I8rjF5ojYkpgA6FRJIPOpMAXiAqyYx',
//   scope = 'manage_project:digitaldreamteam',
//   ApiURL = 'https://api.europe-west1.gcp.commercetools.com',
//   AuthURL = 'https://auth.europe-west1.gcp.commercetools.com',
// }
// export const siteLocale = 'en-US';

export enum APIKeys {
  projectKey = 'digitaldreamteam2',
  clientId = 'Y65iPAygK3xjjI0T2Upc9fG8',
  secret = 'GHxUN4hnpb4dPTG0L_ODva6eYXK2rReI',
  scope = 'manage_project:digitaldreamteam2',
  ApiURL = 'https://api.europe-west1.gcp.commercetools.com',
  AuthURL = 'https://auth.europe-west1.gcp.commercetools.com',
}
export const siteLocale = 'en';

const scopes = [APIKeys.scope];

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: APIKeys.ApiURL,
  fetch,
};

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: APIKeys.AuthURL,
  projectKey: APIKeys.projectKey,
  credentials: {
    clientId: APIKeys.clientId,
    clientSecret: APIKeys.secret,
  },
  scopes,
  fetch,
};

// const authPasswordFlowOptions: PasswordAuthMiddlewareOptions = {
//   host: APIKeys.AuthURL,
//   projectKey: APIKeys.projectKey,
//   credentials: {
//     clientId: APIKeys.clientId,
//     clientSecret: APIKeys.secret,
//     user: {
//       username: 'username',  !!!!!
//       password: 'password',
//     },
//   },
//   scopes,
//   fetch,
// }

// const options: AnonymousAuthMiddlewareOptions = {
//   host: APIKeys.AuthURL,
//   projectKey: APIKeys.projectKey,
//   credentials: {
//     clientId: APIKeys.clientId,
//     clientSecret: APIKeys.secret,
//   },
//   scopes,
//   fetch,
// };

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  //  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  //  .withPasswordFlow(authPasswordFlowOptions)
  //  .withAnonymousSessionFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  //  .withLoggerMiddleware() // Include middleware for logging
  .build();
