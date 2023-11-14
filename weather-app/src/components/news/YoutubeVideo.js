import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YoutubeKey from '../../private/YoutubeKey';
const YoutubeVideo = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        
        const key = YoutubeKey;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLhCGd1zCbu3mEeaJjTdtWdalOUi4gTI6U&key=${key}&maxResults=6`;

        axios.get(url)
            .then(response => {
                setVideos(response.data.items);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div>
            {videos.map(video => (
                <div key={video.snippet.resourceId.videoId} style={{ margin: '36px 0' }}>
                    <iframe
                        title='video'
                        width="540"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ))}
        </div>
    );
};

export default YoutubeVideo;
