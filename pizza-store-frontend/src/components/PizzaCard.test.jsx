import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PizzaCard from './PizzaCard';
import * as cartService from '../services/cartService';
import { toast } from 'react-toastify';

// Mock the services and toast
jest.mock('../services/cartService', () => ({
  addToCart: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('PizzaCard Component', () => {
  const mockPizza = {
    _id: 'pizza-123',
    name: 'Margherita',
    description: 'Classic cheese pizza',
    price: 300,
    image: 'margherita.jpg',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders pizza details correctly', () => {
    render(<PizzaCard pizza={mockPizza} />);

    expect(screen.getByText('Margherita')).toBeInTheDocument();
    expect(screen.getByText('Classic cheese pizza')).toBeInTheDocument();
    expect(screen.getByText('₹ 300')).toBeInTheDocument();
    const image = screen.getByAltText('Margherita');
    expect(image).toHaveAttribute('src', 'margherita.jpg');
  });

  it('adds item to cart successfully on button click', async () => {
    cartService.addToCart.mockResolvedValueOnce({ data: { message: 'success' } });

    render(<PizzaCard pizza={mockPizza} />);

    const addButton = screen.getByText('Add To Cart');
    fireEvent.click(addButton);

    expect(cartService.addToCart).toHaveBeenCalledWith({
      itemId: 'pizza-123',
      quantity: 1,
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Pizza added to cart 🍕');
    });
  });

  it('shows error toast when add to cart fails', async () => {
    cartService.addToCart.mockRejectedValueOnce(new Error('Failed'));

    render(<PizzaCard pizza={mockPizza} />);

    const addButton = screen.getByText('Add To Cart');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to add item');
    });
  });
});
