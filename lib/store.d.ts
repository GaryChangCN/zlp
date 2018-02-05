declare class Store {
    store: {
        [props: string]: any;
    };
    private subscribes;
    protected setStore(path: any, value: any): void;
    subscribe(event: string, handle: () => void): void;
    unsubscribe(event: string, handle: () => void): void;
    protected emit(event: string): void;
}
export default Store;
