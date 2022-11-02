export class Item {
    public id: number;
    public title: string; 
    public amount: string;
    public weight: number;
    public boxNum: number;
    public date: string;
    constructor(id: number, title: string, amount: string, weight: number, boxNum: number = -1, date: string) {
        this.id = id
        this.title = title
        this.amount = amount
        this.weight = weight
        this.boxNum = boxNum
        this.date = date
    }
}