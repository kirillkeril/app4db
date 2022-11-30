import { Accordion, AccordionDetails, AccordionSummary, Button, ListItem } from '@mui/material';
import List from '@mui/material/List';
import { AddNewClothes, ClothesItem } from './ClothesItem';
import { AddNewFood, FoodItem } from './FoodItem';
import { AddNewMedicines, MedicinesItem } from './MedicinesItem';
import { AddNewOther, OtherItem } from './OtherItem';
import { useEffect, useState } from 'react';
import { Clothes } from '../classes/Clothes';
import { Food } from '../classes/food';
import { Medicines } from '../classes/medicines';
import { Other } from '../classes/other';
import { IData } from '../interfaces/data';
import { IBox } from '../interfaces/IBox';

interface WarehouseProps {
    onSave: () => any,
    data: IData,
    setData: (data: IData) => any,
    clothes: Clothes[],
    food: Food[],
    medicines: Medicines[],
    boxes: IBox[],
    other: Other[]
}

export const Warehouse = ({onSave, clothes, food, medicines, other, setData, data, boxes}: WarehouseProps) => {
    const [clothesDialog, setClothesDialog] = useState<boolean>(false);
    const [foodDialog, setFoodDialog] = useState<boolean>(false);
    const [medicinesDialog, setmedicinesDialog] = useState<boolean>(false);
    const [otherDialog, setOtherDialog] = useState<boolean>(false);

    const [visibleArrC, setVisibleC] = useState<Clothes[]>([]);
    const [visibleArrF, setVisibleF] = useState<Food[]>([]);
    const [visibleArrM, setVisibleM] = useState<Medicines[]>([]);
    const [visibleArrO, setVisibleO] = useState<Other[]>([]);

    const [pagF, setPagF] = useState<number[]>([]);
    const [pagM, setPagM] = useState<number[]>([]);
    const [pagC, setPagC] = useState<number[]>([]);
    const [pagO, setPagO] = useState<number[]>([]);

    const [pageF, setPageF] = useState<number>(0);
    const [pageM, setPageM] = useState<number>(0);
    const [pageC, setPageC] = useState<number>(0);
    const [pageO, setPageO] = useState<number>(0);

    useEffect(() => {
            let a: number[] = []
            for (let i = 0; i < Math.round(clothes.length / 10); i++) {
                a.push(i)
            }
            setPagC(a)        
            a = []
            for (let i = 0; i < Math.round(food.length / 10); i++) {
                a.push(i)
            }
            setPagF(a)
            a = []
            for (let i = 0; i < Math.round(medicines.length / 10); i++) {
                a.push(i)
            }
            setPagM(a)
            a = []
            for (let i = 0; i < Math.round(other.length / 10); i++) {
                a.push(i)
            }
            setPagO(a)
            a = []
        }, [clothes.length, food.length, medicines.length, other.length]
    );

    useEffect( () => {
            let a: Clothes[] = []
            if(visibleArrC.length == 0) setVisibleC(clothes)
            if(clothes.length > 0 && pagC.length > 0) {
                console.log(clothes.length, pagC.length, pageC);
                
                for (let i = Math.round(pageC * (clothes.length / pagC.length)); i < Math.round(clothes.length / pagC.length) * (pageC + 1); i++) {
                    console.log(i);
                    if (i >= clothes.length) break;
                    
                    a.push(clothes[i])                
                }
            }
            if(a.length > 0) setVisibleC(a)
            else setVisibleC(clothes)
        }, [clothes.length, pagC, pageC]
    );

    useEffect( () => {
        let a: Food[] = []
        if(visibleArrF.length == 0) setVisibleF(food)
        if(food.length > 0 && pagF.length > 0) {
            console.log(food.length, pagF.length, pageF);
            
            for (let i = Math.round(pageF * (food.length / pagF.length)); i < Math.round(food.length / pagF.length) * (pageF + 1); i++) {
                console.log(i);
                if (i >= food.length) break;
                
                a.push(food[i])                
            }
        }
        if(a.length > 0) setVisibleF(a)
        else setVisibleF(food)
        }, [food.length, pagF, pageF]
    );

    useEffect( () => {
        let a: Medicines[] = []
        if(visibleArrM.length == 0) setVisibleM(medicines)
        if(medicines.length > 0 && pagM.length > 0) {
            console.log(medicines.length, pagM.length, pageM);
            
            for (let i = Math.round(pageM * (medicines.length / pagM.length)); i < Math.round(medicines.length / pagM.length) * (pageM + 1); i++) {
                console.log(i);
                if (i >= medicines.length) break;
                
                a.push(medicines[i])                
            }
        }
        if(a.length > 0) setVisibleM(a)
        else setVisibleM(medicines)
        }, [medicines.length, pagM, pageM]
    );
    useEffect( () => {
        let a: Other[] = []
        if(visibleArrO.length == 0) setVisibleO(other)
        if(other.length > 0 && pagO.length > 0) {
            console.log(other.length, pagO.length, pageO);
            
            for (let i = Math.round(pageO * (other.length / pagO.length)); i < Math.round(other.length / pagO.length) * (pageO + 1); i++) {
                console.log(i);
                if (i >= other.length) break;
                
                a.push(other[i])                
            }
        }
        if(a.length > 0) setVisibleO(a)
        else setVisibleO(other)
        }, [other.length, pagO, pageO]
    );


    return (
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 className='title'>Склад</h2>
            <div className='container'>
                <Accordion>
                    <AccordionSummary><h3>Одежда</h3></AccordionSummary>
                    <AccordionDetails>
                        <List>
                        {
                            visibleArrC.map((e) => {
                                const item: Clothes = e;
                                return (
                                    <ListItem key={e.id}>
                                        <Accordion>
                                            <AccordionSummary>{item.title}</AccordionSummary>
                                            <AccordionDetails>
                                                <ClothesItem
                                                    boxes={boxes}
                                                            onSave={() => {
                                                                onSave();
                                                            }}
                                                            onDelete={(item) => {
                                                                setData({
                                                                    ...data,
                                                                    clothes: data.clothes.filter(i => i.id !== item.id)
                                                                })
                                                            }} 
                                                            i={item} 
                                                            type={'Change'}/>
                                            </AccordionDetails>                                            
                                        </Accordion>                                        
                                    </ListItem>                                
                                )
                            })
                        }
                        </List>
                        <Button sx={{mt: '1rem'}} onClick={() => setClothesDialog(true)}>Добавить</Button>
                        <AddNewClothes data={data} setData={setData} arr={clothes} item={new Clothes(-1, '', '', 0, -1,  '', 'Uni', '')} isOpen={clothesDialog} setIsOpen={setClothesDialog}/>
                        <div className='pag'>{
                            pagC.map((e) => {
                                return (
                                    <div onClick={() => setPageC(e)}>{e + 1}</div>
                                );
                            })
                        }</div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><h3>Еда</h3></AccordionSummary>
                    <AccordionDetails>
                        <List>
                        {
                            visibleArrF.map((e) => {
                                const item: Food = e;
                                return (
                                    <ListItem key={e.id}>
                                        <Accordion>
                                            <AccordionSummary>{item.title}</AccordionSummary>
                                            <AccordionDetails>
                                                <FoodItem
                                                    boxes={boxes}  
                                                            onSave={() => {
                                                                onSave();
                                                            }}
                                                            onDelete={(item) => {
                                                                setData({
                                                                    ...data,
                                                                    food: data.food.filter(i => i.id !== item.id)
                                                                })
                                                            }} 
                                                            i={item} type={'Change'}/>
                                            </AccordionDetails>                                            
                                        </Accordion>                                        
                                    </ListItem>                                
                                )
                            })
                        }
                        </List>
                        <Button sx={{mt: '1rem'}} onClick={() => {setFoodDialog(true)}}>Добавить</Button>
                        <AddNewFood data={data} setData={setData} arr={food} item={new Food(-1, '', '', 0, -1,  '', '')} isOpen={foodDialog} setIsOpen={setFoodDialog}/>
                        <div className='pag'>{
                            pagF.map((e) => {
                                return (
                                    <div onClick={() => setPageF(e)}>{e + 1}</div>
                                );
                            })
                        }</div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><h3>Медикаменты</h3></AccordionSummary>
                    <AccordionDetails>
                        <List>
                        {
                            visibleArrM.map((e) => {
                                const item: Medicines = e;
                                return (
                                    <ListItem key={e.id}>
                                        <Accordion>
                                            <AccordionSummary>{item.title}</AccordionSummary>
                                            <AccordionDetails>
                                            <MedicinesItem
                                                boxes={boxes}
                                                            onSave={() => {
                                                                onSave();
                                                            }}
                                                            onDelete={(item) => {
                                                                setData({
                                                                    ...data,
                                                                    medicines: data.medicines.filter(i => i.id !== item.id)
                                                                })
                                                            }} 
                                                            i={item} 
                                                            type={'Change'}/>
                                            </AccordionDetails>                                            
                                        </Accordion>                                        
                                    </ListItem>                                
                                )
                            })
                        }
                        </List>
                        <Button sx={{mt: '1rem'}} onClick={() => {setmedicinesDialog(true)}}>Добавить</Button>
                        <AddNewMedicines data={data} setData={setData} arr={medicines} item={new Medicines(-1, '', '', 0, -1,  '', '')} isOpen={medicinesDialog} setIsOpen={setmedicinesDialog}/>
                        <div className='pag'>{
                            pagM.map((e) => {
                                return (
                                    <div onClick={() => setPageM(e)}>{e + 1}</div>
                                );
                            })
                        }</div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><h3>Другое</h3></AccordionSummary>
                    <AccordionDetails>
                        <List>
                        {
                            visibleArrO.map((e) => {
                                const item: Other = e;
                                return (
                                    <ListItem key={e.id}>
                                        <Accordion>
                                            <AccordionSummary>{item.title}</AccordionSummary>
                                            <AccordionDetails>
                                                <OtherItem
                                                    boxes={boxes}
                                                            onSave={() => {
                                                                onSave();
                                                            }}
                                                            onDelete={(item) => {
                                                                setData({
                                                                    ...data,
                                                                    other: data.other.filter(i => i.id !== item.id)
                                                                })
                                                            }} 
                                                            i={item} type={'Change'}/>
                                            </AccordionDetails>                                            
                                        </Accordion>                                        
                                    </ListItem>                                
                                )
                            })
                        }
                        </List>
                        <Button sx={{mt: '1rem'}} onClick={() => {setOtherDialog(true)}}>Добавить</Button>
                        <div className='pag'>{
                            pagO.map((e) => {
                                return (
                                    <div onClick={() => setPageO(e)}>{e + 1}</div>
                                );
                            })
                        }</div>
                        <AddNewOther setData={setData} data={data} arr={other} item={new Other(-1, '', '', 0, -1,  '', '')} isOpen={otherDialog} setIsOpen={setOtherDialog}/>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}