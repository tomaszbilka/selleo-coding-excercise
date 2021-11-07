import { Link } from "react-router-dom";
import styles from "./RegionsList.module.css";
import { useContext } from "react";
import { RegionContext } from "../../store";

const RegionsList = () => {
  const ctx = useContext(RegionContext);

  if (ctx.length === 0) {
    return <p className={styles.emptyInfo}>no regions added yet!</p>;
  }

  return (
    <>
      <h3>Region list</h3>
      <ul>
        {ctx.map((el) => {
          return (
            <>
              <Link
                key={el.id}
                to={`/regions/${el.id}`}
                style={{ textDecoration: "none", color: "#000" }}
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
