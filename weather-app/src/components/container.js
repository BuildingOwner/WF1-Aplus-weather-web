import Article from "./article";
import DateTime from "./Main/DateTime"

const Container = ({ location }) => {
  
  return (
    <div style={{ minWidth: 1100, height: "100vh" }}>
      <DateTime />
      <Article location={location} />
    </div>
  );
};

export default Container;
