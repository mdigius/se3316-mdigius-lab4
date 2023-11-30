import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    href?: string;
}
// Interface to hold superhero data
export interface SuperheroData {
    id: number;
    name: string;
    Gender: string;
    "Eye color": string;
    Race: string;
    "Hair color": string;
    Height: number;
    Publisher: string;
    "Skin color": string;
    Alignment: string;
    Weight: number;
  }

export interface AuthManager {
    username: string;
    signedIn: boolean;
}

export interface SuperheroResultProps {
    superheroData: SuperheroData;
}