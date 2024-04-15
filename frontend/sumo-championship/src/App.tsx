import { FunctionComponent } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Nav from './components/organisms/Nav';
import Contact from './pages/Contact';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ROUTES from './routes/allRoutes';
import { useUser } from './contexts/UserContext';
import AddSeason from './pages/AddSeason';
import SeasonPage from './pages/SeasonPage';
import AllSeasonsPage from './pages/AllSeasonsPage';
import CurrentTournamentsPage from './pages/CurrentTournamentsPage';
import AddTournamentPage from './pages/AddTournamentPage';
import TournamentPage from './pages/TournamentPage';
import RegisterChampionsForTournamentPage from './pages/RegisterChampionsForTournamentPage/RegisterChampionsForTournamentPage';
import { Role } from './api/login';
import AddTrainer from './pages/AddTrainer/AddTrainer';
import ChampionsPage from './pages/ChampionsPage';

const App: FunctionComponent = () => {
  const { user } = useUser();

  const adminRestrictedPage = (element: JSX.Element | JSX.Element[]) =>
    user.role === Role.Admin ? element : <Navigate to={ROUTES.HOME} />;

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
          <Route
            path={ROUTES.TOURNAMENTS}
            element={<CurrentTournamentsPage />}
          />
          <Route path={ROUTES.SEASONS} element={<AllSeasonsPage />} />
          <Route
            path={ROUTES.SEASONS_ADD}
            element={adminRestrictedPage(<AddSeason />)}
          />
          <Route path={ROUTES.SEASON_PAGE} element={<SeasonPage />} />
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.CHAMPIONS} element={<ChampionsPage />} />
          <Route
            path={ROUTES.TOURNAMENTS_ADD}
            element={adminRestrictedPage(<AddTournamentPage />)}
          />
          <Route path={ROUTES.TOURNAMENT_PAGE} element={<TournamentPage />} />
          <Route
            path={ROUTES.TOURNAMENT_REGISTER_PAGE}
            element={<RegisterChampionsForTournamentPage />}
          />
          <Route
            path={ROUTES.TOURNAMENTS_ADD_TO_SEASON}
            element={adminRestrictedPage(<AddTournamentPage />)}
          />
          <Route
            path={ROUTES.ADDTRAINER}
            element={adminRestrictedPage(<AddTrainer />)}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
