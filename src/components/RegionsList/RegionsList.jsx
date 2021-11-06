import { Link } from 'react-router-dom';
import styles from './RegionsList.module.css';

const RegionsList = (props) => {
  if (props.list.length === 0) {
    return <p className={styles.emptyInfo}>no regions added yet!</p>;
  }

  return (
    <>
      <ul>
        {props.list.map((el) => {
          return (
            <>
              <Link
                key={el.id}
                to={`/regions/${el.id}`}
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <li>{el.name}</li>
              </Link>
              <hr />
            </>
          );
        })}
      </ul>
    </>
  );
};

export default RegionsList;
