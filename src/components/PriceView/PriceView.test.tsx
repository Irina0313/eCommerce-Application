import React from 'react';
import { render } from '@testing-library/react';
import PriceView from './PriceView';
import { PriceDraft } from '@commercetools/platform-sdk';

const prices: PriceDraft[] = [
  {
    key: 'PT974SKT',
    value: {
      type: 'centPrecision',
      currencyCode: 'USD',
      centAmount: 10000,
      fractionDigits: 2,
    },

    discounted: {
      value: {
        currencyCode: 'USD',
        centAmount: 9000,
      },
      discount: {
        id: 'ddd',
        typeId: 'product-discount',
      },
    },
  },
];

describe('PriceView', () => {
  it('renders null when prices are undefined', () => {
    const { container } = render(<PriceView />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null when prices array is empty', () => {
    const { container } = render(<PriceView prices={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders price without discount', () => {
    const { getByText } = render(<PriceView prices={prices} />);
    const priceText = getByText('$100');
    expect(priceText).toBeInTheDocument();
  });

  it('renders price with discount', () => {
    const { getByText } = render(<PriceView prices={prices} />);
    const discountPriceText = getByText('$90');
    const originalPriceText = getByText('$100');

    expect(discountPriceText).toBeInTheDocument();
    expect(originalPriceText).toBeInTheDocument();
  });

  it('renders discounted price in green', () => {
    const { getByText } = render(<PriceView prices={prices} />);
    const discountPriceText = getByText('$90');

    expect(discountPriceText).toHaveStyle('color: green');
  });

  it('renders original price with line-through in gray', () => {
    const { getByText } = render(<PriceView prices={prices} />);
    const originalPriceText = getByText('$100');

    expect(originalPriceText).toHaveStyle('text-decoration: line-through');
    expect(originalPriceText).toHaveStyle('color: gray');
  });
});
