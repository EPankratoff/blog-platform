import like from '../../../../assets/like.svg';
import CardTag from '../CardTag/CardTag';
import CardUser from '../CardUser/CardUser';

import classes from './CardTitle.module.scss';

export default function CardTitle() {
  return (
    <div className={classes['card-info']}>
      <div className={classes['card-info-wrap']}>
        <div className={classes['card-info-top']}>
          <a href="/" className={classes['card-title_link']}>
            {' '}
            <h2>Card Title</h2>
          </a>
          <button type="button" className={classes.like}>
            <img src={like} alt="Like" />
            <span>0</span>
          </button>
        </div>
        <CardUser />
      </div>

      <CardTag />
    </div>
  );
}
