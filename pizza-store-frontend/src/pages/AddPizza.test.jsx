import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddPizza from './AddPizza';
import API from '../api/axios';
import { toast } from 'react-toastify';

jest.mock('../api/axios', () => ({
  post: jest.fn()
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn()
  }
}));

describe('AddPizza Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form directly correctly', () => {
    render(
      <MemoryRouter>
        <AddPizza />
      </MemoryRouter>
    );

    expect(screen.getByText('Add Menu Item 🍕')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Price')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument();
  });

  it('submits form and calls API correctly', async () => {
    API.post.mockResolvedValueOnce({ data: { message: 'success' } });

    render(
      <MemoryRouter>
        <AddPizza />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'New Pizza' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '500' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Add Item' }));

    await waitFor(() => {
      expect(API.post).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith('Pizza added to menu 🍕');
    });
  });
});
