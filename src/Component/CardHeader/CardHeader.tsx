import uniqid from 'uniqid';
import { format, parseISO } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Popconfirm } from 'antd';
import { useEffect } from 'react';

import { CardData } from '../../Types/CardTyps';
import like from '../../assets/like.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchDeleteArticle } from '../../store/fetchSlice';

import classes from './CardHeader.module.scss';

export default function CardHeader({
  article,
  isAlone = true,
}: {
  article: CardData;
  isAlone: boolean;
}) {
  const { title, author, createdAt, description, tagList } = article;
  const { currentUser, isDeleteSuccess, loading } = useAppSelector((state) => state.fetchReducer);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const formateDate = format(parseISO(createdAt), 'MMMM dd, yyyy', { locale: enGB });
  const history = useHistory();

  useEffect(() => {
    if (!loading && isDeleteSuccess) {
      history.push('/');
    }
  }, [isDeleteSuccess, loading, history]);

  const headerClass = classNames({
    [classes['app-card']]: true,
    [classes['app-card--alone']]: isAlone,
  });

  const tagsItem = tagList
    .filter((tag) => tag?.match(/\S/))
    .map((tag) => (
      <li key={uniqid.time('tag:')} className={classes['card-tag-item']}>
        {tag}
      </li>
    ));

  return (
    <header className={headerClass}>
      <div className={classes['card-info']}>
        <div className={classes['card-info-wrap']}>
          <div className={classes['card-info-top']}>
            <Link to={`/articles/${article.slug}`} className={classes['card-title_link']}>
              <h2>{title}</h2>
            </Link>
            <button type="button" className={classes.like}>
              <img src={like} alt="Like" />
              <span>0</span>
            </button>
          </div>
          <div className={classes.user}>
            <div className={classes['user-info']}>
              <span className={classes['user-info_title']}>{author.username}</span>
              <span className={classes['user-info_date']}>{formateDate}</span>
            </div>
            <img src={author.image} alt="UserImg" className={classes['user-img']} />
          </div>
        </div>

        <ul className={classes['card-tag-list']}>
          {tagList.length > 0 ? (
            tagsItem
          ) : (
            <div className={classes['card-tag-not']}>Not tags..</div>
          )}
        </ul>
      </div>
      <div className={classes['card-article']}>
        <p className={classes['card-article-description']}>{description}</p>
      </div>
      {token && !isAlone && article.author.username === currentUser?.username && (
        <div className={classes['card-article-change']}>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            placement="right"
            onConfirm={() => dispatch(fetchDeleteArticle({ token, slug: article.slug }))}
          >
            <Button danger>Delete</Button>
          </Popconfirm>

          <Link to={`/articles/${article.slug}/edit`}>
            <button className={classes['card-article-change--edit']} type="button">
              Edit
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
