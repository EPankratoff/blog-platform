// import user from '../../../../assets/user.png';
import { enGB } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';

import classes from './CardUser.module.scss';

type CardUserInfo = {
  createdAt: string,
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export default function CardUser({ author, createdAt }: CardUserInfo) {

  const { username, image } = author

  const formateDate = format(parseISO(createdAt), 'MMMM dd, yyyy', { locale: enGB })

  return (
    <div className={classes.user}>
      <div className={classes['user-info']}>
        <span className={classes['user-info_title']}>{username}</span>
        <span className={classes['user-info_date']}>{formateDate}</span>
      </div>
      <img src={image} alt="UserImg" className={classes['user-img']} />
    </div>
  );
}
