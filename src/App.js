import './App.css';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { MoviesPage } from './pages/MoviesPage/MoviesPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MovieDetailsPage } from './pages/MovieDetailsPage/MovieDetailsPage';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/homepage" />}
        ></Route>
        <Route path="/movies/:id">
          <MovieDetailsPage />
        </Route>
        <Route path="/homepage">
          <HomePage />
        </Route>
        <Route path="/movies">
          <MoviesPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
