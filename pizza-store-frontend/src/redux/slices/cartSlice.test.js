import cartReducer, { fetchCart, checkoutCart } from './cartSlice';

describe('cartSlice reducer', () => {
  const initialState = {
    cart: null,
    status: 'idle',
    error: null,
  };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchCart.pending', () => {
    const action = { type: fetchCart.pending.type };
    const state = cartReducer(initialState, action);
    expect(state.status).toEqual('loading');
  });

  it('should handle fetchCart.fulfilled', () => {
    const mockCart = { id: 1, items: [{ pizzaId: 1, quantity: 2 }] };
    const action = { 
      type: fetchCart.fulfilled.type, 
      payload: mockCart 
    };
    const state = cartReducer(initialState, action);
    expect(state.status).toEqual('succeeded');
    expect(state.cart).toEqual(mockCart);
  });

  it('should handle fetchCart.rejected', () => {
    const action = { 
      type: fetchCart.rejected.type, 
      payload: 'Cart fetch failed' 
    };
    const state = cartReducer(initialState, action);
    expect(state.status).toEqual('failed');
    expect(state.error).toEqual('Cart fetch failed');
  });

  it('should handle checkoutCart.fulfilled', () => {
    const action = { type: checkoutCart.fulfilled.type };
    const state = cartReducer(initialState, action);
    expect(state.status).toEqual('succeeded');
  });
});
