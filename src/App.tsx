import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Clothes } from "./classes/Clothes";
import { Food } from "./classes/food";
import { Medicines } from "./classes/medicines";
import { Other } from "./classes/other";
import { DataList } from "./components/DataList";
import { IData } from "./interfaces/data";
import { IBox } from "./interfaces/IBox";

const initnal_data: IData = {
  clothes: [],
  food: [],
  medicines: [],
  other: []
}
const initial_box: IBox[] = []


function App() {
  const [data, setData] = useState<IData>(initnal_data);
  const [boxes, setBoxes] = useState<IBox[]>(initial_box);


  const fetchData = async () => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
    
    await axios.get('http://localhost:8000/api/get_boxes/').then(r => {
      const t: IBox[] = r.data;
      setBoxes(t);
    })

    await axios.get('http://localhost:8000/api/get_items/').then(r => {
      const t: IData = r.data;
      const typedClothes: Clothes[] = t.clothes.map(e => new Clothes(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.gender, e.size));
      const typedFoods: Food[] = t.food.map(e => new Food(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.expiration_date));
      const typedMedicines: Medicines[] = t.medicines.map(e => new Medicines(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.appointment));
      const typedOther: Other[] = t.other.map(e => new Other(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.description))

      setData(
        {
          clothes: typedClothes,
          food: typedFoods,
          medicines: typedMedicines,
          other: typedOther
        }
      );
    });
  }


  useEffect(() => {    
    fetchData();
  }, [data.clothes.length, data.food.length, data.medicines.length, data.other.length, boxes.length]);

  return (
    <>
      <DataList fetchData={fetchData} boxes={boxes} setBoxes={setBoxes} data={data} setData={setData} clothes={data.clothes} food={data.food} medicines={data.medicines} other={data.other}/>

    </>
  );    
}

export default App;
