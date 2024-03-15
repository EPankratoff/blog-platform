// import { Spin } from 'antd';

// import { useAppSelector } from '../../hooks/hooks';
import CardList from '../CardList/CardList';
import Header from '../Header/Header';

import classes from './App.module.scss';

export default function App() {

  // const loading = useAppSelector(state => state.fetchReducer)


  return (
    <div className={classes.app}>
      <Header />
      <main className={classes['app-main']}>
        <CardList />
      </main>
    </div>
  );
}
