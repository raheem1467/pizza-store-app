import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Orders from './Orders';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}));

jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock('../redux/slices/orderSlice', () => ({
  fetchUserOrders: jest.fn(),
  cancelUserOrder: Object.assign(jest.fn(), {
    fulfilled: { match: jest.fn() }
  }),
  updatePreviousOrders: jest.fn()
}));

describe('Orders Page', () => {
  const { useSelector } = require('react-redux');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Loading state', () => {
    useSelector.mockReturnValue({ orders: [], previousOrders: [], status: 'loading' });
    render(
      <MemoryRouter>
        <Orders />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders orders correctly with New Features', () => {
    const mockOrders = [
      { 
        _id: 'abc1234567', 
        orderStatus: 'Pending', 
        totalAmount: 500, 
        deliveryMode: 'Delivery',
        createdAt: '2026-03-15T10:00:00Z',
        items: [{ name: 'Pizza', price: 500, quantity: 1 }]
      }
    ];
    useSelector.mockReturnValue({ orders: mockOrders, previousOrders: [], status: 'succeeded' });

    render(
      <MemoryRouter>
        <Orders />
      </MemoryRouter>
    );

    expect(screen.getByText('My Orders 📦')).toBeInTheDocument();
    expect(screen.getByText(/Order #.*234567/)).toBeInTheDocument();
    expect(screen.getByText('View Bill')).toBeInTheDocument();
    expect(screen.getByText(/📅/)).toBeInTheDocument();
  });

  it('opens bill modal and displays items correctly', () => {
    const mockOrder = { 
      _id: 'abc1234567', 
      orderStatus: 'Pending', 
      totalAmount: 500, 
      deliveryMode: 'Delivery',
      createdAt: '2026-03-15T10:00:00Z',
      items: [{ name: 'Margherita Pizza', price: 500, quantity: 1 }]
    };
    useSelector.mockReturnValue({ orders: [mockOrder], previousOrders: [], status: 'succeeded' });

    render(
      <MemoryRouter>
        <Orders />
      </MemoryRouter>
    );

    const viewBillBtn = screen.getByText('View Bill');
    fireEvent.click(viewBillBtn);

    expect(screen.getByText('Order Bill')).toBeInTheDocument();
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getAllByText(/₹ 500/)).toHaveLength(4); // Card total, Price, Row total, Modal total
  });
});
