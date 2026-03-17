import authReducer, { loginSuccess, logoutSuccess } from './authSlice';

describe('authSlice reducer', () => {
  const initialState = {
    token: null,
    role: null,
    name: null,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginSuccess', () => {
    const payload = {
      token: 'fake-token',
      role: 'admin',
      name: 'Admin User',
    };
    
    const actual = authReducer(initialState, loginSuccess(payload));
    
    expect(actual.token).toEqual('fake-token');
    expect(actual.role).toEqual('admin');
    expect(actual.name).toEqual('Admin User');
    
    expect(localStorage.getItem('token')).toEqual('fake-token');
    expect(localStorage.getItem('role')).toEqual('admin');
    expect(localStorage.getItem('name')).toEqual('Admin User');
  });

  it('should handle logoutSuccess', () => {
    const loggedInState = {
      token: 'fake-token',
      role: 'admin',
      name: 'Admin User',
    };
    
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('role', 'admin');
    localStorage.setItem('name', 'Admin User');

    const actual = authReducer(loggedInState, logoutSuccess());
    
    expect(actual.token).toBeNull();
    expect(actual.role).toBeNull();
    expect(actual.name).toBeNull();
    
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(localStorage.getItem('name')).toBeNull();
  });
});
