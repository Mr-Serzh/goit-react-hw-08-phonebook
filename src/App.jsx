import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/Form/Form';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

export default function App() {
  return (
    <Form>
      <h1>Phonebook</h1>
      <ContactForm />
      <Filter />
      <ContactList />
      <ToastContainer autoClose={2700} />
    </Form>
  );
}
