import React, { useState } from "react";
import Modal from "react-modal";
import "../../css/news/NewsItem.css";

const getDate = (pubDate) => {
  let date = new Date(pubDate);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더하고, 항상 두 자리 숫자를 유지하기 위해 slice를 사용
  let day = ("0" + date.getDate()).slice(-2); // 일자가 한 자리일 경우를 대비하여 항상 두 자리 숫자를 유지

  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let seconds = ("0" + date.getSeconds()).slice(-2);

  let formattedDate = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};
const NewsItem = ({ article }) => {
  let { title, description, originallink, pubDate } = article;
  const regex = /(<([^>]+)>|&.*?;)/gi;
  title = title.replace(regex, "");
  description = description.replace(regex, "");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLinkClick = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  return (
    <div className="NewsItemBlock">
      <div className="newsItem-contents">
        <h2 className="box">
          <a href={originallink} onClick={handleLinkClick} className="aBox">
            {title}
          </a>
        </h2>
        <p>{getDate(pubDate)}</p>
        <p>{description}</p>
        <hr></hr>
      </div>

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)} // 모달창 바깥을 클릭하면 모달창이 닫힙니다
        contentLabel="News Article"
        style={{
          content: {
            width: "1200px", // 모달창의 너비를 1200px로 설정
            height: "800px", // 모달창의 높이를 800px로 설정
            margin: "auto", // 모달창을 화면 가운데에 위치시킴
          },
        }}
      >
        <div className="news-modal-top">
        <h2>
          <a href={originallink} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <button type="button" class="btn btn-primary" onClick={() => setModalIsOpen(false)}>Close</button>{" "}
        </div>
        {/* Close 버튼을 클릭하면 모달창이 닫힙니다 */}
        <iframe
          src={originallink}
          width="100%"
          height="80%"
          title="News Article"
          onError={(e) => {
            e.target.outerHTML = `<p>This site blocks iframe. Please visit the site directly.</p>
                          <a href=${originallink} target="_blank" rel="noopener noreferrer">Go to the site</a>`;
          }}
        />
      </Modal>
    </div>
  );
};

export default NewsItem;
