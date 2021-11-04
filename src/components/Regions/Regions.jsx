import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Regions.module.css";
import { MapContainer, TileLayer, Polygon, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MyComponent(props) {
  useMapEvent("click", (event) => {
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

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Polygon positions={polygon} />
        <MyComponent setPolygon={setPolygon} />
      </MapContainer>
    </>
  );
};

export default Regions;
