import React from "react"



export default function Die(props)
{

  const styles={
    backgroundColor:props.isheld == true ? "#59E391" : "white"
  }

  
  return(

   <div className="ct"> 
     
     <h2 className="b" style={styles}  onClick={props.holdDice} >{props.val}</h2>
   
   </div>

    
  )
}