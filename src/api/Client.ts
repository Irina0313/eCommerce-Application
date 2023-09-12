import { ctpClient, siteLocale } from './BuildClient';
import { Cart, CustomerChangePassword, CustomerUpdate, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { APIKeys } from './BuildClient';
import { IUserInfoFormInput } from '../helpers/Interfaces.ts/FormsInterfaces';
import { AppDispatch } from '../hooks/useAppDispatch';
import { categoriesFetching, categoriesFetchingError, categoriesFetchingSuccess } from '../store/categoriesSlice';
import { cartFetching, cartFetchingError, cartFetchingSuccess } from '../store/cartSlice';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: APIKeys.projectKey });

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = () => {
  return apiRoot.get().execute();
};

export const userLogin = (email: string, password: string) => {
  return apiRoot.login().post({ body: { email, password } }).execute();
};

export const userRegister = (data: IUserInfoFormInput) => {
  return apiRoot.customers().post({ body: data }).execute();
};

export const getCustomerInfo = (id: string) => {
  return apiRoot.customers().withId({ ID: id }).get().execute();
};

export const updateCustomerInfo = (id: string, data: CustomerUpdate) => {
  return apiRoot.customers().withId({ ID: id }).post({ body: data }).execute();
};

export const changeCustomerPassword = (id: string, data: CustomerChangePassword) => {
  return apiRoot.customers().password().post({ body: data }).execute();
};

export const getProducts = (category?: string, searchQuery = '', filterQuery = '', sort = `name.${siteLocale} asc`, limit = '100') => {
  const filter: string[] = [];
  if (filterQuery) filter.push(filterQuery);

  const queryArgs: Record<string, string | string[]> = { limit, sort, filter };
  if (searchQuery) queryArgs['text.' + siteLocale] = searchQuery;
  else if (category) filter.push(`categories.id: subtree("${category}")`);

  return apiRoot.productProjections().search().get({ queryArgs }).execute();
};

export function testApi() {
  console.log('start test API');
  // Retrieve Project information and output the result to the log
  //getProject().then(console.log).catch(console.error);

  // userRegister('1@1.com', 'Mypa$ssword11231e1')
  //   .then(({ body }) => {
  //     console.log('userRegister body: ', body);
  //   })
  //   .catch(console.error);

  // userLogin('1@1.com', 'Mypa$ssword11231e1')
  //   .then(({ body }) => {
  //     console.log('userlogin body: ', body);
  //   })
  //   .catch(console.error);

  // getCustomerInfo('0db3a463-b11c-45f0-8df7-754c41fa1301')
  //   .then(({ body }) => {
  //     console.log('getCustomerInfo body: ', body);
  //   })
  //   .catch(console.error);

  // // Query the Customer and output the Customer's email address
  // apiRoot
  //   .customers()
  //   .get()
  //   .execute()
  //   .then(({ body }) => {
  //     console.log('Query the Customers body: ', body);
  //   })
  //   .catch(console.error);

  // getCategories()
  //   .then(({ body }) => {
  //     console.log('getCategories body: ', body);
  //   })
  //   .catch(console.error);

  // getProducts()
  //   .then(({ body }) => {
  //     console.log('getProducts body: ', body);
  //   })
  //   .catch(console.error);
}

export const fetchCategories = (limit = 100) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(categoriesFetching());
      // console.log('Categories - start fetching');

      const response = await apiRoot.categories().get({ queryArgs: { limit } }).execute();
      // console.log('Categories - ', response.body.results);

      dispatch(categoriesFetchingSuccess(response.body.results));
    } catch (e) {
      // console.warn('Categories - Eror fetching');
      dispatch(categoriesFetchingError((e as Error).message));
    }
  };
};

export const fetchCart = (cartId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(cartFetching());
      console.log('cart - start fetching');

      const response = await apiRoot.carts().withId({ ID: cartId }).get().execute();
      console.log('cart - ', response.body);

      dispatch(cartFetchingSuccess(response.body));
    } catch (e) {
      console.warn('cart - Eror fetching');
      dispatch(cartFetchingError((e as Error).message));
    }
  };
};

export const createCart = () => {
  return apiRoot
    .carts()
    .post({ body: { currency: 'USD' } })
    .execute();
};

export const addProductToCart = async (cart: Cart | undefined, productId: string, quantity = 1) => {
  if (!cart) cart = (await createCart()).body;

  return apiRoot
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'addLineItem',
            productId,
            quantity,
          },
        ],
      },
    })
    .execute();
};
