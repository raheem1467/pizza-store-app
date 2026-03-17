import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from './Menu';
import * as menuSlice from '../redux/slices/menuSlice';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}));

jest.mock('../components/PizzaCard', () => {
  return function DummyPizzaCard({ pizza }) {
    return <div data-testid="pizza-card">{pizza.name} - {pizza.category}</div>;
  };
});

describe('Menu Page', () => {
  const { useSelector } = require('react-redux');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    useSelector.mockReturnValue({ items: [], status: 'loading' });

    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading menu...')).toBeInTheDocument();
  });

  it('renders pizzas when loaded and handles category filter', () => {
    const mockPizzas = [
      { _id: '1', name: 'Margherita', category: 'pizza' },
      { _id: '2', name: 'Garlic Bread', category: 'sides' }
    ];
    useSelector.mockReturnValue({ items: mockPizzas, status: 'succeeded' });

    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    expect(screen.getByText('Pizza Menu 🍕')).toBeInTheDocument();
    
    // Check initial render (All)
    expect(screen.getAllByTestId('pizza-card').length).toBe(2);
    expect(screen.getByText('Margherita - pizza')).toBeInTheDocument();
    expect(screen.getByText('Garlic Bread - sides')).toBeInTheDocument();

    // Click filter explicitly 
    const sidesBtn = screen.getByRole('button', { name: 'Sides' });
    fireEvent.click(sidesBtn);
    
    expect(screen.getAllByTestId('pizza-card').length).toBe(1);
    expect(screen.getByText('Garlic Bread - sides')).toBeInTheDocument();
    expect(screen.queryByText('Margherita - pizza')).not.toBeInTheDocument();
  });

  it('renders empty menu state', () => {
    useSelector.mockReturnValue({ items: [], status: 'succeeded' });

    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    expect(screen.getByText('No items available')).toBeInTheDocument();
  });
});
