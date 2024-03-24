import { Redirect } from 'react-router-dom';

import classes from './ArticleForm.module.scss';

export default function ArticleForm() {
  const token = localStorage.getItem('token');

  return !token ? (
    <Redirect to="/sign-in" />
  ) : (
    <div className={classes['form-wrap']}>
      <form className={classes['form-article']}>
        <h2 className={classes['form-article-title']}>Create new account</h2>
        <label className={classes['form-article-label']}>
          Title
          <input placeholder="Title" className={classes['form-article-input']} type="text" />
        </label>

        <label className={classes['form-article-label']}>
          Short description
          <input placeholder="Title" className={classes['form-article-input']} type="text" />
        </label>

        <label className={classes['form-article-label']}>
          Title
          <textarea placeholder="Text" className={classes['form-article-input--textarea']} />
        </label>

        <section className={classes['form-article-section']}>
          <ul className={classes['form-article-section-list']}>
            <li className={classes['form-article-section-list-item']}>
              <label className={classes['form-article-label']}>
                Tags
                <input
                  placeholder="Tag"
                  className={`${classes['form-article-input']} ${classes['form-article-input--tag']}`}
                  type="text"
                />
              </label>

              <button className={classes['form-article-button--delete']} type="button">
                Delete
              </button>
            </li>
          </ul>

          <button className={classes['form-article-button--add']} type="button">
            Add tag
          </button>
        </section>

        <button className={classes['form-article-button']} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
