/// <reference types="react" />
import * as React from 'react';
import Store from './store';
export default function connect(stores: Store[]): (Component: React.ReactType<any>) => {
    new (props: any): {
        componentWillMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends string>(state: any, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        state: Readonly<any>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, prevContext: any): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    };
};
