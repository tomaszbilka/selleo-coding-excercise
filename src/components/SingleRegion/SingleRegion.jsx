import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { Button } from "@mui/material";
import { useContext } from "react";
import { RegionContext } from "../../store";
import { useNavigate } from "react-router-dom";

const SingleRegion = () => {
  const { id } = useParams();
  const ctx = useContext(RegionContext);

  let navigate = useNavigate();

  const regionToShow = ctx.filter((el) => el.id === +id);
  const name = regionToShow[0].name;
  const description = regionToShow[0].description;
  const polygon = regionToShow[0].polygon;

  const editSingleRegion = () => {
    navigate(`/edit-region/${id}`);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <h3>Single region</h3>
        <h5>Region name: </h5>
        <p>{name}</p>
        <h5>Description: </h5>
        <p>{description}</p>
        <Button
          variant='contained'
          type='button'
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            zIndex: "100",
          }}
          onClick={editSingleRegion}
        >
          Edit region
        </Button>
      </div>
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
      </MapContainer>
    </>
  );
};

export default SingleRegion;
