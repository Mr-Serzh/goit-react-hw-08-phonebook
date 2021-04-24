import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cleave from 'cleave.js/react';
import { toast } from 'react-toastify';
import { contactsOperations, contactsSelectors } from '../../redux';
import LoaderComponent from '../LoaderComponent/LoaderComponent';
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

  const checkValidNumber = number => {
    return !/\d{3}[-]\d{2}[-]\d{2}/g.test(number);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (checkRepeatName(name)) {
      toast.warn(`${name} is already in the phonebook.`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (checkRepeatNumber(number)) {
      toast.warn(`${number} is already in the phonebook.`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (checkEmptyQuery(name, number)) {
      toast.info("Enter the contact's name and number phone!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (checkValidNumber(number)) {
      toast.error('Enter the correct number phone!', {
        position: toast.POSITION.TOP_CENTER,
      });
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
          placeholder="Jennifer Aniston"
        />
      </label>
      <label className={s.label}>
        <span className={s.title}>Number</span>
        <Cleave
          options={{ delimiter: '-', blocks: [3, 2, 2] }}
          placeholder="734-85-92"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          className={s.input}
        />
      </label>
      {/* {!isLoading && !error && ( */}
      <button className={s.btn} type="submit">
        Add contact
      </button>
      {/* )} */}
      <h2>Contacts</h2>
      {isLoading && <LoaderComponent />}
    </form>
  );
}
