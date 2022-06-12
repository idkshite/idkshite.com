import {ReactNode} from "react";

export function Link ({url, children = url, openInNewTab = true, className}: {url: string, children?: string | ReactNode | ReactNode[], openInNewTab?: boolean, className?:string}){
    return <a className={`text-xl inline-block mb-3 leading-9 ${className}`} href={url} target={openInNewTab ? "_blank" : "_self"}>{children}</a>
}
