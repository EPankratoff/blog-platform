/* eslint-disable @typescript-eslint/no-unused-vars */

import classes from './Card.module.scss';
import CardArticle from './CardArticle/CardArticle';
import CardTitle from './CardTitle/CardTitle';

export type CardData = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
  articlesCount: number;
};

export interface CardProps {
  cardData: CardData;
}

export default function Card({ cardData }: CardProps) {


  const { title, author, createdAt, description, tagList } = cardData

  return (
    <div className={classes['app-card']}>
      <CardTitle title={title} author={author} createdAt={createdAt} tagList={tagList} />
      <CardArticle description={description} />
    </div>
  );
}
