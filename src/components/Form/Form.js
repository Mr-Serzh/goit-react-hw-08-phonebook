import s from './Form.module.css';

export default function Form({ children }) {
  return <div className={s.form}>{children}</div>;
}
