import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import * as authService from '../services/authService';
import { toast } from 'react-toastify';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn()
}));

jest.mock('../services/authService', () => ({
  loginUser: jest.fn()
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  MemoryRouter: ({ children }) => <div>{children}</div>
}));

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('🍕 Login to Pizzeria')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('shows error toast on invalid credentials', async () => {
    authService.loginUser.mockRejectedValue(new Error('Invalid credentials'));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    
    // Default formik role is customer
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(authService.loginUser).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'password123',
        role: 'customer'
      });
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    });
  });

  it('navigates to menu on successful customer login', async () => {
    authService.loginUser.mockResolvedValue({
      data: {
        token: 'fake-token',
        user: { role: 'customer', name: 'John Doe' }
      }
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'customer@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Login Successful 🍕');
      expect(mockNavigate).toHaveBeenCalledWith('/menu');
    });
  });

  it('navigates to admin on successful admin login', async () => {
    authService.loginUser.mockResolvedValue({
      data: {
        token: 'admin-token',
        user: { role: 'admin', name: 'Admin Boss' }
      }
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'admin@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'admin123' } });
    
    // Change select to admin
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'admin' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Login Successful 🍕');
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
  });
});
