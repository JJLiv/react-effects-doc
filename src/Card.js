import React from "react";

const Card = ({ id, value, suit, img}) => {
    return (
        <div>
            <h2>{value} of {suit}</h2>
            <img src={img} alt=""></img>            
        </div>
    )
}

export default Card;