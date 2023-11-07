import "./App.css";
import axios from "axios";
const API_KEY =
  "kBh2w8EFuGTQaSF%2B%2BEz778m7MKFahDXOcOENF6SBaT82ElY8sEzbx13hFtLTgLD5uEUS0ZUWheRYLWE5bZfaGw%3D%3D";

function App() {
  const url =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst"; /*URL*/
  let queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + API_KEY; /*Service Key*/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("1000"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("dataType") +
    "=" +
    encodeURIComponent("JSON"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("base_date") +
    "=" +
    encodeURIComponent("20231107"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("base_time") +
    "=" +
    encodeURIComponent("1500"); /**/
  queryParams +=
    "&" + encodeURIComponent("nx") + "=" + encodeURIComponent("60"); /**/
  queryParams +=
    "&" + encodeURIComponent("ny") + "=" + encodeURIComponent("127"); /**/
  // xhr.open("GET", url + queryParams);
  // xhr.onreadystatechange = () => {
  //   if (xhr.readyState === xhr.DONE) {
  //     xhr.status === 200 || xhr.status === 201
  //       ? console.log(JSON.parse(xhr.response))
  //       : console.error(xhr.response);
  //   }
  // };

  // xhr.send("");

  axios
    .get(url + queryParams)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

  return <div className="App"></div>;
}

export default App;
