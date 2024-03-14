import uniqid from 'uniqid';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { RootState } from '../../store';
import { fetchCard } from '../../store/fetchSlice';

import classes from './CardList.module.scss';
import Card from './Card/Card';

export default function CardList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCard({ offset: 0 }));
  }, [dispatch]);

  const storeCardsList = useAppSelector((state: RootState) => state.fetchReducer);
  const cardsItem = storeCardsList.articles.map((card) => (
    <li key={uniqid.time('cards:')}>
      <Card cardData={card} />
    </li>
  ));

  return <ul className={classes.cardlist}>{cardsItem}</ul>;
}
