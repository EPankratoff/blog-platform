import uniqid from 'uniqid';
import { useEffect } from 'react';
import { ConfigProvider, Pagination, Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { clearDeleteState, fetchCards } from '../../store/fetchSlice';
import CardHeader from '../CardHeader/CardHeader';

import classes from './CardList.module.scss';

export default function CardList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearDeleteState());
    dispatch(fetchCards({ offset: 0 }));
  }, [dispatch]);

  const { articles, articlesCount } = useAppSelector((state) => state.fetchReducer);
  const loading = useAppSelector((state) => state.fetchReducer.loading);

  const cardsItem = articles.map((article) => (
    <li className={classes['cardlist-item']} key={uniqid.time('cards:')}>
      <CardHeader isAlone article={article} />
    </li>
  ));

  return (
    <>
      {loading ? <Spin /> : <ul className={classes.cardlist}>{cardsItem}</ul>}

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ffffff',
          },
          components: {
            Pagination: {
              itemActiveBg: '#1890ff',
            },
          },
        }}
      >
        <Pagination
          className={classes.pagination}
          showSizeChanger={false}
          defaultCurrent={1}
          total={articlesCount}
          onChange={(value) => {
            dispatch(fetchCards({ offset: 5 * (value - 1) }));
          }}
        />
      </ConfigProvider>
    </>
  );
}
