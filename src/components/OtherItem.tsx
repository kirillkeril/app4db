import { Button, Dialog, DialogContent, DialogTitle, ListItem, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import { useEffect, useState } from "react";
import axios from "axios";
import { Item } from '../classes/Item';
import { IData } from '../interfaces/data';
import { Other } from '../classes/other';
import { IBox } from '../interfaces/IBox';
import { settings } from '../classes/settings';

export const OtherItem = ({i, type, onSave, onDelete, boxes} : {i: Other, type: 'Change' | 'Add', onDelete?: (i: Item) => any, onSave?: (i: Item) => any, boxes?: IBox[]}) => {
    const [item, setItem] = useState<Other>(i);
    const [err, setErr] = useState<boolean>(false);

    const handleDelete = async () => {
        switch (type) {
            case 'Change':
                await axios.delete(`${settings.url}delete/other/${item.id}/`);
                if (onDelete !== undefined) onDelete(item);
                break;
            default:
                break;
        }      
    }
    
    const handleSubmit = async () => {
        switch (type) {
            case 'Change':
                console.log(item);
                
                await axios.patch(`${settings.url}update_other/${item.id}/`, {...item})
                if (onSave !== undefined) onSave(item);
                break;
            default:
                await axios.put(`${settings.url}new_other/`, {...item});
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
            item.description.trim() == ""
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
                    Описание: <TextField disabled={boxes !== undefined && boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false} error={item.description.trim() == ""} required sx={{ml: '1rem', width: "auto"}} type='text' value={item.description}
                                                onChange={e => {
                                                        setItem({...item, description: e.target.value})
                                                    }
                                                }/> 
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
                <Button onClick={handleSubmit} disabled={boxes !== undefined && boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false || err}>Сохранить</Button>
                {type == 'Change' && <Button color="warning" onClick={handleDelete} disabled={boxes?.find((v) => v.boxNumber == item.boxNum)?.isPacked !== false}>Удалить</Button>}
            </div>
            
            <Typography sx={{color: 'red'}}>{err ? "Сохранение невозможно" : ''}</Typography>
        </>
    );
    
}

export const AddNewOther = ({arr, item, isOpen, setIsOpen, data, setData} : {arr: Other[], item: Other, isOpen: boolean, setIsOpen: (isOpen: boolean) => any, data: IData, setData: (data: IData) => any}) => {
    const [newItem, setNewItem] = useState<Other>(item);

    return(
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>Добавить</DialogTitle>
            <DialogContent>
                <OtherItem
                    i={newItem} 
                    type={"Add"}
                    onSave={(item) => {
                        setIsOpen(false)
                        setData({
                            ...data,
                            other: [...data.other, item as Other]
                        })                  
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}