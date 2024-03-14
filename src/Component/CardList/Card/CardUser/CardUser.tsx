import user from '../../../../assets/user.png'

import classes from './CardUser.module.scss'


export default function CardUser() {
    return (
        <div className={classes.user} >
            <div className={classes['user-info']}>
                <span className={classes['user-info_title']}>name</span>
                <span className={classes['user-info_date']}>data</span>
            </div>
            <img src={user} alt="UserImg" className={classes['user-img']} />
        </div>
    )
}
