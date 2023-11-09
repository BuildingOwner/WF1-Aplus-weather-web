import { useWeekTemp } from '../hooks/week-temp'
import { useWeekCloud } from '../hooks/week-cloud'


const Week = () => {
  const {temps} = useWeekTemp('11B10101')
  const {rainRate, cloud} = useWeekCloud('11B10101')

  console.log(temps)
  console.log(rainRate)
  console.log(cloud)

  return <div className="Week"></div>;
}

export default Week;
