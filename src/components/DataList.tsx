import { Accordion, AccordionDetails, AccordionSummary, Button, ListItem } from '@mui/material';
import List from '@mui/material/List';
import axios from 'axios';
import { Clothes } from '../classes/Clothes';
import { Food } from '../classes/food';
import { Item } from '../classes/Item';
import { Medicines } from '../classes/medicines';
import { Other } from '../classes/other';
import { IData } from '../interfaces/data';
import { IBox } from '../interfaces/IBox';
import { ItemElem } from './Item';
import {Warehouse} from './Warehouse';
 
interface DataListProps {
    boxes: IBox[],
    setBoxes: (box: IBox[]) => any,
    data: IData,
    setData: (data: IData) => any,
    clothes: Clothes[],
    food: Food[],
    medicines: Medicines[],
    other: Other[],
    fetchData: () => any
}

export const DataList = ({clothes, food, medicines, other, setData, data, boxes, setBoxes, fetchData}: DataListProps) => {
    function weight(data: Item[]) {
        let w = 0;
        data.map(i => {
            w += i.weight * parseFloat(i.amount);
        });
        return w;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>Коробки</h2>
            <div>
                {boxes.map(b => {
                    const items: Item[] = [...b.clothes, ...b.food, ...b.medicines, ...b.other];
                        return (
                            <Accordion>
                                <AccordionSummary>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        Коробка №{b.boxNumber}
                                        Вес: {weight([...b.clothes, ...b.food, ...b.medicines, ...b.other])}
                                    </div>                                
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>{b.description}</div>
                                    <List>
                                        {items.map(i => {
                                            return(
                                                <ItemElem i={i} onSave={() => fetchData()}/>
                                            );
                                        })}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        );
                })}
                <Button
                    onClick={async () => {
                        await axios.post('http://localhost:8000/api/new_box/', {
                            boxNumber: 1,
                            isPacked: false,
                            description: 'HFKJhf'
                        });
                        await fetchData();
                    }}
                >
                        Добавить коробку
                </Button>
            </div>
            <h2>Склад</h2>
            <div>
                <Warehouse onSave={fetchData} clothes={clothes} data={data} food={food} medicines={medicines} other={other} setData={setData}></Warehouse>
            </div>
        </div>
            
    );
}