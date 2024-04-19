import { useEffect } from 'react';
import './App.css';
import WithRoutes from 'widgets/WithRoutes/WithRoutes';
import Navigation from 'widgets/Navigation/Navigation';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <div className="app">
      <Navigation />
      <WithRoutes />
    </div>
  );
}

export default App;
