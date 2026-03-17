import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from './Cart';
import * as cartSlice from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('Cart Page', () => {
  const { useSelector } = require('react-redux');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty cart correctly', () => {
    useSelector.mockReturnValue({ cart: null, status: 'succeeded' });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText('Your cart is empty 🛒')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    useSelector.mockReturnValue({ cart: null, status: 'loading' });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading cart...')).toBeInTheDocument();
  });

  it('renders cart items and summary correctly', () => {
    const mockCart = {
      items: [
        { itemId: 'p1', name: 'Margherita', price: 300, quantity: 2 }
      ],
      totalAmount: 600
    };
    useSelector.mockReturnValue({ cart: mockCart, status: 'succeeded' });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText('Your Cart 🛒')).toBeInTheDocument();
    expect(screen.getByText('Margherita')).toBeInTheDocument();
    expect(screen.getByText('₹ 300 × 2')).toBeInTheDocument();
    
    // Order Summary
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Items : 1')).toBeInTheDocument();
    
    // Multiple 600 assertions might exist due to the item total + order total
    const sixtyHundreds = screen.getAllByText('₹ 600');
    expect(sixtyHundreds.length).toBeGreaterThan(0);
  });
});
