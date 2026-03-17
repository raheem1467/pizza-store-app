import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import * as authSlice from '../redux/slices/authSlice';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  MemoryRouter: ({ children }) => <div>{children}</div>
}));

describe('Navbar Component', () => {
  const { useSelector } = require('react-redux');

  beforeEach(() => {
    useSelector.mockClear();
  });

  it('renders login button when user is not logged in', () => {
    useSelector.mockReturnValue({ token: null, role: null, name: null });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders customer links and logout button when user is logged in as customer', () => {
    useSelector.mockReturnValue({ token: 'fake-token', role: 'customer', name: 'John Doe' });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders admin links when user is logged in as admin', () => {
    useSelector.mockReturnValue({ token: 'fake-token', role: 'admin', name: 'Admin User' });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });
});
