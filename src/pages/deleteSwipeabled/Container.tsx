import {Box} from "@mui/material";
import { useState } from "react";

import SwipeablePlaylist from "./SwipeablePlaylist.tsx";


const playlist = [
    {
        id: 0,
        thumbnail:
            'https://image.bugsm.co.kr/album/images/200/201995/20199577.jpg?version=20181019003428.0',
        title: "Someone's shining 누군가의 빛나던",
        singer: '위수',
        musicDuration: 180 + 57,
    },
    {
        id: 1,
        thumbnail:
            'https://i.ytimg.com/vi/UCQHgJ4uRwo/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDovxuI6hDoEAyMXYJHHSVyDfs8Tg',
        title: '지구가 태양을 네 번(Live)',
        singer: '아이유(IU)',
        musicDuration: 180 + 50,
    },
    {
        id: 2,
        thumbnail: 'https://images.genius.com/ccf4eeed94de3a8d745dc0d37770856a.1000x1000x1.png',
        title: 'Whisper',
        singer: '김수영',
        musicDuration: 90 + 45,
    },
    {
        id: 3,
        thumbnail: 'https://image.bugsm.co.kr/album/images/500/205692/20569260.jpg',
        title: '시간이 어지러울 만큼 빠르게 지나가',
        singer: '박소은',
        musicDuration: 180 + 54,
    },
];


const Container = () => {
    const [myPlaylist, setMyPlaylist] = useState(playlist);

    const handleDelete = (id: number) => {
        setMyPlaylist(myPlaylist.filter((music) => music.id !== id));
    };

    return (
        <Box sx={{display: 'flex', width:'90vw', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
            <SwipeablePlaylist playlist={myPlaylist} onRequestDelete={handleDelete} />
        </Box>
    );
}


// const Box = styled.div`
//   width: 90vw;
//   max-width: 500px;
//   height: 70dvh;
//   border-radius: 12px;
//   box-shadow: 0 0 50px 1px rgba(255, 255, 255, 0.1);
//   background: #2b2b2b;
//   overflow: hidden;
//   padding: 12px 0;
// `;

export default Container;