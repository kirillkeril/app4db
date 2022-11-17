import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, ListItem } from '@mui/material';
import List from '@mui/material/List';
import axios from 'axios';
import { useEffect } from 'react';
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
    const w = new Intl.NumberFormat('en-EN', {style: 'decimal', maximumFractionDigits: 2});
    function weight(data: Item[]) {
        let w = 0;
        data.map(i => {
            w += i.weight * parseFloat(i.amount);
        });
        return w;
    }

    const handleBoxUpdate = async (box: IBox) => {
        await axios.put(`https://vp-pspu.cf/api/update_box/${box.id}/`, {...box});
        fetchData();
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>Коробки</h2>
            <div>
                {boxes.map(b => {
                    const items: Item[] = [...b.clothes, ...b.food, ...b.medicines, ...b.other];
                    const wght = weight([...b.clothes, ...b.food, ...b.medicines, ...b.other]);                    
                        return (
                            <Accordion key={b.id}>
                                <AccordionSummary>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                        <div>Коробка №{b.boxNumber}</div>
                                        <div>
                                            Вес: {w.format(wght)}кг
                                        </div>
                                        <Checkbox 
                                            style={{zIndex: '10'}} 
                                            checked={b.isPacked}
                                            disabled={!(wght > 0 && wght <= 10) || b.isPacked}
                                            onChange={() => {
                                                setBoxes([{...b, isPacked: !b.isPacked}, ...boxes]);
                                                b.isPacked = !b.isPacked;
                                                handleBoxUpdate(b);
                                            }}/>
                                    </div>                                
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        {items.map(i => {
                                            return(
                                                <Accordion key={i.id}>
                                                    <AccordionSummary>
                                                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                                            <div>{i.title}</div>
                                                            <div>{i.weight * parseFloat(i.amount)}кг</div>    
                                                        </div>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <ItemElem i={i} onSave={() => fetchData()}/>
                                                    </AccordionDetails>
                                                </Accordion>                                                
                                            );
                                        })}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        );
                })}
                <Button
                    onClick={async () => {
                        await axios.post('https://vp-pspu.cf/api/new_box/', {
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
                <Warehouse boxes={boxes} onSave={fetchData} clothes={clothes} data={data} food={food} medicines={medicines} other={other} setData={setData}></Warehouse>
            </div>
        </div>
            
    );
}