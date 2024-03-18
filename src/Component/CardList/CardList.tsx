import uniqid from 'uniqid';
import { useEffect } from 'react';
import { Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCards } from '../../store/fetchSlice';
import CardHeader from '../CardHeader/CardHeader';

import classes from './CardList.module.scss';

export default function CardList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCards({ offset: 0 }));
  }, [dispatch]);

  const storeCardsList = useAppSelector((state) => state.fetchReducer);
  const loading = useAppSelector((state) => state.fetchReducer.loading);

  const cardsItem = storeCardsList.articles.map((article) => (
    <li key={uniqid.time('cards:')}>
      <CardHeader article={article} />
    </li>
  ));

  return <div>{loading ? <Spin /> : <ul className={classes.cardlist}>{cardsItem}</ul>}</div>;
}
