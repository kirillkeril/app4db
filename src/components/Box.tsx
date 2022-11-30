import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Dialog, List } from "@mui/material";
import { useState } from "react";
import { Item } from "../classes/Item";
import { settings } from "../classes/settings";
import { IBox } from "../interfaces/IBox";
import { ItemElem } from "./Item";

export const BoxItem = ({b, w, setBoxes, boxes, wght, handleBoxUpdate, items, fetchData}:
                        {b: IBox, w: Intl.NumberFormat, setBoxes: (b : IBox[]) => any,
                             boxes: IBox[], wght: number, handleBoxUpdate: (b: IBox)=>any, items: Item[], fetchData: () => any}) => {
    
    const [dialog, setDialog] = useState<boolean>(false);
    return (
        <Accordion>
            <AccordionSummary>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <a className="link" href={`${settings.url}/print_box/${b.boxNumber}`}>
                        Коробка №{b.boxNumber} (нажми для печати)
                    </a>
                    <div>
                        Вес: {w.format(wght)}кг
                    </div>
                    <div>
                        <label>Упаковано:</label>
                        <Checkbox
                            style={{zIndex: '10'}} 
                            checked={b.isPacked}
                            disabled={!(wght > 0 && wght <= 10) || b.isPacked}
                            onChange={() => {
                                console.log(b);
                                setDialog(true);
                            }}/>
                        <Dialog 
                            onClose={() => {
                                setDialog(false);
                            }} 
                            open={dialog} sx={{background: 'transparent'}}>
                            <div style={{padding: '1rem'}}>
                                <h2>Вы уверены, что хотите запечатать коробку? Изменять запечатанную коробку невозможно.</h2>
                                <Button sx={{fontSize: '1rem'}}
                                    onClick={() => {
                                        console.log(b);
                                        
                                        setBoxes([...boxes.filter(i => i.id !== b.id), {...b, isPacked: !b.isPacked}]);
                                        b.isPacked = !b.isPacked;
                                        handleBoxUpdate(b);
                                        
                                        setDialog(false);
                                    }}
                                    >
                                    Да
                                </Button>
                            </div>
                        </Dialog>
                    </div>
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
    )
}