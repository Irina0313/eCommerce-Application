import React from 'react';
import { render } from '@testing-library/react';
import { PersonalInfoForm } from './PersonalInfoForm';
import { customerInfo } from './UserAddressesForm.test';

describe('PersonalInfoForm', () => {
  it('renders without crashing', () => {
    const { container } = render(<PersonalInfoForm customerInfo={customerInfo} />);
    expect(container).toBeTruthy();
  });
  it('title input there is in the document', () => {
    const { container } = render(<PersonalInfoForm customerInfo={customerInfo} />);
    const titleInput = container.querySelector('#title');
    expect(titleInput).toBeTruthy();
  });
  it('first name input there is in the document', () => {
    const { container } = render(<PersonalInfoForm customerInfo={customerInfo} />);
    const firstNameInput = container.querySelector('#firstName');
    expect(firstNameInput).toBeTruthy();
  });
  it('last name input there is in the document', () => {
    const { container } = render(<PersonalInfoForm customerInfo={customerInfo} />);
    const lastNameInput = container.querySelector('#lastName');
    expect(lastNameInput).toBeTruthy();
  });
  it('email input there is in the document', () => {
    const { container } = render(<PersonalInfoForm customerInfo={customerInfo} />);
    const emailInput = container.querySelector('#email');
    expect(emailInput).toBeTruthy();
  });
  it('dateOfBirth input there is in the document', () => {
    const { container } = render(<PersonalInfoForm customerInfo={customerInfo} />);
    const dateOfBirthInput = container.querySelector('#dateOfBirth');
    expect(dateOfBirthInput).toBeTruthy();
  });
});
