import { type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to CLP React</h1>
        <p>Your React 19 + TypeScript + Vite + Zustand project is ready!</p>
      </div>
    ),
  },
];

export default routes;
