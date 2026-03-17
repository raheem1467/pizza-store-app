import orderReducer, { fetchUserOrders, updatePreviousOrders } from './orderSlice';

describe('orderSlice reducer', () => {
  const initialState = {
    orders: [],
    previousOrders: [],
    status: 'idle',
    error: null,
  };

  it('should handle initial state', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle updatePreviousOrders', () => {
    const mockPrevious = [{ id: 101, status: 'delivered' }];
    const actual = orderReducer(initialState, updatePreviousOrders(mockPrevious));
    expect(actual.previousOrders).toEqual(mockPrevious);
  });

  it('should handle fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.status).toEqual('loading');
  });

  it('should handle fetchUserOrders.fulfilled', () => {
    const mockOrders = [{ id: 1, items: [] }];
    const action = { 
      type: fetchUserOrders.fulfilled.type, 
      payload: mockOrders 
    };
    const state = orderReducer(initialState, action);
    expect(state.status).toEqual('succeeded');
    expect(state.orders).toEqual(mockOrders);
  });

  it('should handle fetchUserOrders.rejected', () => {
    const action = { 
      type: fetchUserOrders.rejected.type, 
      payload: 'Order fetch failed' 
    };
    const state = orderReducer(initialState, action);
    expect(state.status).toEqual('failed');
    expect(state.error).toEqual('Order fetch failed');
  });
});
