import { Clothes } from "../classes/Clothes";
import { Button, Dialog, DialogContent, DialogTitle, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import { useEffect, useState } from "react";
import axios from "axios";
import { Item } from "../classes/Item";
import { IData } from "../interfaces/data";
import { IBox } from "../interfaces/IBox";
import { settings } from "../classes/settings";

export const ClothesItem = ({i, type, onSave, onDelete, boxes} : {i: Clothes, type: 'Change' | 'Add', onSave?: (i: Item) => any, onDelete?: (i: Item) => any, boxes?: IBox[]}) => {
    const [item, setItem] = useState<Clothes>(i);
    const [err, setErr] = useState<boolean>(false);

    const handleDelete = async () => {
        switch (type) {
            case 'Change':
                await axios.delete(`${settings.url}delete/clothes/${item.id}/`);
                if (onDelete !== undefined) onDelete(item);
                break;
            default:
                break;
        }      
    }
    
    const handleSubmit = async () => {
        switch (type) {
            case 'Change':
                await axios.patch(`${settings.url}update_clothes/${item.id}/`, {...item})
                if (onSave !== undefined) onSave(item);
                break;
            default:
                await axios.put(`${settings.url}new_clothes/`, {...item});
                if (onSave !== undefined) onSave(item);
                break;
        }
    }

    useEffect(() => {
        if(
            item.title.trim() == "" ||
            item.amount == '' ||
            item.amount == '0' ||
            item.weight < 0 ||
            item.date.trim() == '' ||
            item.gender.trim() == "" ||
            item.size.trim() == ""
        ) {
            setErr(true)
        } else setErr(false);
    }, [item])

    return (
        <>
            <List>
                <ListItem>
                    Наименование: <TextField disabled={boxes !== undefined && boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false} error={item.title.trim() == ""} required sx={{ml: '1rem'}} type='text' value={item.title}
                                                onChange={e => {
                                                        setItem({...item, title: e.target.value})
                                                    }
                                                }/> 
                </ListItem>
                
                <ListItem>
                    Кол-во: <TextField disabled={boxes !== undefined && boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false} error={parseInt(item.amount) <= 0} required sx={{ml: '1rem', width: "5rem"}} type='number' value={item.amount}
                                                onChange={e => {
                                                        setItem({...item, amount: e.target.value})
                                                    }
                                                }/> 
                </ListItem>

                <ListItem>
                    Вес на единицу (кг): <TextField disabled={boxes !== undefined && boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false} error={item.weight <= 0} required sx={{ml: '1rem', width: "5rem"}} type='number' value={item.weight}
                                                onChange={e => {
                                                        setItem({...item, weight: isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)})
                                                    }
                                                }/> 
                </ListItem>

                <ListItem>
                    Номер коробки: <TextField disabled={boxes !== undefined && boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false} error={item.boxNum < -1} required sx={{ml: '1rem', width: "5rem"}} type='number' value={item.boxNum > -1 ? item.boxNum : ''}
                                                onChange={e => {                                                                
                                                        setItem({...item, boxNum: isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)})
                                                    }
                                                }/> 
                </ListItem>

                <ListItem>
                    Размер: <TextField disabled={boxes !== undefined && boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false} error={item.size.trim() == ""} required sx={{ml: '1rem', width: "5rem"}} type='text' value={item.size}
                                                onChange={e => {
                                                        setItem({...item, size: e.target.value})
                                                    }
                                                }/> 
                </ListItem>

                <ListItem>
                    Пол: <Select disabled={boxes !== undefined && boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false} value={item.gender} autoWidth onChange={
                        e => {
                            setItem({
                                ...item, gender: String(e.target.value)
                            })
                        }
                    }>
                            <MenuItem value={'M'}>Муж</MenuItem>
                            <MenuItem value={'F'}>Жен</MenuItem>
                            <MenuItem value={'Uni'}>Уни</MenuItem>
                        </Select> 
                </ListItem>

                <ListItem>
                    Дата получения: <TextField disabled={boxes !== undefined && boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false} error={item.date.trim() == ""} required sx={{ml: '1rem', width: "auto"}} type='date' value={item.date}
                                                    onChange={e => {
                                                            setItem({...item, date: e.target.value})
                                                        }
                                                    }/> 
                </ListItem>

            </List>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button disabled={boxes !== undefined && boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false || err} onClick={handleSubmit}>Сохранить</Button>
                {type == 'Change' && <Button color="warning" onClick={handleDelete} disabled={boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false}>Удалить</Button>}
            </div>
            <Typography sx={{color: 'red'}}>{err ? "Сохранение невозможно" : ''}</Typography>
        </>
    );
    
}

export const AddNewClothes = ({arr, item, isOpen, setIsOpen,data, setData} : {arr: Clothes[], item: Clothes, isOpen: boolean, setIsOpen: (isOpen: boolean) => any, data: IData, setData: (data: IData) => any}) => {
    const [newItem, setNewItem] = useState<Clothes>(item);

    return(
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>Добавить</DialogTitle>
            <DialogContent>
            <ClothesItem
                i={newItem} 
                type={"Add"}
                onSave={(item) => {
                    setIsOpen(false)
                    setData({
                        ...data,
                        clothes: [...data.clothes, item as Clothes]
                    })                  
                }}
                />
            </DialogContent>
        </Dialog>
    );
}