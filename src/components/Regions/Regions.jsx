import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Regions.module.css";
import { MapContainer, TileLayer, Polygon, useMapEvent } from "react-leaflet";
import { TextField, Button } from "@mui/material";
import "leaflet/dist/leaflet.css";
import {
  nameSchema,
  descriptionSchema,
  polygonSchema,
} from "../../validations";

function MyComponent(props) {
  useMapEvent("click", (event) => {
    props.setIsMapTouched(true);
    props.setIsPolygonEmpty(false);
    const point = event.latlng;
    props.setPolygon((prev) => {
      return [...prev, [point.lat, point.lng]];
    });
  });
  return null;
}

const Regions = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [polygon, setPolygon] = useState([]);
  const [isPolygonEmpty, setIsPolygonEmpty] = useState(true);

  const [isNameInvalid, setIsNameInvalid] = useState(true);
  const [isDescriptionInvalid, setIsDescriptionInvalid] = useState(true);
  const [isMapInvalid, setIsMapInvalid] = useState(true);

  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);
  const [isMapTouched, setIsMapTouched] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    checkMapValidity();
    checkNameValidity();
    checkDescriptionValidity();
    if (polygon.length === 0) {
      setIsPolygonEmpty(true);
    }
  }, [polygon, name, description]);

  const nameInputChangeHandler = (event) => {
    setName(event.target.value);
  };

  const descriptionInputChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const checkNameValidity = async () => {
    const nameToValid = { name: name };
    const isNameValidAfterBlur = await nameSchema.isValid(nameToValid);
    if (isNameValidAfterBlur) {
      setIsNameInvalid(false);
    } else {
      setIsNameInvalid(true);
    }
  };

  const checkDescriptionValidity = async () => {
    const descriptionToValid = { description: description };
    const isDescriptionValidAfterBlur = await descriptionSchema.isValid(
      descriptionToValid
    );
    if (isDescriptionValidAfterBlur) {
      setIsDescriptionInvalid(false);
    } else {
      setIsDescriptionInvalid(true);
    }
  };

  const checkMapValidity = async () => {
    const checkValidity = await polygonSchema.isValid(polygon);
    if (checkValidity) {
      setIsMapInvalid(false);
    } else {
      setIsMapInvalid(true);
    }
  };

  const nameBlurHandler = () => {
    checkNameValidity();
    setIsNameTouched(true);
  };

  const descriptionBlurHandler = () => {
    checkDescriptionValidity();
    setIsDescriptionTouched(true);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    const region = {
      name,
      description,
      id: Math.random(),
      polygon,
    };

    checkNameValidity();
    checkDescriptionValidity();
    checkMapValidity();
    setIsNameTouched(true);
    setIsDescriptionTouched(true);
    setIsMapTouched(true);

    if (!isNameInvalid && !isDescriptionInvalid && !isMapInvalid) {
      props.onAdd(region);
      navigate("/regions");
    }
  };

  const removeLastPointFromMap = () => {
    setPolygon((prev) => {
      return prev.splice(0, prev.length - 1);
    });
  };

  const removeAllPointsFromMap = () => {
    setPolygon([]);
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={submitFormHandler}
        autoComplete='off'
      >
        <div className={styles.wrapp}>
          <TextField
            type='text'
            id='name'
            value={name}
            onChange={nameInputChangeHandler}
            onBlur={nameBlurHandler}
            variant='outlined'
            label='region name'
            helperText={isNameInvalid && isNameTouched && "3 - 20 chars"}
            fullWidth
            style={{ color: "red" }}
          />
          <Button variant='contained' fullWidth type='submit'>
            ADD
          </Button>
        </div>
        <TextField
          type='text'
          id='description'
          value={description}
          onChange={descriptionInputChangeHandler}
          onBlur={descriptionBlurHandler}
          variant='outlined'
          label='region description'
          helperText={
            isDescriptionInvalid && isDescriptionTouched && "10-500 chars"
          }
          multiline
          rows={4}
          fullWidth
        />
      </form>
      <section className={styles.mapWrapp}>
        {isMapInvalid && isMapTouched && (
          <p className={styles.info}>choose at lest 3 points inside map!</p>
        )}

        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          style={{
            height: "500px",
            position: "relative",
            zIndex: "1",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Polygon positions={polygon} />
          <MyComponent
            setPolygon={setPolygon}
            setIsMapTouched={setIsMapTouched}
            setIsPolygonEmpty={setIsPolygonEmpty}
          />
        </MapContainer>
        {!isPolygonEmpty && (
          <Button
            variant='contained'
            size='small'
            type='button'
            style={{
              position: "absolute",
              top: "10%",
              right: "5%",
              zIndex: "100",
              width: "74px",
            }}
            onClick={removeLastPointFromMap}
          >
            remove
          </Button>
        )}
        {!isPolygonEmpty && (
          <Button
            variant='contained'
            size='small'
            type='button'
            style={{
              position: "absolute",
              top: "18%",
              right: "5%",
              zIndex: "100",
              width: "74px",
            }}
            onClick={removeAllPointsFromMap}
          >
            reset
          </Button>
        )}
      </section>
    </>
  );
};

export default Regions;
