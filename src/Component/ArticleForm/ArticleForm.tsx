import { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import uniqid from 'uniqid';

import {
  fetchCreateArticle,
  fetchCard,
  fetchEditArticle,
  clearCurrentArticle,
  clearError,
} from '../../store/fetchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import classes from './ArticleForm.module.scss';

export interface IFieldCreateArticle {
  title: string;
  description: string;
  text: string;
  tags: { name: string }[];
}

export default function ArticleForm({ articleSlug = null }: { articleSlug: string | null }) {
  const history = useHistory();
  const { loading, error, currentArticle, currentUser } = useAppSelector(
    (state) => state.fetchReducer
  );
  const dispatch = useAppDispatch();
  const title = currentArticle?.title || '';
  const description = currentArticle?.description || '';
  const text = currentArticle?.body || '';
  const token = localStorage.getItem('token');

  const {
    control,
    register,
    formState: { errors, submitCount, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<IFieldCreateArticle>({
    defaultValues: {
      tags: (currentArticle?.tagList && [
        ...currentArticle.tagList.map((tag) => ({ name: `${tag}` })),
      ]) || [{ name: '' }],
    },
  });

  useEffect(() => {
    if (articleSlug) {
      dispatch(fetchCard({ slug: articleSlug, token: null }));
      console.log(articleSlug);
    } else {
      dispatch(clearCurrentArticle());
      reset();
      reset({
        tags: [{ name: '' }],
      });
    }
  }, [dispatch, articleSlug]);
  console.log(articleSlug);

  useEffect(() => {
    if (submitCount && !error && !loading && !isSubmitting && !Object.keys(errors).length) {
      history.push(`/articles/${currentArticle?.slug}`);
    }
  }, [isSubmitting, loading]);

  const { append, fields, remove } = useFieldArray({ name: 'tags', control });

  const onSubmit: SubmitHandler<IFieldCreateArticle> = (data) => {
    if (token) {
      if (articleSlug) {
        dispatch(
          fetchEditArticle({
            body: {
              article: {
                title: data.title,
                description: data.description,
                body: data.text,
                tagList: data.tags.map((tag) => tag.name),
              },
            },
            token,
            slug: articleSlug,
          })
        );
      } else {
        dispatch(
          fetchCreateArticle({
            body: {
              article: {
                title: data.title,
                description: data.description,
                body: data.text,
                tagList: data.tags.map((tag) => tag.name),
              },
            },
            token,
          })
        );
      }
    }
  };

  return !token ||
    (currentArticle && currentUser && currentArticle.author.username !== currentUser.username) ? (
    <Redirect to="/sign-in" />
  ) : (
    <div className={classes['form-wrap']}>
      <form className={classes['form-article']} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes['form-article-title']}>Create new account</h2>
        <label className={classes['form-article-label']}>
          Title
          <input
            {...register('title', {
              required: 'Поле обязательно к заполнению',
            })}
            defaultValue={title}
            placeholder="Title"
            className={classes['form-article-input']}
            type="text"
          />
        </label>
        {errors.title && (
          <span className={classes['form-article-error']}>{errors.title.message as string}</span>
        )}

        <label className={classes['form-article-label']}>
          Short description
          <input
            {...register('description', {
              required: 'Поле обязательно к заполнению',
            })}
            defaultValue={description}
            placeholder="Title"
            className={classes['form-article-input']}
            type="text"
          />
        </label>
        {errors.description && (
          <span className={classes['form-article-error']}>
            {errors.description.message as string}
          </span>
        )}

        <label className={classes['form-article-label']}>
          Text
          <textarea
            {...register('text', {
              required: 'Поле обязательно к заполнению',
            })}
            defaultValue={text}
            placeholder="Text"
            className={classes['form-article-input--textarea']}
          />
        </label>
        {errors.text && (
          <span className={classes['form-article-error']}>{errors.text.message as string}</span>
        )}

        <section className={classes['form-article-section']}>
          <ul className={classes['form-article-section-list']}>
            Tags
            {fields.map((_, index) => (
              <li key={uniqid.time('tag:')} className={classes['form-article-section-list-item']}>
                <input
                  {...register(`tags.${index}.name`, {
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message:
                        'You can use only english letters and digits without spaces and other symbols',
                    },
                  })}
                  placeholder="Tag"
                  className={`${classes['form-article-input']} ${classes['form-article-input--tag']}`}
                  type="text"
                />

                <button
                  onClick={() => remove(index)}
                  className={classes['form-article-button--delete']}
                  type="button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => append({ name: '' })}
            className={classes['form-article-button--add']}
            type="button"
          >
            Add tag
          </button>
        </section>

        <button
          onClick={() => dispatch(clearError('all'))}
          className={classes['form-article-button']}
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}
