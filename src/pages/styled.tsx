import { HTMLAttributes, forwardRef } from 'react';
import { styled } from '@mui/system';
import { motion,MotionProps } from 'framer-motion';
import {MusicItem} from "./ListItem.tsx";


type ListItemInnerProps = HTMLAttributes<HTMLDivElement> & MotionProps & {
    value: MusicItem;
};

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 64px;
  background: #2b2b2b;
  user-select: none;
`;

const SwipeableContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ListItemInner = styled('div')<ListItemInnerProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 8px 12px;
  background: #2b2b2b;
`;

const ListItemContent = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;
`;

const ThumbnailWrapper = styled('div')`
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  overflow: hidden;
`;

const Thumbnail = styled('img')`
  display: block;
  height: 100%;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const Descriptions = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled('p')`
  font-weight: bold;
  color: white;
  line-height: 1;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

const SubDescriptions = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const Description = styled('p')`
  color: lightgray;
`;

const Dot = styled('div')`
  width: 4px;
  min-width: 4px;
  max-height: 4px;
  height: 4px;
  min-height: 4px;
  max-width: 4px;
  border-radius: 100%;
  background: lightgray;
`;

const DraggableButton = styled('button')`
  width: 24px;
  height: 100%;
  cursor: grab;
`;

const DeleteButton = styled(motion.div)`
  display: grid;
  place-content: center;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 64px;
  aspect-ratio: 1 /1;
  background: red;
`;

const DeleteLabel = styled(motion.p)`
  color: white;
  font-size: 14px;
  font-weight: 300;
`;

const ListItemInnerComponent = forwardRef<HTMLDivElement, ListItemInnerProps>(({ value, ...props }, ref) => (
    <ListItemInner value={value} {...props} ref={ref} />
));

export {
    Container,
    SwipeableContainer,
    ListItemInnerComponent as ListItemInner,
    ListItemContent,
    ThumbnailWrapper,
    Thumbnail,
    Descriptions,
    Title,
    SubDescriptions,
    Description,
    Dot,
    DraggableButton,
    DeleteButton,
    DeleteLabel,
};