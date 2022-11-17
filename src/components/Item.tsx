import { Button, ListItem, TextField, Typography } from "@mui/material";
import List from "@mui/material/List";
import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../classes/Item";

export const ItemElem = ({i} : {i: Item, onSave?: () => any}) => {
    const [item, setItem] = useState<Item>(i);
    
    const w = new Intl.NumberFormat('en-EN', {style: 'decimal', maximumFractionDigits: 2});

    return (
        <>
            <List>
                <ListItem>
                    Наименование: {item.title}
                </ListItem>
                
                <ListItem>
                    Кол-во: {item.amount}
                </ListItem>

                <ListItem>
                    Вес на единицу (кг): {w.format(item.weight)}
                </ListItem>

                <ListItem>
                    Дата получения: {item.date}
                </ListItem>

            </List>
        </>
    );
    
}