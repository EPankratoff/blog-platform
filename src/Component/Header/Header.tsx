
import classes from './Header.module.scss'

export default function Header() {
    return (
        <header className={classes.header}>
            <a href="/" className={classes['header-logo']}>
                <h1 className={classes['header-logo_text']}>Realworld Blog</h1>
            </a>
            <div className={classes['header-btn']}>
                <button className={classes['header-btn_signin']} type='button'>Sign In</button>
                <button className={classes['header-btn_signup']} type='button'>Sign Up</button>
            </div>
        </header>
    )
}
