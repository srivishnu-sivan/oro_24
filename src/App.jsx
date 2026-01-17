import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import './styles/index.scss';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;