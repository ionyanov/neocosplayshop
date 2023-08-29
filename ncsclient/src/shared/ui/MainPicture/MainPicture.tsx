import * as React from 'react';
import { FC } from 'react';
import Box from '@mui/material/Box';

interface MainPictureProps {
}

export const MainPicture: FC<MainPictureProps> = (props) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '700px',
                padding: 0,
                margin: 0,
                backgroundImage: 'url(\'/image/maintitle.png\')',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
            }}
            zIndex={-10}
        >
        </Box>
    );
};