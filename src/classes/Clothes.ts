import { IClothes } from "../interfaces/clothes";
import { Item } from "./Item";

export class Clothes extends Item implements IClothes{
    gender: string;
    size: string;
    constructor(id: number, title: string, amount: string, weight: number, boxNum: number = -1, date: string, gender: string, size: string) {
        super(id, title, amount, weight, boxNum, date);
        this.size = size;
        this.gender = gender;
    }
}