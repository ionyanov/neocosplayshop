import { Children, FC, ReactNode } from 'react';
import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
} from '@mui/material';

class TablePageProps {
    error?: string;
    title?: string;
    children?: ReactNode;
    refresh?: () => void;
}

export const TablePage: FC<TablePageProps> = (props) => {
    return (
        <Stack direction={'column'} gap={'10px'} component={Paper}>
            {props.title && (
                <Typography width={'100%'} variant="h2" align="center">
                    {props.title}
                </Typography>
            )}
            <Stack
                direction={'row'}
                alignItems={'stretch'}
                justifyContent={'space-evenly'}>
                {props.refresh && (
                    <Button
                        size="small"
                        onClick={props.refresh}
                        variant="outlined">
                        Refresh
                    </Button>
                )}
                <Typography
                    width={'100%'}
                    sx={{ color: 'red' }}
                    variant="h4"
                    align="center">
                    {props.error}
                </Typography>
            </Stack>
            {props.children}
        </Stack>
    );
};
