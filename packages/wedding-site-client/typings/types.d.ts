declare module "*.png" {
    const href: string;
    export = href;
}

declare module "*.jpg" {
    const href: string;
    export = href;
}

declare module '*.less' {
    const classes: any;
    export = classes;
}

declare module '*.css' {
    const exp: {};
    export = exp;
}