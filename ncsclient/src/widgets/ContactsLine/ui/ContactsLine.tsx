import { FC } from 'react';
import { SettingsList } from '@/entities/Settings/ui/SettingsList';

interface ContactsLineProps {
    className?: string;
}

export const ContactsLine: FC<ContactsLineProps> = (props) => {
    return (
        <SettingsList />
    );
};