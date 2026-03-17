import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminOrders from './AdminOrders';
import * as adminSlice from '../redux/slices/adminSlice';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('AdminOrders Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(jest.fn());
  });

  it('renders orders correctly with disabled buttons based on status', () => {
    const mockOrders = [
      { _id: 'ord1', totalAmount: 500, orderStatus: 'Pending', items: [{ name: 'Pizza', quantity: 1 }] },
      { _id: 'ord2', totalAmount: 300, orderStatus: 'Accepted', items: [{ name: 'Pizza', quantity: 1 }] },
      { _id: 'ord3', totalAmount: 400, orderStatus: 'Delivered', items: [{ name: 'Pizza', quantity: 1 }] }
    ];
    
    useSelector.mockReturnValue({ orders: mockOrders, status: 'succeeded' });

    render(
      <MemoryRouter>
        <AdminOrders />
      </MemoryRouter>
    );

    // Assert Headers and basics
    expect(screen.getByText('Order Management 📦')).toBeInTheDocument();
    expect(screen.getByText(/ord1/)).toBeInTheDocument();
    expect(screen.getByText(/ord2/)).toBeInTheDocument();
    expect(screen.getByText(/ord3/)).toBeInTheDocument();

    // In the new UI, buttons are conditionally rendered.
    // ord1 is Pending -> Accept/Reject buttons exist
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();

    // ord2 is Accepted -> Start Prep button exists
    expect(screen.getByRole('button', { name: 'Start Prep' })).toBeInTheDocument();

    // ord3 is Delivered -> No status buttons exist
    expect(screen.queryByRole('button', { name: 'Deliver' })).not.toBeInTheDocument();
  });

  it('calls toast.success when order status is successfully updated', async () => {
    const mockOrders = [
      { _id: 'ord1', totalAmount: 500, orderStatus: 'Pending', items: [{ name: 'Pizza', quantity: 1 }] }
    ];
    useSelector.mockReturnValue({ orders: mockOrders, status: 'succeeded' });
    
    // Create a mock action that "matches" fulfilled
    const mockAction = { type: 'admin/updateOrderStatus/fulfilled' };
    adminSlice.updateOrderStatus.fulfilled.match = jest.fn().mockReturnValue(true);
    
    const mockDispatch = jest.fn().mockResolvedValue(mockAction);
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <AdminOrders />
      </MemoryRouter>
    );

    const acceptBtn = screen.getByRole('button', { name: 'Accept' });
    fireEvent.click(acceptBtn);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Order marked as Accepted');
    });
  });

  it('calls toast.error when order status update fails', async () => {
    const mockOrders = [
      { _id: 'ord1', totalAmount: 500, orderStatus: 'Pending', items: [{ name: 'Pizza', quantity: 1 }] }
    ];
    useSelector.mockReturnValue({ orders: mockOrders, status: 'succeeded' });
    
    const mockAction = { type: 'admin/updateOrderStatus/rejected', payload: 'Server Error' };
    adminSlice.updateOrderStatus.fulfilled.match = jest.fn().mockReturnValue(false);
    
    const mockDispatch = jest.fn().mockResolvedValue(mockAction);
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <AdminOrders />
      </MemoryRouter>
    );

    const acceptBtn = screen.getByRole('button', { name: 'Accept' });
    fireEvent.click(acceptBtn);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Server Error');
    });
  });
});
