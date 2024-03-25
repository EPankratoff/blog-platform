import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Card from '../Card/Card';
import CardList from '../CardList/CardList';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import EditProfile from '../EditProfile/EditProfile';
import Header from '../Header/Header';
import ArticleForm from '../ArticleForm/ArticleForm';

import classes from './App.module.scss';

export default function App() {
  return (
    <Router>
      <div className={classes.app}>
        <Header />
        <main className={classes['app-main']}>
          <Switch>
            <Route
              path="/articles/:slug"
              render={({ match }) => {
                const { slug } = match.params;
                return <Card cardSlug={slug} />;
              }}
            />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/profile" component={EditProfile} />
            <Route path="/new-article" component={ArticleForm} />
            <Route
              path="/articles/:slug/edit"
              render={({ match }) => {
                const { slug } = match.params;
                return <ArticleForm articleSlug={slug} />;
              }}
            />
            <Route path="/" exact component={CardList} />
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
