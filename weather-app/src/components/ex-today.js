import useTodayWeather from "../hooks/useTodayWeather"

const ExToday = () => {
  const {skys, temps, rains} = useTodayWeather(123);
  console.log(skys)
  console.log(temps)
  console.log(rains)
  return(
    <div></div>
  )
}

export default ExToday