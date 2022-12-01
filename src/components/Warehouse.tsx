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
    other: Other[],
    pageF: number,
    setPageF: (p: number) => any,
    pageM: number,
    setPageM: (p: number) => any,
    pageC: number,
    setPageC: (p: number) => any,
    pageO: number,
    setPageO: (p: number) => any,
    maxPageF: number, 
    setMaxPageF: (mp: number) => any,
    maxPageM: number, 
    setMaxPageM: (mp: number) => any,
    maxPageC: number, 
    setMaxPageC: (mp: number) => any,
    maxPageO: number, 
    setMaxPageO: (mp: number) => any,
    s: boolean,
    setS: (b: boolean) => any
}

export const Warehouse = ({
        onSave, 
        clothes, 
        food, 
        medicines, 
        other, 
        setData, 
        data, 
        boxes, 
        maxPageC, 
        maxPageF, 
        maxPageM, 
        maxPageO,
        pageC,
        pageF,
        pageM,
        pageO,
        setMaxPageC,
        setMaxPageF,
        setMaxPageM,
        setMaxPageO,
        setPageC,
        setPageF,
        setPageM,
        setPageO,
        s,
        setS
    }: WarehouseProps) => {
    const [clothesDialog, setClothesDialog] = useState<boolean>(false);
    const [foodDialog, setFoodDialog] = useState<boolean>(false);
    const [medicinesDialog, setmedicinesDialog] = useState<boolean>(false);
    const [otherDialog, setOtherDialog] = useState<boolean>(false);

    const [pagesC, setPagesC] = useState<number[]>([]);
    const [pagesF, setPagesF] = useState<number[]>([]);
    const [pagesM, setPagesM] = useState<number[]>([]);
    const [pagesO, setPagesO] = useState<number[]>([]);

    useEffect(
        () => {
            for (let i = 1; i <= maxPageC; i++) {
                pagesC.push(i);
            }            
        }, [maxPageC]
    );
    useEffect(
        () => {
            for (let i = 1; i <= maxPageF; i++) {
                pagesF.push(i);
            }
        }, [maxPageF]
    );
    useEffect(
        () => {
            for (let i = 1; i <= maxPageM; i++) {
                pagesM.push(i);
            }
        }, [maxPageM]
    );
    useEffect(
        () => {
            for (let i = 1; i <= maxPageO; i++) {
                pagesO.push(i);
            }
        }, [maxPageO]
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
                            clothes.map((e) => {
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
                                                                setS(true)
                                                            }}
                                                            onDelete={(item) => {
                                                                setData({
                                                                    ...data,
                                                                    clothes: data.clothes.filter(i => i.id !== item.id)
                                                                })
                                                                setS(true)
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
                            pagesC.map((e) => {
                                return (
                                    <div key={e} onClick={() => {setPageC(e); setS(true); onSave()}}>{e}</div>
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
                            food.map((e) => {
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
                                                                setS(true)
                                                            }}
                                                            onDelete={(item) => {
                                                                setData({
                                                                    ...data,
                                                                    food: data.food.filter(i => i.id !== item.id)
                                                                })
                                                                setS(true)
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
                            pagesF.map((e) => {
                                return (
                                    <div key={e} onClick={() => {setPageF(e); setS(true); onSave()}}>{e}</div>
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
                            medicines.map((e) => {
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
                                                                setS(true)
                                                            }}
                                                            onDelete={(item) => {
                                                                setData({
                                                                    ...data,
                                                                    medicines: data.medicines.filter(i => i.id !== item.id)
                                                                })
                                                                setS(true)
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
                            pagesM.map((e) => {
                                return (
                                    <div key={e} onClick={() => {setPageM(e);setS(true); onSave()}}>{e}</div>
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
                            other.map((e) => {
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
                                                                setS(true)
                                                            }}
                                                            onDelete={(item) => {
                                                                setData({
                                                                    ...data,
                                                                    other: data.other.filter(i => i.id !== item.id)
                                                                })
                                                                setS(true)
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
                            pagesO.map((e) => {
                                return (
                                    <div key={e} onClick={() => {setPageO(e); setS(true); onSave()}}>{e}</div>
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