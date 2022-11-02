import { IMedicines } from "../interfaces/medicines";
import { Item } from "./Item";

export class Medicines extends Item implements IMedicines {
    appointment: string;
    constructor(id: number, title: string, amount: string, weight: number, boxNum: number = -1, date: string, appointment: string) {
        super(id, title, amount, weight, boxNum, date);
        this.appointment = appointment;
    }
}