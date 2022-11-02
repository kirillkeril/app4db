import { Clothes } from "../classes/Clothes";
import { Food } from "../classes/food";
import { Medicines } from "../classes/medicines";
import { Other } from "../classes/other";

export interface IData {
    clothes: Clothes[];
    medicines: Medicines[];
    food: Food[];
    other: Other[];
}