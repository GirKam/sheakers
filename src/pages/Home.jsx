
import Card from "../components/Card";
import React from "react";



function Home(
    {items,
    cartItems,
    searchValue,
    setSearchValue,
    onChangeSearchValue,
    onAddToFavorite,
    addToCart,
    isloading
    }){



      const renderItem=()=>{
        const filtredItems = items.filter(item =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()));         

        return(isloading ? [...Array(10)] : filtredItems).map((item,index)=>(
            <Card 
              key={index}
              onFavorite = {onAddToFavorite}
              onPlus = {addToCart}
              // adedd ={isItemAdded(item && item.id)}
              loading ={isloading}
              {...item}
            /> 
          ));
      }
    return(
        <>
        <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
      <h1 > {searchValue ? `Поиск по запросу: ${searchValue}`: 'Все кроссовки'}  </h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="search"/>
          {searchValue && <img onClick={()=>setSearchValue('')} className='clear' src="/img/btn-remove.svg" width={30} height={30} alt="Clear"/>}
          <input 
           onChange={onChangeSearchValue}
           value={searchValue} 
           placeholder="Поиск...."
           />
        </div>
      </div>   

      <div className="d-flex flex-wrap">
        {renderItem()}               
      </div>     
    </div> 
        </>
    );
}

export default Home;