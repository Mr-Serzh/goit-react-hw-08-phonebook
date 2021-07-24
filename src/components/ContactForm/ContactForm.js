import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
// import Button from '@material-ui/core/Button';
import Button from '../Button';
import LoaderComponent from '../LoaderComponent';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);
  const isLoading = useSelector(contactsSelectors.getLoading);
  const error = useSelector(contactsSelectors.getError);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const checkRepeatName = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
  };

  const checkRepeatNumber = number => {
    return contacts.find(contact => contact.number === number);
  };

  const checkEmptyQuery = (name, number) => {
    return name.trim() === '' || number.trim() === '';
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (checkRepeatName(name)) {
      return toast.warn(`${name} is already in the phonebook.`);
    } else if (checkRepeatNumber(number)) {
      return toast.warn(`${number} is already in the phonebook.`);
    } else if (checkEmptyQuery(name, number)) {
      return toast.info("Enter the contact's name and number phone!");
    } else {
      dispatch(contactsOperations.addContact(name, number));
    }
    resetInput();
  };

  const resetInput = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        <span className={s.title}>Name</span>
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter name"
        />
      </label>
      <label className={s.label}>
        <span className={s.title}>Number</span>
        <NumberFormat
          placeholder="Enter phone number"
          format="(###) ###-##-##"
          mask="_"
          pattern="^[0-9\s\(\)\-]{15}"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          className={s.input}
        />
      </label>

      {!isLoading && !error && (
        <Button value={'Add contact'} />
        // <Button
        //   variant="contained"
        //   color="secondary"
        //   size="large"
        //   type="submit"
        // >
        //   Add contact
        // </Button>
      )}
      {/* <h2>Contacts</h2> */}
      {isLoading && <LoaderComponent />}
    </form>
  );
}
