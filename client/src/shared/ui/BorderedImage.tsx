import React, { FC } from 'react';
import { Box, CardMedia, styled } from '@mui/material';

export enum BorderColor {
    PINK = '/images/border_pink.png',
    GREEN = '/images/border_green.png',
    WHITE = '/images/border_white.png',
}

interface BorderedImageProps {
    content: string;
    variant?: BorderColor | undefined;
    title?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    border?: number | undefined;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const options = {
    shouldForwardProp: (prop: string) => {
        return prop !== 'border' && prop !== 'img';
    },
};
const BorderedBox = styled(
    Box,
    options,
)(({ theme, border, defaultValue }) => ({
    border: `${border}px solid`,
    borderImageSlice: 100,
    borderImageSource: `url(${defaultValue})`,
    borderImageWidth: `${border * 3}px`,
    borderRadius: '1vw',
}));

export const BorderedImage: FC<BorderedImageProps> = (props) => {
    const {
        content,
        variant = BorderColor.GREEN,
        title,
        width,
        height,
        border = 10,
        onClick,
    } = props;

    return (
        <BorderedBox component={'div'} defaultValue={variant} border={border}>
            <CardMedia
                component="img"
                image={content}
                width={width}
                height={height}
                alt={title}
                style={props.style}
                onClick={props.onClick}
                loading="lazy"
            />
        </BorderedBox>
    );
};
