import Article from "./article";

const Container = ({location}) => {
  return (
    <div style={{minWidth: 1100, height: "100vh"}}>
      <h2>header bar</h2>
      <Article location={location} />
    </div>
  );
};

export default Container;
