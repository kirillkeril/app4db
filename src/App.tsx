import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import { Clothes } from "./classes/Clothes";
import { Food } from "./classes/food";
import { Medicines } from "./classes/medicines";
import { Other } from "./classes/other";
import { settings } from "./classes/settings";
import { Boxes } from "./components/Boxes";
import { Contacts } from "./components/Contacts";
import { DataList } from "./components/DataList";
import { Warehouse } from "./components/Warehouse";
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
    
    await axios.get(`${settings.url}get_boxes/`).then(r => {
      const t: IBox[] = r.data;
      setBoxes(t);
    })

    await axios.get(`${settings.url}get_items/`).then(r => {
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
      <Router>
        <nav style={{width: '50%', margin: '20px auto 80px auto', display: 'flex', justifyContent: 'space-between'}}>
          <NavLink className={'link'} to={'boxes'}>Коробки</NavLink>
          <NavLink className={'link'} to={'warehouse'}>Склад</NavLink>
          <NavLink className={'link'} to={'contacts'}>Контакты</NavLink>
        </nav>
        
        <Routes>
          <Route path="boxes" element={<Boxes boxes={boxes} fetchData={fetchData} setBoxes={setBoxes}/>}/>
          <Route path="warehouse" element={<Warehouse boxes={boxes} onSave={fetchData} clothes={data.clothes} data={data} food={data.food} medicines={data.medicines} other={data.other} setData={setData} />} />
          <Route path="contacts" element={<Contacts />}/>
          <Route path='*' element={<Warehouse boxes={boxes} onSave={fetchData} clothes={data.clothes} data={data} food={data.food} medicines={data.medicines} other={data.other} setData={setData} />} />
        </Routes>
      </Router>
    </>
  );    
}

export default App;
