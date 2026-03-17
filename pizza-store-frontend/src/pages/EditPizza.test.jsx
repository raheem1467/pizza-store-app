import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditPizza from './EditPizza';
import API from '../api/axios';
import { toast } from 'react-toastify';

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: 'pizza123' }),
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  MemoryRouter: ({ children }) => <div>{children}</div>
}));

jest.mock('../api/axios', () => ({
  get: jest.fn(),
  put: jest.fn()
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn()
  }
}));

describe('EditPizza Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and renders pizza correctly', async () => {
    const mockDb = [
      { _id: 'pizza123', name: 'Test Pizza', description: 'Desc', price: 900, category: 'pizza', image: 'url' }
    ];
    API.get.mockResolvedValueOnce({ data: mockDb });

    render(
      <MemoryRouter>
        <EditPizza />
      </MemoryRouter>
    );

    expect(screen.getByText('Update Menu Item')).toBeInTheDocument();
    
    // Wait for state to update
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Pizza')).toBeInTheDocument();
      expect(screen.getByDisplayValue('900')).toBeInTheDocument();
    });
  });

  it('updates pizza on form submit', async () => {
    const mockDb = [
      { _id: 'pizza123', name: 'Test Pizza', description: 'Desc', price: 900, category: 'pizza', image: 'url' }
    ];
    API.get.mockResolvedValueOnce({ data: mockDb });
    API.put.mockResolvedValueOnce({ data: { message: 'success' } });

    render(
      <MemoryRouter>
        <EditPizza />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Pizza')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue('900'), { target: { value: '950', name: 'price' } });

    fireEvent.click(screen.getByRole('button', { name: 'Update Item' }));

    await waitFor(() => {
      expect(API.put).toHaveBeenCalledWith('/menu/pizza123', expect.objectContaining({ price: '950' }));
      expect(toast.success).toHaveBeenCalledWith('Pizza updated successfully');
    });
  });
});
