import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Revenue from './Revenue';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}));

describe('Revenue Page', () => {
  const { useSelector } = require('react-redux');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    useSelector.mockReturnValue({ revenue: null, status: 'loading' });

    render(
      <MemoryRouter>
        <Revenue />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders revenue dashboard correctly', () => {
    const mockRevenue = {
      monthlyRevenue: 50000,
      totalRevenue: 500000,
      totalOrders: 1000
    };
    useSelector.mockReturnValue({ revenue: mockRevenue, status: 'succeeded' });

    render(
      <MemoryRouter>
        <Revenue />
      </MemoryRouter>
    );

    expect(screen.getByText('Revenue Dashboard 💰')).toBeInTheDocument();
    
    expect(screen.getByText('Current Month Revenue')).toBeInTheDocument();
    expect(screen.getByText('₹ 50000')).toBeInTheDocument();
    
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('₹ 500000')).toBeInTheDocument();
    
    expect(screen.getByText('Total Delivered Orders')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
  });
});
