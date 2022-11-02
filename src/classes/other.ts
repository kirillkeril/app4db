import { IOther } from "../interfaces/other";
import { Item } from "./Item";

export class Other extends Item implements IOther {
    description: string;
    constructor(id: number, title: string, amount: string, weight: number, boxNum: number = -1, date: string, description: string) {
        super(id, title, amount, weight, boxNum, date);
        this.description = description;
    }
}