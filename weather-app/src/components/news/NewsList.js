import styled from 'styled-components';
import NewsItem from './NewsItem';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import NaverId from '../../private/NaverId';
import NaverSecretKey from '../../private/NaverSecretKey';
import "../../css/news/NewsList.css";

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px){
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = ()=>{
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageNeighbours = 2; // 현재 페이지 양옆에 표시될 페이지 수

    useEffect(()=>{
        const query ="%EB%82%A0%EC%94%A8%EC%98%88%EB%B3%B4";
        const fetchData = async ()=>{
            setLoading(true);
            try{
                const response = await axios.get(`/api/v1/search/news.json?query=${query}&display=10&start=${currentPage}`,{
                    headers:{
                        'X-Naver-Client-Id': NaverId,
                        'X-Naver-Client-Secret': NaverSecretKey
                    }
                });
                setArticles(response.data.items);
                setTotalPages(Math.ceil(response.data.total / 10)); // 전체 페이지 수 계산
            }catch(e){
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    },[currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    if(loading){
        return <NewsListBlock>대기 중...</NewsListBlock>
    }

    if(!articles){
        return null;
    }

    const startPage = Math.max(1, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages, currentPage + pageNeighbours);
    const pages = [...Array((endPage - startPage) + 1).keys()].map(i => startPage + i);

    return(
        <NewsListBlock>
            {articles.map((article,index)=>(
                <NewsItem key={index} article={article}/>
            ))}
            <div>
                {currentPage !== 1 && <button onClick={() => handlePageChange(1)}>첫 페이지</button>}
                {currentPage > 1 && <button onClick={() => handlePageChange(currentPage - 1)}>이전</button>}
                {/* 페이지네이션 버튼들 */}
                {pages.map((number) => (
                    <button key={number} onClick={() => handlePageChange(number)}
                        className={currentPage === number ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
                {currentPage < totalPages && <button onClick={() => handlePageChange(currentPage + 1)}>다음</button>}
                {currentPage !== totalPages && <button onClick={() => handlePageChange(totalPages)}>마지막 페이지</button>}
            </div>
        </NewsListBlock>
    );
};

export default NewsList;
