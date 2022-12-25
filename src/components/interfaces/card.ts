interface Card<T> {
    title: string;
    price: number;
    sale: boolean;
    img: string;
    hoverImg?: string;
    category: string;
    count: number;
    year: T;
    color: string;
    production: string;
    connection: string;
    id: string;
}

export default Card;
