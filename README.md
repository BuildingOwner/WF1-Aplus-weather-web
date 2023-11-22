<h1>WebFrame Work Project</h1>
React를 이용한 웹페이지 구현

<h2>Team.A+</h2>

<h3>✋팀원 소개</h3>

* 최재완 (팀장) - 주간 날씨 구현, 
* 김민상 (팀원) - 
* 장주찬 (팀원) - 
* 이영재 (팀원) - 메인페이지 구현, CSS 구현, 

## 📄시작 가이드
__Installation__
```
npm install
```

__Backend__
```
cd backendResource
java -jar weather_WEB-1.0-SNAPSHOT.jar
```
__Frontend__
```
npm start
```

## 🔔프로젝트 소개

이 프로젝트는 사용자가 현재 위치를 기반으로 한 시간대별 오늘의 날씨, 주간 예보, 대기 상태 정보, 실시간 뉴스 등을 쉽게 확인할 수 있는 웹페이지를 제작하였습니다.

이를 통해 사용자는 언제 어디서든 필요한 날씨 정보를 실시간으로 확인할 수 있습니다.

## ✔주요 기능

### 로그인 및 회원가입 기능
* Spring을 이용하여 로그인과 회원가입 기능을 구현하였습니다. 이를 통해 사용자는 개인화된 서비스를 받을 수 있습니다.

### 실시간 날씨 정보 제공
* 단기 예보 API를 활용하여 실시간 날씨 정보를 제공합니다. 메인페이지에서는 주요 도시들의 현재 날씨를 한 눈에 확인할 수 있으며, 시간별 예보 그래프를 통해 날씨 변화를 미리 파악할 수 있습니다. 또한 강수량, 바람세기, 하늘상태 등의 다양한 정보를 제공하여 사용자가 보다 상세한 날씨 정보를 얻을 수 있습니다.

### 주간 예보 기능
* 사용자가 원하는 도시를 검색해 최대, 최저 기온과 강수확률, 하늘 상태 등의 정보를 확인할 수 있습니다. 로그인을 진행하여 저장을 할 경우 웹페이지 재방문 시 검색 없이 저장된 도시의 정보를 확인할 수 있습니다. 이를 통해 사용자는 자신이 관심 있는 도시의 날씨 변화를 쉽게 파악하고, 그에 따른 계획을 세울 수 있습니다.

### 대기 오염 정보 제공
* 전국의 대기 오염 실황 정보와 사용자가 거주하는 지역의 미세먼지, 초미세먼지, 황사, 오존 등의 데이터를 다양한 차트 형식으로 표현해 페이지에 제공합니다. 

## 구조 트리
```
📦src
 ┣ 📂components
 ┃ ┣ 📂airPollution
 ┃ ┃ ┣ 📜AirMain.js
 ┃ ┃ ┣ 📜AirQualityModal.js
 ┃ ┃ ┣ 📜api2.js
 ┃ ┃ ┣ 📜Chart.js
 ┃ ┃ ┣ 📜Chart2.js
 ┃ ┃ ┣ 📜cities.js
 ┃ ┃ ┣ 📜FineDustModal.js
 ┃ ┃ ┣ 📜Forecast.js
 ┃ ┃ ┣ 📜OzoneModal.js
 ┃ ┃ ┣ 📜SulfurModal.js
 ┃ ┃ ┣ 📜UltraFineDustModal.js
 ┃ ┃ ┗ 📜Weather.js
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜AuthForm.js
 ┃ ┃ ┣ 📜AuthTemplate.js
 ┃ ┃ ┣ 📜LoginPage.js
 ┃ ┃ ┗ 📜RegisterPage.js
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜Button.js
 ┃ ┣ 📂exponsion
 ┃ ┃ ┣ 📜ex-current.js
 ┃ ┃ ┣ 📜ex-dust-item.js
 ┃ ┃ ┣ 📜ex-dust.js
 ┃ ┃ ┣ 📜ex-today-item.js
 ┃ ┃ ┣ 📜ex-today.js
 ┃ ┃ ┣ 📜ex-week-item.js
 ┃ ┃ ┣ 📜ex-week.js
 ┃ ┃ ┗ 📜expension.js
 ┃ ┣ 📂Main
 ┃ ┃ ┣ 📜DateTime.js
 ┃ ┃ ┣ 📜MainChart.js
 ┃ ┃ ┣ 📜MainPage.js
 ┃ ┃ ┗ 📜Weather.js
 ┃ ┣ 📂news
 ┃ ┃ ┣ 📜DisasterMsgList.js
 ┃ ┃ ┣ 📜NewsItem.js
 ┃ ┃ ┣ 📜NewsList.js
 ┃ ┃ ┣ 📜NewsMain.js
 ┃ ┃ ┗ 📜YoutubeVideo.js
 ┃ ┣ 📂Sidebar
 ┃ ┃ ┗ 📜Sidebar.js
 ┃ ┣ 📂week
 ┃ ┃ ┣ 📜favorate-week.js
 ┃ ┃ ┣ 📜LocationSearchInput.js
 ┃ ┃ ┣ 📜week-item.js
 ┃ ┃ ┣ 📜week-page.js
 ┃ ┃ ┗ 📜week.js
 ┃ ┣ 📜article.js
 ┃ ┗ 📜container.js
 ┣ 📂containers
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜LoginForm.js
 ┃ ┃ ┗ 📜RegisterForm.js
 ┃ ┗ 📂common
 ┃ ┃ ┗ 📜HeaderContainer.js
 ┣ 📂css
 ┃ ┣ 📂airPollution
 ┃ ┃ ┣ 📜airMain.css
 ┃ ┃ ┣ 📜Forecast.css
 ┃ ┃ ┣ 📜Modal.css
 ┃ ┃ ┣ 📜Pollution.css
 ┃ ┃ ┗ 📜Weather.css
 ┃ ┣ 📂expension
 ┃ ┃ ┣ 📜ex-today.css
 ┃ ┃ ┣ 📜ex-week-item.css
 ┃ ┃ ┣ 📜ex-week.css
 ┃ ┃ ┣ 📜expension.css
 ┃ ┃ ┗ 📜expention-dust.css
 ┃ ┣ 📂header
 ┃ ┃ ┗ 📜DateTime.css
 ┃ ┣ 📂Main
 ┃ ┃ ┗ 📜Weather.css
 ┃ ┣ 📂news
 ┃ ┃ ┣ 📜Animation.css
 ┃ ┃ ┣ 📜NewsItem.css
 ┃ ┃ ┣ 📜NewsList.css
 ┃ ┃ ┗ 📜NewsMain.css
 ┃ ┣ 📂Sidebar
 ┃ ┃ ┗ 📜Sidebar.css
 ┃ ┣ 📂week
 ┃ ┃ ┣ 📜favorate-week.css
 ┃ ┃ ┣ 📜location-search-input.css
 ┃ ┃ ┣ 📜weather-item.css
 ┃ ┃ ┗ 📜week.css
 ┃ ┣ 📜App.css
 ┃ ┣ 📜index.css
 ┃ ┗ 📜reset.css
 ┣ 📂hooks
 ┃ ┣ 📜useCurrentDust.js
 ┃ ┣ 📜useCurrentLocation.js
 ┃ ┣ 📜useTodayWeather.js
 ┃ ┣ 📜useWeekCloud.js
 ┃ ┗ 📜useWeekTemp.js
 ┣ 📂lib
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┗ 📜client.js
 ┃ ┣ 📂styles
 ┃ ┃ ┗ 📜palette.js
 ┃ ┗ 📜createRequestSaga.js
 ┣ 📂modules
 ┃ ┣ 📜auth.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜loading.js
 ┃ ┗ 📜user.js
 ┣ 📜App.js
 ┣ 📜index.js
 ┗ 📜setupProxy.js
```
## 사용 API
[기상청_중기예보 조회서비스](https://www.data.go.kr/iim/api/selectAPIAcountView.do)

[한국환경공단_에어코리아_대기오염통계 현황](https://www.data.go.kr/iim/api/selectAPIAcountView.do)

[한국환경공단_에어코리아_대기오염정보](https://www.data.go.kr/iim/api/selectAPIAcountView.do)

[기상청_단기예보 ((구)_동네예보) 조회서비스](https://www.data.go.kr/iim/api/selectAPIAcountView.do/)



## ⌨주요 적용 기술 및 특이 사항
* __개발 도구__ : Visual Studio Code, Spring Boot, React
* __개발 언어__ : HTML5, CSS3, JavaScript, Node.js
