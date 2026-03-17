import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';
import * as authService from '../services/authService';
import { toast } from 'react-toastify';

jest.mock('../services/authService', () => ({
  registerUser: jest.fn()
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

describe('Register Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders register form correctly', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByText('🍕 Create Account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Delivery Address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('shows error toast on registration failure', async () => {
    authService.registerUser.mockRejectedValue(new Error('Registration failed'));

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('6-Digit OTP'), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText('Delivery Address'), { target: { value: '123 Pizza Street, Crust City' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(authService.registerUser).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'test@test.com',
        password: 'password123',
        phone: '1234567890',
        otp: '123456',
        address: '123 Pizza Street, Crust City',
        role: 'customer'
      });
      expect(toast.error).toHaveBeenCalledWith('Registration failed');
    });
  });

  it('navigates to login on successful registration', async () => {
    authService.registerUser.mockResolvedValue({});

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('6-Digit OTP'), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText('Delivery Address'), { target: { value: '123 Pizza Street, Crust City' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Registration successful 🎉');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
