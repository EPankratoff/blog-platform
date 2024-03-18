// eslint-disable-next-line import/no-extraneous-dependencies
import Markdown from 'marked-react';
import { useEffect } from 'react';

import CardHeader from '../CardHeader/CardHeader';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCard } from '../../store/fetchSlice';

export default function Card() {
  const { currentArticle } = useAppSelector((state) => state.fetchReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCard({ slug: '' }));
  });
  return (
    <article>
      {currentArticle !== null && <CardHeader article={currentArticle} />}
      <main>
        <Markdown value={currentArticle?.body} />
      </main>
    </article>
  );
}
