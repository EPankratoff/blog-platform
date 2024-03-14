import classes from './CardArticle.module.scss';

export default function CardArticle() {
  return (
    <div className={classes['card-article']}>
      <p className={classes['card-article-description']}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident quam natus ullam
        asperiores vero aspernatur optio officiis quo amet placeat cupiditate accusantium voluptas
        reprehenderit, repellendus nihil cum corporis ipsa architecto!
      </p>
    </div>
  );
}
