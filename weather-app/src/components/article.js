import FavorateWeek from "./week/favorate-week";
import Week from "./week/week";

const Article = ({location}) => {
  return (
    <>
      <FavorateWeek location={location} />
      <Week location={location} />
    </>
  );
};

export default Article;
