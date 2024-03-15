import uniqid from 'uniqid';
import { useEffect } from 'react';
import { Alert, Space, Spin } from 'antd';

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
  const loading = useAppSelector(state => state.fetchReducer.loading)
  const error = useAppSelector(state => state.fetchReducer.error)

  if (loading) {
    return <Spin />
  }
  if (error) {
    return <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Alert message="Что-то пошло не так" description="Но скоро все исправится " type="error" showIcon />{' '}
    </Space>
  }



  // const errorMessage = error ? <Space
  //   direction="vertical"
  //   style={{
  //     width: '100%',
  //   }}
  // >
  //   <Alert message="Что-то пошло не так" description="Но скоро все исправится " type="error" showIcon />{' '}
  // </Space> : null


  const cardsItem = storeCardsList.articles.map((card) => (
    <li key={uniqid.time('cards:')}>
      <Card cardData={card} />
    </li>
  ));

  return <ul className={classes.cardlist}>{cardsItem}</ul>;
}
