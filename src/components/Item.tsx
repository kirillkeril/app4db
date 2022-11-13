import { Button, ListItem, TextField, Typography } from "@mui/material";
import List from "@mui/material/List";
import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../classes/Item";

export const ItemElem = ({i, onSave} : {i: Item, onSave?: () => any}) => {
    const [item, setItem] = useState<Item>(i);
    const [err, setErr] = useState<boolean>(false);
    
    const handleSubmit = async () => {
        await axios.patch('http://localhost:8000/api/update_clothes/'+item.id+'/', {...item})
        if (onSave !== undefined) onSave();          
    }

    useEffect(() => {
        if(
            item.title.trim() == "" ||
            parseInt(item.amount) <= 0 ||
            item.weight <= 0 ||
            item.boxNum < -1
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
                    Дата получения: <TextField error={item.date.trim() == ""} required sx={{ml: '1rem', width: "auto"}} type='date' value={item.date}
                                                    onChange={e => {
                                                            setItem({...item, date: e.target.value})
                                                        }
                                                    }/> 
                </ListItem>

            </List>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button disabled={err} onClick={handleSubmit}>Сохранить</Button>
            </div>
            <Typography sx={{color: 'red'}}>{err ? "Сохранение невозможно" : ''}</Typography>
        </>
    );
    
}