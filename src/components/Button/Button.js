import s from './Button.module.css';

export default function Button({ value }) {
  return (
    <button className={s.btn} type="submit">
      {value}
    </button>
  );
}
