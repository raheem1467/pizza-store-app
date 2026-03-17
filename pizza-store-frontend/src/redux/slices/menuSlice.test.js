import menuReducer, { fetchMenu } from './menuSlice';

describe('menuSlice reducer', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
  };

  it('should handle initial state', () => {
    expect(menuReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchMenu.pending', () => {
    const action = { type: fetchMenu.pending.type };
    const state = menuReducer(initialState, action);
    expect(state.status).toEqual('loading');
  });

  it('should handle fetchMenu.fulfilled', () => {
    const mockPayload = [{ id: 1, name: 'Margherita' }, { id: 2, name: 'Pepperoni' }];
    const action = { 
      type: fetchMenu.fulfilled.type, 
      payload: mockPayload 
    };
    const state = menuReducer(initialState, action);
    expect(state.status).toEqual('succeeded');
    expect(state.items).toEqual(mockPayload);
  });

  it('should handle fetchMenu.rejected', () => {
    const action = { 
      type: fetchMenu.rejected.type, 
      payload: 'Network Error' 
    };
    const state = menuReducer(initialState, action);
    expect(state.status).toEqual('failed');
    expect(state.error).toEqual('Network Error');
  });
});
