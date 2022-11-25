import { Button } from "@mui/material";
import axios from "axios";
import { Item } from "../classes/Item";
import { settings } from "../classes/settings";
import { IBox } from "../interfaces/IBox";
import { BoxItem } from "./Box";

export const Boxes = ({boxes, fetchData, setBoxes} : {
    boxes: IBox[],
    setBoxes: (boxes: IBox[]) => any,
    fetchData: () => any
}) => {
    const w = new Intl.NumberFormat('en-EN', {style: 'decimal', maximumFractionDigits: 2});

    function weight(data: Item[]) {
        let w = 0;
        data.map(i => {
            w += i.weight * parseFloat(i.amount);
        });
        return w;
    }

    const handleBoxUpdate = async (box: IBox) => {
        await axios.put(`${settings.url}update_box/${box.id}/`, {...box});
        fetchData();
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 className="title">Коробки</h2>
            <div className="container">
                
                {boxes.map(b => {
                    const items: Item[] = [...b.clothes, ...b.food, ...b.medicines, ...b.other];
                    const wght = weight([...b.clothes, ...b.food, ...b.medicines, ...b.other]);
                        return (
                            <BoxItem b={b} w={w} boxes={boxes} fetchData={fetchData} handleBoxUpdate={handleBoxUpdate} items={items} setBoxes={setBoxes} wght={wght} key={b.id}/>
                        );
                })}
                
                <Button
                    onClick={async () => {
                        await axios.post(`${settings.url}new_box/`, {
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
        </div>
       
    );
}