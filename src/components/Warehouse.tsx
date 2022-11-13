import { Accordion, AccordionDetails, AccordionSummary, Button, ListItem } from '@mui/material';
import List from '@mui/material/List';
import { AddNewClothes, ClothesItem } from './ClothesItem';
import { AddNewFood, FoodItem } from './FoodItem';
import { AddNewMedicines, MedicinesItem } from './MedicinesItem';
import { AddNewOther, OtherItem } from './OtherItem';
import { useState } from 'react';
import { Clothes } from '../classes/Clothes';
import { Food } from '../classes/food';
import { Medicines } from '../classes/medicines';
import { Other } from '../classes/other';
import { IData } from '../interfaces/data';

interface WarehouseProps {
    onSave: () => any,
    data: IData,
    setData: (data: IData) => any,
    clothes: Clothes[],
    food: Food[],
    medicines: Medicines[],
    other: Other[]
}

export const Warehouse = ({onSave, clothes, food, medicines, other, setData, data}: WarehouseProps) => {
    const [clothesDialog, setClothesDialog] = useState<boolean>(false);
    const [foodDialog, setFoodDialog] = useState<boolean>(false);
    const [medicinesDialog, setmedicinesDialog] = useState<boolean>(false);
    const [otherDialog, setOtherDialog] = useState<boolean>(false);

    return (
        <>
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
                        <AddNewClothes data={data} setData={setData} arr={clothes} item={new Clothes(-1, '', '', 0, -1,  [new Date().getFullYear(), new Date().getMonth(), new Date().getDay()].join('-'), 'Uni', '')} isOpen={clothesDialog} setIsOpen={setClothesDialog}/>
                                    
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
                        <AddNewFood data={data} setData={setData} arr={food} item={new Food(-1, '', '', 0, -1,  [new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDay()].join('-'), '')} isOpen={foodDialog} setIsOpen={setFoodDialog}/>
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
                        <AddNewMedicines data={data} setData={setData} arr={medicines} item={new Medicines(-1, '', '', 0, -1,  [new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDay()].join('-'), '')} isOpen={medicinesDialog} setIsOpen={setmedicinesDialog}/>
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
                                                            onSave={() => {}}
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
                        <AddNewOther setData={setData} data={data} arr={other} item={new Other(-1, '', '', 0, -1,  [new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDay()].join('-'), '')} isOpen={otherDialog} setIsOpen={setOtherDialog}/>
                    </AccordionDetails>
                </Accordion>
        </>
    );
}