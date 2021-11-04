import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Regions.module.css";

const Regions = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  let navigate = useNavigate();

  const nameInputChangeHandler = (event) => {
    setName(event.target.value);
  };

  const descriptionInputChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    const region = {
      name,
      description,
    };

    props.onAdd(region);
    navigate("/regions");
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={nameInputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <input
            type='text'
            id='description'
            value={description}
            onChange={descriptionInputChangeHandler}
          />
        </div>
        <button>ADD</button>
      </form>
    </>
  );
};

export default Regions;
