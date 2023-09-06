import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import LoginForm from '@/features/Login/ui/loginForm';

const AboutPage: FC = () => {
    return (
        <Page>
            <LoginForm />
        </Page>
    );
};

export default AboutPage;
