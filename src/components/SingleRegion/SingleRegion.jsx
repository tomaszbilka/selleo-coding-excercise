import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';

const SingleRegion = (props) => {
  const { id } = useParams();

  const regionToShow = props.list.filter((el) => el.id === +id);
  const name = regionToShow[0].name;
  const description = regionToShow[0].description;
  const polygon = regionToShow[0].polygon;

  return (
    <>
      <h5>Region name: </h5>
      <p>{name}</p>
      <h5>Description: </h5>
      <p>{description}</p>

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '500px' }}
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
