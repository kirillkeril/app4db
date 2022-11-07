import { Button, Dialog, DialogContent, DialogTitle, ListItem, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import { useEffect, useState } from "react";
import axios from "axios";
import { Food } from "../classes/food";
import { Item } from '../classes/Item';
import { IData } from '../interfaces/data';

export const FoodItem = ({i, type, onSave, onDelete} : {i: Food, type: 'Change' | 'Add', onDelete?: (i: Item) => any, onSave?: (i: Item) => any}) => {
    const [item, setItem] = useState<Food>(i);
    const [err, setErr] = useState<boolean>(false);

    const handleDelete = async () => {
        switch (type) {
            case 'Change':
                await axios.delete('http://localhost:8000/api/delete/food/'+item.id+'/');
                if (onDelete !== undefined) onDelete(item);
                break;
            default:
                break;
        }      
    }
    
    const handleSubmit = async () => {
        switch (type) {
            case 'Change':
                await axios.patch('http://localhost:8000/api/update_food/'+item.id+'/', {...item})
                break;
            default:
                await axios.put('http://localhost:8000/api/new_food/', {...item});
                if (onSave !== undefined) onSave(item);
        }
    }

    useEffect(() => {
        if(
            item.title.trim() == "" ||
            parseInt(item.amount) <= 0 ||
            item.weight <= 0 ||
            item.boxNum < -1 ||
            item.expiration_date.trim() == ""
        ) {
            setErr(true)
        } else setErr(false);
    }, [item])

    return (
        <>
            <List>
                <ListItem>
                    Наименование: <TextField error={item.title.trim() == ""} required sx={{ml: '1rem'}} type='text' value={item.title}
                                                onChange={e => {
                                                        setItem({...item, title: e.target.value})
                                                    }
                                                }/> 
                </ListItem>
                
                <ListItem>
                    Кол-во: <TextField error={parseInt(item.amount) <= 0} required sx={{ml: '1rem', width: "5rem"}} type='number' value={item.amount}
                                                onChange={e => {
                                                        setItem({...item, amount: e.target.value})
                                                    }
                                                }/> 
                </ListItem>

                <ListItem>
                    Вес на единицу (кг): <TextField error={item.weight <= 0} required sx={{ml: '1rem', width: "5rem"}} type='number' value={item.weight}
                                                onChange={e => {
                                                        setItem({...item, weight: isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)})
                                                    }
                                                }/> 
                </ListItem>

                <ListItem>
                    Номер коробки: <TextField error={item.boxNum < -1} required sx={{ml: '1rem', width: "5rem"}} type='number' value={item.boxNum > -1 ? item.boxNum : ''}
                                                onChange={e => {                                                                
                                                        setItem({...item, boxNum: isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)})
                                                    }
                                                }/> 
                </ListItem>

                <ListItem>
                    Годен до: <TextField error={item.expiration_date.trim() == ""} required sx={{ml: '1rem', width: "auto"}} type='date' value={item.expiration_date}
                                                onChange={e => {
                                                        setItem({...item, expiration_date: e.target.value})
                                                    }
                                                }/> 
                </ListItem>

                <ListItem>
                    Дата получения: <TextField error={item.date.trim() == ""} required sx={{ml: '1rem', width: "auto"}} type='date' value={item.date}
                                                    onChange={e => {
                                                            setItem({...item, date: e.target.value})
                                                        }
                                                    }/> 
                </ListItem>

            </List>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button disabled={err} onClick={handleSubmit}>Сохранить</Button>
                {type == 'Change' && <Button color="warning" onClick={handleDelete}>Удалить</Button>}
            </div>
            
            <Typography sx={{color: 'red'}}>{err ? "Сохранение невозможно" : ''}</Typography>
        </>
    );
    
}

export const AddNewFood = ({arr, item, isOpen, setIsOpen, data, setData} : {arr: Food[], item: Food, isOpen: boolean, setIsOpen: (isOpen: boolean) => any, data: IData, setData: (data: IData) => any}) => {
    const [newItem, setNewItem] = useState<Food>(item);

    return(
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>Добавить</DialogTitle>
            <DialogContent>
                <FoodItem
                    i={newItem} 
                    type={"Add"}
                    onSave={(item) => {
                        setIsOpen(false)
                        setData({
                            ...data,
                            food: [...data.food, item as Food]
                        })                  
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}