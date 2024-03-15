import uniqid from 'uniqid';

import classes from './CardTad.module.scss';

type ITags = {
  tagList: string[]
}

export default function CardTag({ tagList }: ITags) {
  if (tagList.length === 0) {
    return <p className={classes['card-tag-not']}>not tags...</p>;
  }

  const tagsItem = tagList.map((tag) => (
    <li key={uniqid.time('cards:')} className={classes['card-tag-item']}>
      {tag}
    </li>
  ));

  return <ul className={classes['card-tag-list']}>{tagsItem}</ul>;
}
