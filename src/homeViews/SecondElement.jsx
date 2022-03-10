import React, { useEffect, useState, useCallback } from "react";
function SecondElement({itemData}) {
  const newData = [].concat(itemData);
  return(
    <div className="second-element">
        {/*display="flex" alignItems="center" justifyContent="center" flex-diration="column" width={"64px"} */}
      {newData.map((item, index)=>(
        <div className="element-content" key={index}>
          <img className="element-number" src={item.imgUrl.default} alt="" />
          <div className="element-title">{item.title}</div>
          <div className="element-info">{item.info}</div>
        </div>
      ))}

    </div>
  )
}
export default SecondElement;