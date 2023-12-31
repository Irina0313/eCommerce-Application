import { Cart, CartUpdate, CartUpdateAction, CustomerChangePassword, CustomerUpdate, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { IUserInfoFormInput } from '../helpers/Interfaces.ts/FormsInterfaces';
import { AppDispatch } from '../hooks/useAppDispatch';
import { cartFetching, cartFetchingError, cartFetchingSuccess } from '../store/cartSlice';
import { categoriesFetching, categoriesFetchingError, categoriesFetchingSuccess } from '../store/categoriesSlice';
import { APIKeys, ctpClient, siteLocale } from './BuildClient';

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

export const getProducts = (category?: string, searchQuery = '', filterQuery = '', sort = `name.${siteLocale} asc`, limit = '3', offset = '0') => {
  const filter: string[] = [];
  if (filterQuery) filter.push(filterQuery);

  const queryArgs: Record<string, string | string[]> = { limit, sort, filter, offset };
  if (searchQuery) queryArgs['text.' + siteLocale] = searchQuery;
  else if (category) filter.push(`categories.id: subtree("${category}")`);

  return apiRoot.productProjections().search().get({ queryArgs }).execute();
};

export const handlePromoCode = (id: string, data: CartUpdate) => {
  return apiRoot.carts().withId({ ID: id }).post({ body: data }).execute();
};
export const getPromoCode = (id: string) => {
  return apiRoot.discountCodes().withId({ ID: id }).get().execute();
};
export const getPromoCodes = () => {
  return apiRoot.discountCodes().get().execute();
};

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
      //console.log('cart - start fetching ', cartId);

      const response = await apiRoot.carts().withId({ ID: cartId }).get().execute();
      // console.log('cart - ', response.body);

      dispatch(cartFetchingSuccess(response.body));
    } catch (e) {
      //console.warn('cart - Eror fetching');
      dispatch(cartFetchingError((e as Error).message));
    }
  };
};

export const fetchCartForUser = (customerId: string, cart?: Cart) => {
  return async (dispatch: AppDispatch) => {
    // collect data from anonymous card if present
    let actions: CartUpdateAction[] = [];
    if (cart?.lineItems?.length) {
      actions = cart.lineItems.map((item) => {
        return {
          action: 'addLineItem',
          productId: item.productId,
          quantity: item.quantity,
        };
      });
    }

    try {
      dispatch(cartFetching());
      console.log('cart - start fetching cart for user ', customerId, cart, actions);

      let response = await apiRoot.carts().withCustomerId({ customerId: customerId }).get().execute();
      console.log('cart - ', response.body, response.body.lineItems.length);

      // merge with anonymous card
      if (cart && actions.length) {
        response = await apiRoot
          .carts()
          .withId({ ID: response.body.id })
          .post({ body: { version: response.body.version, actions } })
          .execute();
      }
      console.log('cart after merge - ', response.body, response.body.lineItems.length);

      dispatch(cartFetchingSuccess(response.body));
    } catch (e) {
      //console.warn('cart - Eror fetching ', (e as Error).name, e);
      if ((e as Error).name === 'NotFound') {
        // we don't have a cart for this customer yet, so try to create one
        try {
          //console.log('try to create new cart');
          let response = await apiRoot
            .carts()
            .post({ body: { currency: 'USD', customerId } })
            .execute();

          // merge with anonymous card
          if (cart && actions.length) {
            response = await apiRoot
              .carts()
              .withId({ ID: response.body.id })
              .post({ body: { version: response.body.version, actions } })
              .execute();
          }

          // console.log('new cart created and merged - ', response.body);
          dispatch(cartFetchingSuccess(response.body));
        } catch (e) {
          dispatch(cartFetchingError((e as Error).message));
        }
      } else dispatch(cartFetchingError((e as Error).message));
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
  if (!cart) {
    cart = (await createCart()).body;
    localStorage.setItem('IKKShop_cartId', cart.id);
  }

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
export const changeLineItemQuantity = async (cart: Cart | undefined, lineItemId: string, quantity = 0) => {
  if (!cart) throw Error('changeLineItemQuantity cart is undefined');

  return apiRoot
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute();
};

export const clearCart = async (cart: Cart) => {
  if (!cart?.lineItems?.length) throw Error('clearCard cart is undefined or empty');

  let actions: CartUpdateAction[] = [];
  if (cart.lineItems.length) {
    actions = cart.lineItems.map((item) => {
      return {
        action: 'changeLineItemQuantity',
        lineItemId: item.id,
        quantity: 0,
      };
    });
  }

  return apiRoot
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions,
      },
    })
    .execute();
};
