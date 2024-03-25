import { FunctionComponent } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Nav from './components/organisms/Nav';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import LoginPage from './pages/LoginPage';
import ROUTES from './routes/ROUTES';
import { useUser } from './contexts/UserContext';
import Seasons from './pages/Seasons';
import AddSeason from './pages/AddSeason';

const App: FunctionComponent = () => {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              !user.isLogged ? <LoginPage /> : <Navigate to={ROUTES.HOME} />
            }
          />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.TOURNAMENTS} element={<Tournaments />} />
          <Route path={ROUTES.SEASONS} element={<Seasons />} />
          <Route path={ROUTES.SEASONS_ADD} element={<AddSeason />} />
          <Route path={ROUTES.HOME} element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;