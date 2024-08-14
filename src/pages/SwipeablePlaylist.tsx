/** React */
import  { useEffect, useState } from 'react';

/** Styled Component */
import { styled } from '@mui/system';
import { Reorder } from 'framer-motion';

const ListBox = styled(Reorder.Group)`
  overflow: hidden;
  height: 100%;
`;


/** Component */
import ListItem from './ListItem';

/** Animate */
import { AnimatePresence } from 'framer-motion';

/** Type */
export type MusicItem = {
    id: number;
    thumbnail?: string;
    title?: string;
    singer?: string;
    musicDuration?: number;
};


type SwipeablePlaylistProp = {
    playlist: Array<MusicItem>;
    onRequestDelete: (id: number) => void;
};

const SwipeablePlaylist = ({ playlist, onRequestDelete }: SwipeablePlaylistProp) => {
    const [playlistData, setPlaylistData] = useState(playlist);

    useEffect(() => {
        setPlaylistData([...playlist]);
    }, [playlist]);

    return (
        <ListBox axis="y" values={playlistData} onReorder={(newOrder) => setPlaylistData(newOrder as MusicItem[])}>
            <AnimatePresence>
                {playlistData.map((value) => (
                    <ListItem key={value.id} value={value} onRequestDelete={onRequestDelete} />
                ))}
            </AnimatePresence>
        </ListBox>
    );
};

export default SwipeablePlaylist;
