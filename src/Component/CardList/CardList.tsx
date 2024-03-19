import uniqid from 'uniqid';
import { useEffect } from 'react';
import { ConfigProvider, Pagination, Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCards } from '../../store/fetchSlice';
import CardHeader from '../CardHeader/CardHeader';

import classes from './CardList.module.scss';

export default function CardList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCards({ offset: 0 }));
  }, [dispatch]);

  const { articles, articlesCount } = useAppSelector((state) => state.fetchReducer);
  const loading = useAppSelector((state) => state.fetchReducer.loading);

  const cardsItem = articles.map((article) => (
    <li key={uniqid.time('cards:')}>
      <CardHeader article={article} />
    </li>
  ));

  return (
    <div>
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
    </div>
  );
}
