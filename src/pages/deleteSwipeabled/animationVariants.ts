const opacityIn = { opacity: 1 };
const opacityOut = { opacity: 0 };
const zeroHeight = { height: 0 };
const scaleIn = { scale: 1 };
const scaleOut = { scale: 0 };
const zeroX = { x: 0 };

export const containerVariants = { exit: { ...opacityOut, ...zeroHeight } };

export const deleteButtonVariants = {
    appear: { ...opacityIn },
    disappear: { ...opacityOut },
    exit: { ...opacityOut },
};

export const deleteLabelVariants = {
    appear: { ...scaleIn },
    disappear: { ...scaleOut },
    exit: { ...opacityOut },
};

export const swipeableContainerVariant = { exit: { ...zeroX } };
