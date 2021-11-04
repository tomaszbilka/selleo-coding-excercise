const RegionsList = (props) => {
  return (
    <>
      <ul>
        {props.list.map((el) => {
          return <li>{el.name}</li>;
        })}
      </ul>
    </>
  );
};

export default RegionsList;
