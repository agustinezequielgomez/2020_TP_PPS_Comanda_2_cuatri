export interface HomeScreenCard {
    title: string;
    redirectTo: string;
    color: 'primary' | 'secondary';
    imgPath: string;
}

export type HomeScreenCards = HomeScreenCard[];