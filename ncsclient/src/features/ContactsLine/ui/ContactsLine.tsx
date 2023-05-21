import {FC} from "react";
import cls from './ContactsLine.module.scss';
import {HStack} from "../../../shared/ui/Stack";

interface ContactsLineProps {
    className?: string
}

export const ContactsLine: FC<ContactsLineProps> = (props) => {
    return (
        <HStack className={cls.ContactsLine} gap={'16'}>
            <a href={'sdfsd'}>Инста</a>
            <a href={'sdfsd'}>Бусти</a>
            <a href={'sdfsd'}>Майл</a>
        </HStack>
    );
};