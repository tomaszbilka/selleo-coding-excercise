import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <nav className={styles.container}>
      <Link to='/' style={{ marginRight: '20px', textDecoration: 'none' }}>
        <Button variant='text'>region</Button>
      </Link>
      <Link
        to='/regions'
        style={{ marginRight: '3px', textDecoration: 'none' }}
      >
        <Button variant='text'>region list</Button>
      </Link>
    </nav>
  );
};

export default Header;
