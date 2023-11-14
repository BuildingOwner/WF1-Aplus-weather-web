import FavorateWeek from "./week/favorate-week";
import Week from "./week/week";
import NewsMain from "./news/NewsMain"
import Main from "./Main/Main"

const Article = ({location}) => {
  return (
    <>
      <FavorateWeek location={location} />
      <Week location={location} />
      <NewsMain />
      <Main />
    </>
  );
};

export default Article;
