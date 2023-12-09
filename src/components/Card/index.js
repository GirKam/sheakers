import styleCard from './Card.module.scss';
import React from 'react';
import ContentLoader from "react-content-loader";
import {AppContext} from '../../App';

function Card(
    {
        id,
        imageUrl,
        title,
        price,
        onFavorite,
        onPlus,
        index,
        favorited = false,
        adedd = false,
        loading = false
    }){
    
    
    const {isItemAdded} = React.useContext(AppContext)

     let [isFavorite, setIsFavorite] = React.useState(favorited);


     const onClickPlus = ()=>{   
        onPlus({id,imageUrl,title,price,index});        
     }


     const onClickFavorite = ()=>{   
        onFavorite({id,imageUrl,title,price,index});         
        setIsFavorite(!isFavorite)  
     }

    return(
        <div className={styleCard.card}> 

        {
            loading ? <ContentLoader 
            speed={2}
            width={150}
            height={265}
            viewBox="0 0 150 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">

            <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
            <rect x="0" y="98" rx="5" ry="5" width="150" height="15" /> 
            <rect x="0" y="122" rx="5" ry="5" width="100" height="15" /> 
            <rect x="0" y="151" rx="5" ry="5" width="80" height="25" /> 
            <rect x="119" y="150" rx="100" ry="100" width="30" height="30" />
        </ContentLoader> : 
        <>
           {onFavorite && 
           <div className = {styleCard.favorite}>
              <img src={isFavorite ? "/img/heart_like.svg" : '/img/heart1.svg'} onClick={onClickFavorite} alt='pp'/>
            </div>}
        
            <img width={133} height={112} src={imageUrl} alt="ll"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b> {price} руб.</b>            
                </div>
               
                {onPlus && <img className={styleCard.plus}
                    onClick={onClickPlus} 
                    src={isItemAdded(id) ? "/img/btn-plus-check1.svg" : "/img/btn-plus.svg"} 
                    alt='plus'
                 />  }          
            </div>
        </>
        }           
             
        </div> 
    );
}

export default Card;