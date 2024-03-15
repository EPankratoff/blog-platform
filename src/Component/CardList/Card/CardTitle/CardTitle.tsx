
import like from '../../../../assets/like.svg';
import CardTag from '../CardTag/CardTag';
import CardUser from '../CardUser/CardUser';

import classes from './CardTitle.module.scss';

type CardTitleInfo = {
  createdAt: string,
  title: string,
  tagList: string[],
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export default function CardTitle({ title, author, createdAt, tagList }: CardTitleInfo) {

  return (
    <div className={classes['card-info']}>
      <div className={classes['card-info-wrap']}>
        <div className={classes['card-info-top']}>
          <a href="/" className={classes['card-title_link']}>
            {' '}
            <h2>{title}</h2>
          </a>
          <button type="button" className={classes.like}>
            <img src={like} alt="Like" />
            <span>0</span>
          </button>
        </div>
        <CardUser author={author} createdAt={createdAt} />
      </div>

      <CardTag tagList={tagList} />
    </div>
  );
}
