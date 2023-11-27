import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    href?: string;
}

export interface SuperheroResultProps {
    heroName: string;
    heroInfo: string;
    url: string;
}