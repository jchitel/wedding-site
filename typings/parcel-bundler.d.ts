declare module 'parcel-bundler' {
    import { Server } from 'http';

    interface BundlerOptions {
        hmrPort?: number;
        outDir?: string;
        target?: 'browser' | 'node' | 'electron';
    }

    class Bundler {
        constructor(main: string, options?: BundlerOptions);
        bundle(): Promise<{}>; // TODO: return value
        serve(port?: number, https?: boolean): Promise<Server>;
    }

    export = Bundler;
}
