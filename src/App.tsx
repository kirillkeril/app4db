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
// import { DataList } from "./components/DataList";
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

  const [clothes, setClothes] = useState<Clothes[]>([])
  const [food, setFood] = useState<Food[]>([])
  const [medicines, setMedicines] = useState<Medicines[]>([])
  const [other, setOther] = useState<Other[]>([])

  const [boxes, setBoxes] = useState<IBox[]>(initial_box);

  const [pageF, setPageF] = useState<number>(1);
  const [pageM, setPageM] = useState<number>(1);
  const [pageC, setPageC] = useState<number>(1);
  const [pageO, setPageO] = useState<number>(1);

  const [maxPageF, setMaxPageF] = useState<number>(0);
  const [maxPageM, setMaxPageM] = useState<number>(0);
  const [maxPageC, setMaxPageC] = useState<number>(0);
  const [maxPageO, setMaxPageO] = useState<number>(0);

  const [s, setS] = useState<boolean>(true);

  const fetchClothes = async () => {
    await axios.get(`${settings.url}get/clothes/${pageC}/`).then((r) => {     
          
      const t: Clothes[] = r.data.data.map((e: Clothes) => new Clothes(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.gender, e.size));
      setMaxPageC(r.data.pageCount);
      setClothes(t);     
    })
  }

  const fetchFood = async () => {
    await axios.get(`${settings.url}get/food/${pageF}/`).then(r => {
      const t: Food[] = r.data.data.map((e: Food) => new Food(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.expiration_date));
      setMaxPageF(r.data.pageCount);
      
      setFood(t)
    })
  }

  const fetchMedicines = async () => {
    await axios.get(`${settings.url}get/medicines/${pageM}/`).then(r => {
      const t: Medicines[] = r.data.data.map((e: Medicines) => new Medicines(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.appointment));
      setMaxPageM(r.data.pageCount);
      
      setMedicines(t)
    })
  }

  const fetchOther = async () => {
    await axios.get(`${settings.url}get/other/${pageO}/`).then(r => {
      const t: Other[] = r.data.data.map((e: Other) => new Other(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.description));
      setMaxPageO(r.data.pageCount);

      setOther(t)
    })
  }

  const fetchBoxes = async () => {
    await axios.get(`${settings.url}get_boxes/`).then(r => {
      const t: IBox[] = r.data;
      setBoxes(t);
    });

    // if (s) {
    //   await fetchClothes();
    //   await fetchFood();
    //   await fetchMedicines();
    //   await fetchOther();
    //   if(data.clothes.length > 0 ||
    //     data.food.length > 0 ||
    //     data.medicines.length > 0 ||
    //     data.other.length > 0) setS(false);
    // }
    // await axios.get(`${settings.url}get_items/`).then(r => {
    //   const t: IData = r.data;
    //   const typedClothes: Clothes[] = t.clothes.map(e => new Clothes(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.gender, e.size));
    //   const typedFoods: Food[] = t.food.map(e => new Food(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.expiration_date));
    //   const typedMedicines: Medicines[] = t.medicines.map(e => new Medicines(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.appointment));
    //   const typedOther: Other[] = t.other.map(e => new Other(e.id, e.title, e.amount, e.weight, e.boxNum, e.date, e.description))

    //   setData(
    //     {
    //       clothes: typedClothes,
    //       food: typedFoods,
    //       medicines: typedMedicines,
    //       other: typedOther
    //     }
    //   );
    // });
  }

  const fetchData = async () => {
    await fetchBoxes();
    await fetchClothes();
    await fetchFood();
    await fetchMedicines();
    await fetchOther();

    setData({clothes, food, medicines, other});
  }

  useEffect(() => {
    fetchClothes()
  }, [pageC]);
  useEffect(() => {
    fetchFood()
  }, [pageF]);
  useEffect(() => {
    fetchMedicines()
  }, [pageM]);
  useEffect(() => {
    fetchOther()
  }, [pageO]);
  useEffect(() => {    
    fetchBoxes();
  }, [boxes.length]);

  useEffect(() => {
    fetchData();
  }, [clothes.length, other.length, medicines.length, food.length]);

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
          <Route path="warehouse" element={
            <Warehouse 
              boxes={boxes} 
              onSave={fetchData} 
              clothes={data.clothes} 
              data={data} 
              food={data.food} 
              medicines={data.medicines} 
              other={data.other} 
              setData={setData} 
              maxPageC={maxPageC}
              maxPageF={maxPageF}
              maxPageM={maxPageM}
              maxPageO={maxPageO}
              pageC={pageC}
              pageF={pageF}
              pageM={pageM}
              pageO={pageO}
              setMaxPageC={setMaxPageC}
              setMaxPageF={setMaxPageF}
              setMaxPageM={setMaxPageM}
              setMaxPageO={setMaxPageO}
              setPageC={setPageC}
              setPageF={setPageF}
              setPageM={setPageM}
              setPageO={setPageO}
              s={s}
              setS={setS}
              />} />
          <Route path="contacts" element={<Contacts />}/>
          <Route path='*' element={
            <Warehouse 
              boxes={boxes} 
              onSave={fetchData} 
              clothes={data.clothes} 
              data={data} 
              food={data.food} 
              medicines={data.medicines} 
              other={data.other} 
              setData={setData} 
              maxPageC={maxPageC}
              maxPageF={maxPageF}
              maxPageM={maxPageM}
              maxPageO={maxPageO}
              pageC={pageC}
              pageF={pageF}
              pageM={pageM}
              pageO={pageO}
              setMaxPageC={setMaxPageC}
              setMaxPageF={setMaxPageF}
              setMaxPageM={setMaxPageM}
              setMaxPageO={setMaxPageO}
              setPageC={setPageC}
              setPageF={setPageF}
              setPageM={setPageM}
              setPageO={setPageO}
              s={s}
              setS={setS}
              />} />
        </Routes>
      </Router>
    </>
  );    
}

export default App;
