// api.js
import axios from 'axios';
import { serviceKey } from '../../private/key'; // API 키 import
import { parseStringPromise } from 'xml2js'; // xml을 파싱하기 위한 라이브러리

export const fetchData = async () => {
  const apiUrl = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=전국&pageNo=1&numOfRows=649&returnType=xml&serviceKey=${serviceKey}&ver=1.0`;
  const response = await axios.get(apiUrl);
  const data = await parseStringPromise(response.data); // xml 데이터를 json 형태로 파싱

  // 선택할 sidoName의 리스트
  const sido = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "세종"];

  // 각 sidoName에 대해 원하는 item을 찾습니다.
  const selectedItems = sido.map(sidoName => {
    return data.response.body[0].items[0].item.find(item => item.sidoName[0] === sidoName);
  });

  localStorage.setItem('data', JSON.stringify(selectedItems)); // 결과를 로컬 스토리지에 저장
  return selectedItems;
}
