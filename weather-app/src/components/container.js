import Article from "./article";

const Container = ({ location }) => {
  let now = new Date();
  let year = now.getFullYear();
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  let date = ("0" + now.getDate()).slice(-2);

  let formattedDate = `${year}년 ${month}월 ${date}일`;
  
  return (
    <div style={{ minWidth: 1100, height: "100vh" }}>
      <h2>{formattedDate}</h2>
      <Article location={location} />
    </div>
  );
};

export default Container;
