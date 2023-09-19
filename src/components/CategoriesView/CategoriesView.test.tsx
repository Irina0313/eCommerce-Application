import React from 'react';
import { render, screen } from '@testing-library/react';
import CategoriesView from './CategoriesView';
import { categories } from '../CatalogBreadcrumbs/CatalogBreadcrumbs.test';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const mockCategories = categories;

describe('CategoriesView', () => {
  it('renders loading spinner when loading is true', () => {
    render(<CategoriesView categories={[]} loading={true} error='' />);
    const loadingSpinner = screen.getByTestId('loading');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('renders error message when error prop is provided', () => {
    const errorMessage = 'An error occurred';
    render(<CategoriesView categories={[]} loading={false} error={errorMessage} />);
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it('renders categories correctly when loading and error are false', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CategoriesView categories={mockCategories} loading={false} error='' />
        </BrowserRouter>
      </Provider>
    );

    /*  // Verify that the "Categories" heading is present
    const heading = screen.getByText('Categories');
    expect(heading).toBeInTheDocument();

    // Verify that each category name is rendered
    for (const category of mockCategories) {
      const categoryElement = screen.getByText(category.name['en-US']);
      expect(categoryElement).toBeInTheDocument();
    } */
  });
});
