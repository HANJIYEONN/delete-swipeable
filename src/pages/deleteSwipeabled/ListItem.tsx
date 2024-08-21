/** React */
import React, { useEffect, useState } from 'react';

/** Styled Component */
import {
    Container,
    SwipeableContainer,
    ListItemInner,
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
    DeleteLabel, DeleteButton2,
} from './styled.tsx';

/** Animate */
import {
    MotionConfig, MotionValue,
    useAnimate,
    useDragControls,
    useMotionValue,
    useTransform,
} from 'framer-motion';

import {
    containerVariants,
    deleteButtonVariants,
    deleteLabelVariants,
    swipeableContainerVariant,
} from './animationVariants.ts';

/** Lib */
import useMeasure from 'react-use-measure';

/** Type */
export type MusicItem = {
    id: number;
    thumbnail?: string;
    title?: string;
    singer?: string;
    musicDuration?: number;
};


/** Constant */
const bgColor = {
    normal: '#2b2b2b',
    lighter: '#3a3a3a',
    highlight: '#525252',
};

type ListItemProp = {
    value: MusicItem;
    onRequestDelete: (id: number) => void;
};

const ListItem = ({ value, onRequestDelete }: ListItemProp) => {
    const { id, thumbnail, title, singer, musicDuration } = value;

    const [bgColorAnimateRef, animateBgColor] = useAnimate();
    const [swipeAnimateRef, animateSwipe] = useAnimate();

    const swipeDragControls = useDragControls();
    const reorderDragControls = useDragControls();

    const [deleteButtonRef, { width: deleteButtonWidth }] = useMeasure();


    const itemX = useMotionValue(0);
    const backgroundColor = useTransform(
        itemX,
        [-deleteButtonWidth, 0, deleteButtonWidth],
        [bgColor.lighter, bgColor.normal, bgColor.lighter]
    ) as string & MotionValue<any>;

    const [isDeleteShow, setIsDeleteShow] = useState(false);
    const deleteAnimateState = isDeleteShow ? 'appear' : 'disappear';

    useEffect(() => {
        itemX.on('change', (v) => {
            const isOverThreshold = v < -deleteButtonWidth / 2;
            setIsDeleteShow(isOverThreshold);
        });
    }, [itemX, deleteButtonWidth]);



    const handleDragEnd = () => {
        const isOverThreshold = itemX.get() < -deleteButtonWidth / 2;
        const isOverThresholdRight = itemX.get() > deleteButtonWidth / 2;

        if (isOverThreshold) {
            animateSwipeToLeft();
        }else if(isOverThresholdRight){
            animateSwipeToRight();
        } else {
            animateSwipeToOrigin();
        }
    };

    const handleDraggableButtonPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {

        if (isDeleteShow) return;

        reorderDragControls.start(e);
        animateBgColorToHighlight(true);
    };

    //땡겼다가 놓았을때 뒤에 보이는 공간
    const animateSwipeToLeft = () => animateSwipe(swipeAnimateRef.current, { x: -deleteButtonWidth*2.4 });
    const animateSwipeToRight = () => animateSwipe(swipeAnimateRef.current, { x: deleteButtonWidth });

    const animateSwipeToOrigin = () => animateSwipe(swipeAnimateRef.current, { x: 0 });

    const animateBgColorToHighlight = (wouldDelay: boolean = false) =>
        animateBgColor(
            bgColorAnimateRef.current,
            { backgroundColor: bgColor.highlight },
            { delay: wouldDelay ? 0.2 : 0 }
        );

    const animateBgColorToNormal = () => {
        animateBgColor(bgColorAnimateRef.current, {backgroundColor: bgColor.normal});
    }
    return (
        <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
            <Container exit="exit" variants={containerVariants}>
                {/*삭제버튼 */}
                <DeleteButton
                    initial="disappear"
                    animate={deleteAnimateState}
                    variants={deleteButtonVariants}
                    onClick={() => onRequestDelete(id)}
                    ref={deleteButtonRef}
                >
                    <DeleteLabel variants={deleteLabelVariants}>개인삭제</DeleteLabel>
                </DeleteButton>
                <DeleteButton2
                    initial="disappear"
                    animate={deleteAnimateState}
                    variants={deleteButtonVariants}
                    onClick={() => onRequestDelete(id)}
                    ref={deleteButtonRef}
                >
                    <DeleteLabel variants={deleteLabelVariants}>삭제2</DeleteLabel>
                </DeleteButton2>
                <SwipeableContainer
                    style={{ x: itemX }}
                    variants={swipeableContainerVariant}
                    drag="x"
                    dragControls={swipeDragControls}
                    dragListener={false}
                    dragConstraints={{ left: -deleteButtonWidth*2.5,right: deleteButtonWidth }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    ref={swipeAnimateRef}
                >
                    <ListItemInner
                        style={{ backgroundColor }}
                        value={value}
                        dragControls={reorderDragControls}
                        dragListener={false}
                        onDrag={() => animateBgColorToHighlight()}
                        onDragEnd={() => animateBgColorToNormal()}
                        ref={bgColorAnimateRef}
                    >
                        {/*이미지+제목*/}
                        <ListItemContent onPointerDown={(e) => swipeDragControls.start(e)}>
                            <ThumbnailWrapper>
                                <Thumbnail src={thumbnail} />
                            </ThumbnailWrapper>
                            <Descriptions>
                                <Title>{title}</Title>
                                <SubDescriptions>
                                    <Description>{singer}</Description>
                                    <Dot />
                                    <Description>{formatDate(musicDuration || 0)}</Description>
                                </SubDescriptions>
                            </Descriptions>
                        </ListItemContent>
                        {/*드래그버튼*/}
                        <DraggableButton
                            onPointerDown={handleDraggableButtonPointerDown}
                            onPointerUp={() => animateBgColorToNormal()}
                            // drag="y" // y축으로만 움직일 수 있게 설정
                        />
                    </ListItemInner>
                </SwipeableContainer>
            </Container>
        </MotionConfig>
    );
};

const formatDate = (duration: number) => {
    const min = Math.floor(duration / 60);
    const sec = duration % 60;

    return `${min}:${sec.toString().padStart(2, '0')}`;
};

export default ListItem;
