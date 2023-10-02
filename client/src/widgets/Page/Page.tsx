import { MainPicture } from '@/shared/ui';
import { Container } from '@mui/material';
import { FC, ReactNode, useState } from 'react';

interface PageProps {
    children: ReactNode;
    showImg?: boolean;
}

export const Page: FC<PageProps> = (props) => {
    return (
        <main>
            {props.showImg && <MainPicture />}
            <Container maxWidth="xl">{props.children}</Container>
        </main>
    );
};
