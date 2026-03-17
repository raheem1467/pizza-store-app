import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Page', () => {
  it('renders correctly with Title and Features', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Hero Section
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
    expect(screen.getByText('Pizzeria')).toBeInTheDocument();
    expect(screen.getByText('Order Now')).toBeInTheDocument();

    // Features
    expect(screen.getByText('Why Choose Pizzeria?')).toBeInTheDocument();
    expect(screen.getByText('🍕 Fresh Ingredients')).toBeInTheDocument();
    expect(screen.getByText('⚡ Fast Delivery')).toBeInTheDocument();
    expect(screen.getByText('⭐ Best Taste')).toBeInTheDocument();
    
    // Footer
    expect(screen.getByText('Serving happiness with every slice.')).toBeInTheDocument();
  });
});
