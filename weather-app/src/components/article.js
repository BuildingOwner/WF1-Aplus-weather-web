import FavorateWeek from "./favorate-week";
import Week from "./week";

const Article = ({location}) => {
  return (
    <>
      <FavorateWeek location={location} />
      <Week location={location} />
    </>
  );
};

export default Article;
