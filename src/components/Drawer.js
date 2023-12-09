import React from "react";
import Info from "./info";
import {AppContext} from '../App'
import axios from "axios";


const delay = (ms)=> new Promise((resolve) => setTimeout(resolve,ms))

function Drawer({onClose,onRemove,items = []}){

  const [isOrderComplited, setIsOrderComplited] = React.useState();
  const [isLodaing, setIsLodaing] = React.useState();
  const [orderId, setOrderId] = React.useState(null);
  
  const {cartItems,setCartItems} = React.useContext(AppContext)

  let totalPrice = cartItems.reduce((sum, obj)=> obj.price + sum, 0);
  let tax = (totalPrice/100*5).toFixed(2);
  

  const onClickOrder = async ()=>{
    try {
      setIsLodaing(true)
      const {data} = await axios.post('https://6565d6d1eb8bb4b70ef26f35.mockapi.io/orders',{
        items: cartItems
      })   
      
      setOrderId (data.id)
      setIsOrderComplited(true)
      setCartItems([])

      

      for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        await axios.delete('https://6558be74e93ca47020a9ac36.mockapi.io/cart/' + item.id)
        await delay(1000);        
      }

    } catch (error) {
        alert("Не удалось сделать заказ!")    
    }
    setIsLodaing(false)    
  }
    return(
        <div className='overlay'>
        <div className = 'drawer d-flex flex-column'>
        <h2 className=' d-flex justify-between mb-30'>
           Корзина {' '}
            <img className='removeBtn'onClick={onClose} src="/img/btn-remove.svg" width={30} height={30} alt="Close"/>
        </h2>

        {
          items.length > 0 ? (
            <>
            <div
              className='items'>
              {items.map((obj)=>(            
              <div key={obj.id} className='cartItem d-flex align-center mb-20'>              
                  <img width={50} height={50} src={obj.imageUrl} alt="ll"/>
                
                <div className='mr-20'>
                  <p className='mb-5'>{obj.title}</p>
                  <span>Цена:</span>
                  <b> {obj.price} руб.</b> 
                </div >            
                  <img onClick={()=>onRemove(obj.id)} className='removeBtn' src="/img/btn-remove.svg" width={30} height={30} alt=""/>
              </div>
              ))} 
          </div>
        
          <div className='cartTotalBlock'>
            <ul >
              <li className='mb-10 justify-between'>
                <span> Итого:</span>
                
                <b>{totalPrice} руб.</b>
              </li>
              <li className=' mb-10 justify-between'>
                <span> Налог 5%:</span>                
                <b>{tax} руб.</b>
              </li>
            </ul>
            <button disabled = {isLodaing} onClick={onClickOrder} className='greenButton'>
              Оформить заказ<img src='/img/arrow.svg' alt='' /></button>
          </div>
          </>) : 
        (<Info
          title = {isOrderComplited ? `Номер вашего заказа #: ${orderId}` : 'Корзина пустая'}
          desciption = {isOrderComplited ? "Спасибо что оформили" : 'Добавте хотя бы одну пару'}
        />)
        }

      </div>
      </div>

    );
}

export default Drawer;