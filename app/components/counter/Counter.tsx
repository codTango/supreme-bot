import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Counter.css';
import {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync,
  selectCount,
} from './counterSlice';

export default function Counter() {
  const dispatch = useDispatch();
  const value = useSelector(selectCount);
  return (
    <div>
      <div className={`counter ${styles.counter}`} data-tid="counter">
        {value}
      </div>
      <div className={styles.btnGroup}>
        <button
          className={styles.btn}
          onClick={() => {
            dispatch(increment());
          }}
          data-tclass="btn"
          type="button"
        >
          <i className="fa fa-plus" />
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            dispatch(decrement());
          }}
          data-tclass="btn"
          type="button"
        >
          <i className="fa fa-minus" />
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            dispatch(incrementIfOdd());
          }}
          data-tclass="btn"
          type="button"
        >
          odd
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            dispatch(incrementAsync());
          }}
          data-tclass="btn"
          type="button"
        >
          async
        </button>
      </div>
    </div>
  );
}
