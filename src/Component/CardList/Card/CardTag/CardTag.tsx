import classes from './CardTad.module.scss';

export default function CardTag() {
  return (
    <ul className={classes['card-tag-list']}>
      <li className={classes['card-tag-item']}>CardTag</li>
      <li className={classes['card-tag-item']}>CardTag</li>
      <li className={classes['card-tag-item']}>CardTag</li>
    </ul>
  );
}
