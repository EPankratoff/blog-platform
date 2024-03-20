// eslint-disable-next-line import/no-extraneous-dependencies
import Markdown from 'marked-react';
import { useEffect } from 'react';
import { Spin } from 'antd';

import CardHeader from '../CardHeader/CardHeader';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCard } from '../../store/fetchSlice';

import classes from './Card.module.scss';

export default function Card({ cardSlug }: { cardSlug: string }) {
  const { currentArticle, loading } = useAppSelector((state) => state.fetchReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCard({ slug: cardSlug }));
  }, [dispatch, cardSlug]);

  function renderArticle() {
    if (!currentArticle) {
      return <span> Not article </span>;
    }
    return (
      <article className={classes.article}>
        {currentArticle !== null && <CardHeader isAlone={false} article={currentArticle} />}
        <main className={classes.article_content}>
          <Markdown value={currentArticle.body} />
        </main>
      </article>
    );
  }

  return loading ? <Spin /> : <> {renderArticle()}</>;
}
