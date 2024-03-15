import classes from './CardArticle.module.scss';


type ICardArticle = {
  description: string
}
export default function CardArticle({ description }: ICardArticle) {
  return (
    <div className={classes['card-article']}>
      <p className={classes['card-article-description']}>
        {description}
      </p>
    </div>
  );
}
