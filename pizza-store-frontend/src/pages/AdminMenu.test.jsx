import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import * as adminSlice from '../redux/slices/adminSlice';
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

describe('AdminMenu Page', () => {
  const { useSelector } = require('react-redux');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    useSelector.mockReturnValue({ menu: [], status: 'loading' });

    render(
      <MemoryRouter>
        <AdminMenu />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading menu...')).toBeInTheDocument();
  });

  it('renders menu items and buttons correctly', () => {
    const mockMenu = [
      { _id: '123', name: 'Pizza A', image: 'url', price: 200, category: 'pizza' },
      { _id: '456', name: 'Pizza B', image: 'url', price: 300, category: 'pizza' }
    ];
    useSelector.mockReturnValue({ menu: mockMenu, status: 'succeeded' });

    render(
      <MemoryRouter>
        <AdminMenu />
      </MemoryRouter>
    );

    expect(screen.getByText('Manage Menu 🍕')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
    
    expect(screen.getByText('Pizza A')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    
    expect(screen.getByText('Pizza B')).toBeInTheDocument();
    
    expect(screen.getAllByText('Update').length).toBe(2);
    expect(screen.getAllByText('Delete').length).toBe(2);
  });
});
