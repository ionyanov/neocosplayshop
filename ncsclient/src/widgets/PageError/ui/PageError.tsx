import { type FC, memo } from 'react';
import { Box, Typography } from '@mui/material';

interface PageErrorProps {
}

export const PageError: FC<PageErrorProps> = memo((props: PageErrorProps) => {
    const reloadPage: () => void = () => {
        location.reload();
    };

    return (
        <Box>
            <Typography align={'center'} variant={'h4'}>
                Sorry, we have a problem.
            </Typography>
            <button onClick={reloadPage}>{'Reload'}</button>
        </Box>
    );
});

PageError.displayName = 'PageError';
