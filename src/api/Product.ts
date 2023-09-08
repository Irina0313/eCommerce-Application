import { ctpClient } from './BuildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { APIKeys } from './BuildClient';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: APIKeys.projectKey });

export const returnProductByKey = (productKey: string) => {
  return apiRoot.products().withKey({ key: productKey }).get().execute();
};
