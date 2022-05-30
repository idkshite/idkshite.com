import {ReactNode} from "react";

export function Link ({url, children = url, openInNewTab = true}: {url: string, children?: string | ReactNode | ReactNode[], openInNewTab?: boolean}){
    return <a href={url} target={openInNewTab ? "_blank" : "_self"}>{children}</a>
}