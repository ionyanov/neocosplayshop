import {
    type FC,
    type MutableRefObject,
    type ReactNode,
    type UIEventHandler,
    useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/hooks/useThrottle/useThrottle';
import { getPageScrollByPath } from '../model/selectors/pageSelectors';
import { pageAction } from '../model/slices/pageSlice';
import cls from './Page.module.scss';
import {StateSchema} from "@/app/providers/StoreProvider";

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = (props) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const location = useLocation();
    const scroll = useSelector((state: StateSchema) =>
        getPageScrollByPath(state, location.pathname),
    );

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: props.onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scroll;
    });

    const onScroll: UIEventHandler<HTMLElement> = useThrottle((event) => {
        dispatch(
            pageAction.setScrollPosition({
                path: location.pathname,
                scroll: event.currentTarget.scrollTop,
            }),
        );
    }, 500);

    return (
        <main
            onScroll={onScroll}
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [props.className])}
            data-testid={props['data-testid'] ?? 'Page'}>
            {props.children}
            {props.onScrollEnd && (
                <div className={cls.trigger} ref={triggerRef} />
            )}
        </main>
    );
};
