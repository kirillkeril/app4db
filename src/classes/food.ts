import { IFood } from "../interfaces/food";
import { Item } from "./Item";

export class Food extends Item implements IFood {
    expiration_date: string;
    constructor(id: number, title: string, amount: string, weight: number, boxNum: number = -1, date: string, expiration_date: string) {
        super(id, title, amount, weight, boxNum, date);
        this.expiration_date = expiration_date;
    }
}