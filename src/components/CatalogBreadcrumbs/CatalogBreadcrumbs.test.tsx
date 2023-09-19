import React from 'react';
import { render } from '@testing-library/react';
import CatalogBreadcrumbs from './CatalogBreadcrumbs';
import { Category } from '@commercetools/platform-sdk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

export const category1: Category = {
  id: '1',
  version: 1,
  createdAt: '2023-09-06T10:52:10.101Z',
  lastModifiedAt: '2023-09-06T10:57:05.570Z',
  name: { 'en-US': 'Category1' },
  slug: {
    'en-US': 'category1',
  },
  orderHint: 'hint',
  ancestors: [{ typeId: 'category', id: '1' }],
};
export const category2: Category = {
  id: '2',
  version: 1,
  createdAt: '2023-09-06T10:52:10.101Z',
  lastModifiedAt: '2023-09-06T10:57:05.570Z',
  name: { 'en-US': 'Category2' },
  slug: {
    'en-US': 'category2',
  },
  orderHint: 'hint',
  ancestors: [{ typeId: 'category', id: '2' }],
};

export const categories = [category1, category2];

describe('CatalogBreadcrumbs', () => {
  it('renders "Catalog" link', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CatalogBreadcrumbs categories={categories} category={category2} />
        </BrowserRouter>
      </Provider>
    );
    const catalogLink = getByText('Catalog');
    expect(catalogLink).toBeInTheDocument();
  });

  /* it('renders category breadcrumbs correctly', () => {
    const { getByText, queryAllByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CatalogBreadcrumbs categories={categories} category={category1} />
        </BrowserRouter>
      </Provider>
    );

    const catalogLink = getByText('Catalog');
    expect(catalogLink).toBeInTheDocument();

    const categoryLinks = queryAllByText('Category1');
    expect(categoryLinks).toHaveLength(2);
    const category1Link = categoryLinks[0];
    expect(category1Link).toBeInTheDocument();
    expect(category1Link.getAttribute('href')).toBe('/catalog/category1');
  }); */
});
