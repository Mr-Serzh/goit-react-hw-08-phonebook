import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { contactsActions, contactsSelectors } from '../../redux';
import { variants } from '../../utils/motionVar';
import s from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(contactsSelectors.getFilter);
  const contacts = useSelector(contactsSelectors.getContacts);
  const error = useSelector(contactsSelectors.getError);

  return (
    <>
      {contacts.length > 1 && !error && (
        <AnimatePresence>
          <motion.label
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition"
            variants={variants}
            className={s.label}
          >
            Find contacts by name
            <motion.input
              initial="initial"
              animate="animate"
              exit="exit"
              transition="transition"
              variants={variants}
              className={s.input}
              type="text"
              value={filter}
              name="filter"
              placeholder="input name"
              onChange={e =>
                dispatch(contactsActions.filterContact(e.target.value))
              }
            />
          </motion.label>
        </AnimatePresence>
      )}
    </>
  );
}
