import React from 'react';
import YoutubeVideo from './YoutubeVideo';
import NewsList from './NewsList';
import DisasterMsgList from './DisasterMsgList';
import '../../css/news/NewsMain.css';

const NewsMain = () => {
    return (
        <>
        <h1>재난 특보</h1>
            <DisasterMsgList/>  
            <hr></hr>
            <h1>날씨 뉴스</h1>
        <div className="main-container">
            <div className="youtube-container">
                <YoutubeVideo />
            </div>
            <div className="news-container">
                
                <NewsList />
            </div>
        </div>
        </>
    );
};

export default NewsMain;
