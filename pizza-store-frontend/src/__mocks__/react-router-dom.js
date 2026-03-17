import React from 'react';

const mockReactRouterDom = {
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ children }) => <div>{children}</div>,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  MemoryRouter: ({ children }) => <div>{children}</div>
};

module.exports = mockReactRouterDom;
