import * as React from 'react';
import { FC } from 'react';
import Box from '@mui/material/Box';

interface MainPictureProps {}

export const MainPicture: FC<MainPictureProps> = (props) => {
    return (
        <Box
            sx={{
                width: '100%',
                padding: 0,
                margin: 0,
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                backgroundImage: "url('/image/fone_logo.png')",
                backgroundPosition: 'top',
                backgroundRepeat: 'repeat-x',
                backgroundOrigin: 'content-box',
                backgroundSize: 'contain',
            }}
            zIndex={-10}>
            <img
                src={'/image/maintitle.png'}
                style={{ width: '50%', minHeight: '50px', minWidth: '200px' }}
            />
        </Box>
    );
};
