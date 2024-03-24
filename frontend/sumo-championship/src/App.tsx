import { FunctionComponent } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Nav from './components/organisms/Nav';
import Other from './pages/Other';
import Players from './pages/Players';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ROUTES from './routes/ROUTES';
import { useUser } from './contexts/UserContext';
import AddSeason from './pages/AddSeason';
import SeasonPage from './pages/SeasonPage';
import AllSeasonsPage from './pages/AllSeasonsPage';

const App: FunctionComponent = () => {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path={ROUTES.OTHER} element={<Other />} />
          <Route
            path={ROUTES.LOGIN}
            element={
              !user.isLogged ? <LoginPage /> : <Navigate to={ROUTES.HOME} />
            }
          />
          <Route path={ROUTES.PLAYERS} element={<Players />} />
          <Route path={ROUTES.SEASONS} element={<AllSeasonsPage />} />
          <Route path={ROUTES.SEASONS_ADD} element={<AddSeason />} />
          <Route path={ROUTES.SEASON_PAGE} element={<SeasonPage />} />
          <Route path={ROUTES.HOME} element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
