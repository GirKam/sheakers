
import React from 'react'
import {AppContext} from '../App'


const Info = ({title, desciption}) => {

    
const {setCardOpened} = React.useContext(AppContext)
  return (
    <div className="cartEmpty align-center justify-center flex-colomn flex">
          <h2>{title}</h2>
          <p className="opacity-6"> {desciption}</p>
          <button className="greenButton" onClick={()=>setCardOpened(false)}>           
            Вернуться назад
          </button>
    </div>
  )
}

export default Info
