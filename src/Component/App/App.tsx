import CardList from '../CardList/CardList';
import Header from '../Header/Header';

import classes from './App.module.scss';

export default function App() {
  return (
    <div className={classes.app}>
      <Header />
      <main className={classes['app-main']}>
        <CardList />
      </main>
    </div>
  );
}
