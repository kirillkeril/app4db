import axios from "axios";
import { useEffect, useState } from "react";
import { Clothes } from "./classes/Clothes";
import { Food } from "./classes/food";
import { Medicines } from "./classes/medicines";
import { Other } from "./classes/other";
import { DataList } from "./components/DataList";
import { IData } from "./interfaces/data";

const initnal_data: IData = {
  clothes: [],
  food: [],
  medicines: [],
  other: []
}

function App() {
  const [data, setData] = useState<IData>(initnal_data);
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  return (
    <DataList clothes={data.clothes} food={data.food} medicines={data.medicines} other={data.other}/>
  );
}

export default App;
