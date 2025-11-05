import { useRoutes } from 'react-router-dom';
import routes from '@core/routes';
import logger from '@core/utils/loggerUtils';

function App() {
  logger.info('App component rendered');
  const element = useRoutes(routes);

  return element;
}

export default App;
