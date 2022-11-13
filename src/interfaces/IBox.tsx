import { Clothes } from "../classes/Clothes"
import { Food } from "../classes/food"
import { Medicines } from "../classes/medicines"
import { Other } from "../classes/other"

export interface IBox {
    id: number
    description: string
    boxNumber: number
    isPacked: false
    clothes: Clothes[]
    food: Food[]
    medicines: Medicines[]
    other: Other[]
}