import axios from "axios";
import React from "react";
import Card from "../components/Card";
import { AppContext } from "../App";

function Orders(){

  const {onAddToFavorite,addToCart} = React.useContext(AppContext)
  const [isLodaing, setIsLodaing] = React.useState(true);

  const [order, setOrders] = React.useState([]);

  React.useEffect(()=>{
    (async ()=>{
      try {
        const {data} =  await axios.get('https://6565d6d1eb8bb4b70ef26f35.mockapi.io/orders')      
        setOrders(data.reduce((prev,obj) =>[...prev, ...obj.items],[]))
        setIsLodaing(false)
        console.log(data);
        
      } catch (error) {
        alert('Ошибка при запросе заказов')      
        console.error(error)  
      }
    })()    
  },[])


  return(
    <>
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1 > Мои Заказы </h1>
      </div>   

      <div className="d-flex flex-wrap">
        {(isLodaing ? [...Array(10)] : order).map((item,index)=>(
        
          <Card 
            key={index}
            onFavorite = {onAddToFavorite}
            onPlus = {addToCart}
            loading ={isLodaing}
            {...item}
          /> 
        ))}           
      </div>     
    </div> 
    </>
  );
}

export default Orders;