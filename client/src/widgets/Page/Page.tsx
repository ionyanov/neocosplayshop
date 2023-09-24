import { FC, ReactNode } from 'react';

interface PageProps {
    children: ReactNode;
}

export const Page: FC<PageProps> = (props) => {
    return <main>{props.children}</main>;
};
