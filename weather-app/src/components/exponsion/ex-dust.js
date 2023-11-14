import "../../css/expension/expention-dust.css"
import useCurrentDust from "../../hooks/useCurrentDust";
import ExDustItem from "./ex-dust-item";

const ExDust = () => {
  const { pm10, pm25, o3, so2 } = useCurrentDust("서울");
  if (
    !pm10 ||
    !pm25 ||
    !o3 ||
    !so2 ||
    pm10 <= 0 ||
    pm25 <= 0 ||
    o3 <= 0 ||
    so2 <= 0
  )
    return <div className="week"></div>;
  const dust = [
    {val: pm10, str: '미세먼지'},
    {val: pm25, str: '초미세먼지'},
    {val: o3, str: '오존'},
    {val: so2, str: '이산화황'}
  ]
  return <div className="expention-dust">
    {dust.map((item, i)=>(<ExDustItem key={i}{...item} />))}
  </div>;
};

export default ExDust;
