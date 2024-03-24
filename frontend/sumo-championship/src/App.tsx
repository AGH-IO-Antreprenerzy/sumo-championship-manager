import { FunctionComponent } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Nav from './components/organisms/Nav';
import Other from './pages/Other';
import Players from './pages/Players';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ROUTES from './routes/ROUTES';
import { useUser } from './contexts/UserContext';
import Seasons from './pages/Seasons';
import AddSeason from './pages/AddSeason';
import AddTournament from './pages/AddTournament';

const App: FunctionComponent = () => {
  const { user } = useUser();

  return (
    <AddTournament/>
  );
};

export default App;
