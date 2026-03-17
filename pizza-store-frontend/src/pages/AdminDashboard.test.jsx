import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

describe('AdminDashboard Page', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText('👨‍💼 Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Manage Menu')).toBeInTheDocument();
    expect(screen.getByText('Manage Orders')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    
    expect(screen.getByRole('link', { name: 'Open Menu' })).toHaveAttribute('href', '/admin/menu');
    expect(screen.getByRole('link', { name: 'View Orders' })).toHaveAttribute('href', '/admin/orders');
    expect(screen.getByRole('link', { name: 'View Revenue' })).toHaveAttribute('href', '/admin/revenue');
  });
});
