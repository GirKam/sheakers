import React from 'react';
import axios from 'axios'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import { Routes, Route } from "react-router-dom";

export const AppContext = React.createContext({});

function App() {

  const [items, setItems] = React.useState([]);
  
  const [cartItems, setCartItems] = React.useState([]);
  
  const [favorites, setFavorites] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState('');

  const [cardOpened, setCardOpened] = React.useState(false);

  const [isLodaing, setIsLodaing] = React.useState(true);


  React.useEffect(() => {
    async function fetchData () {
      
      const CartResponse = await  axios.get('https://6558be74e93ca47020a9ac36.mockapi.io/cart')
      const FavoritesResponse = await axios.get('https://6565d6d1eb8bb4b70ef26f35.mockapi.io/favorites')      
      const itemResponse = await axios.get('https://6558be74e93ca47020a9ac36.mockapi.io/items')

      setIsLodaing(false)

      setCartItems(CartResponse.data)
      setFavorites(FavoritesResponse.data)
      setItems(itemResponse.data)    
    }
    fetchData()    
  },[]);


  const addToCart = (obj)=>{

    try {
      if(cartItems.find((cartObj) => Number(cartObj.id) === Number(obj.id))){
        setCartItems( prev=> prev.filter(item=> Number(item.id) !== Number(obj.id)))
        axios.delete(`https://6558be74e93ca47020a9ac36.mockapi.io/cart/${obj.id}`);

      }else{
        axios.post('https://6558be74e93ca47020a9ac36.mockapi.io/cart',obj)    
        setCartItems( prev=> [...prev, obj])
      }
        
    } catch (error) {
      alert("Ошибка")
            
    }
  }
  const onRemoveItem = (id)=>{
    axios.delete(`https://6558be74e93ca47020a9ac36.mockapi.io/cart/${id}`);
    setCartItems((prev)=>prev.filter(item=>item.id !==id));
  }
  const onAddToFavorite = async (obj)=>{
    try {
      if(favorites.find((favObj) => favObj.id === obj.id)){
        axios.delete(`https://6565d6d1eb8bb4b70ef26f35.mockapi.io/favorites/${obj.id}`);
        setFavorites( prev=> prev.filter(item=>item.id !==obj.id))
      } else{
        const {data} = await axios.post('https://6565d6d1eb8bb4b70ef26f35.mockapi.io/favorites',obj)    
        setFavorites( prev=> [...prev, data])
      }       
    } catch (error) {
      alert("Не удалось добавиь")      
    }       
  }

  let onChangeSearchValue = (e)=>{
    setSearchValue(e.target.value)
  }

  const isItemAdded =(id)=> {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  return (
  <AppContext.Provider 
    value={{items,cartItems,favorites,isItemAdded,setCardOpened,setCartItems,onAddToFavorite}}>
    <div className="wrapper clear"> 
    {cardOpened ? 
    <Drawer 
      items={cartItems} 
      onClose={()=> setCardOpened(false)} 
      onRemove = {onRemoveItem}
    /> : null}    

    <Header onClickCart ={()=> setCardOpened(true)} /> 

     <Routes>
       <Route path="/" element={
         <Home
             items ={items}
             cartItems = {cartItems}
             searchValue = {searchValue}
             setSearchValue = {setSearchValue}
             onChangeSearchValue ={onChangeSearchValue}
             onAddToFavorite = {onAddToFavorite}
             addToCart = {addToCart}
             isLodaing={isLodaing}
         />
       }>

       </Route>

       <Route path="/favorites" element={
         <Favorites
             // onAddToFavorite={onAddToFavorite}
         />
       }>
       </Route>

       <Route path="/orders" element={
         <Orders/>
       }>

       </Route>

     </Routes>

    </div>
  </AppContext.Provider>
  );    
}

export default App;
