import React, { useEffect, useState } from "react";

const StockVariation = (props) => {
  const [state, setState] = useState({
    color: null,
    size: null,
    id: null,
  });
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // set initial stock options
    _getCurrentState();
  }, []);

  const _getCurrentState = () => {
    let sizesState = [];
    let colorsState = [];

    props.stockVariation.forEach((element) => {
      if (
        element.size != null &&
        sizesState.filter((e) => e.size === element.size).length == 0
      ) {
        sizesState.push({ size:element.size, qunId: element.id });
      }
      if (
        element.color != null &&
        colorsState.filter((e) => e.color === element.color).length == 0
      ) {
        colorsState.push({ color:element.color, qunId: element.id });
      }
    });
    console.log("size is", sizesState);
    console.log("stockVariation", props.stockVariation);
    setSizes(sizesState);
    setColors(colorsState);
  };

  //on selecting color get connected other options
  const handleColorSelect = (id, quantity_id) => {
    // let newsizes = [];
    // let newfabrics = [];
    // props.stockVariation.forEach((element) => {
    //   if (
    //     element.size != null &&
    //     ((element.color != null && element.color.id === id) ||
    //       (element.shoesColor != null && element.shoesColor.id === id)) &&
    //     newsizes.filter((e) => e.name === element.size.name).length == 0
    //   ) {
    //     console.log(`${id} == ${element.id}`);
    //     newsizes.push({ ...element.size, qunId: element.id });
    //   }
    //   if (
    //     element.fabric != null &&
    //     ((element.color != null && element.color.id === id) ||
    //       (element.shoesColor != null && element.shoesColor.id === id)) &&
    //     newfabrics.filter((e) => e.name === element.fabric.name).length == 0
    //   ) {
    //     newfabrics.push({ ...element.fabric, qunId: element.id });
    //   }
    // });
    // setSizes(newsizes);
    // setFabrics(newfabrics);
    // setState({ ...state, color: id });
    // let size = state.size == null ? newsizes[0].name : state.size;
    props.selectStock({ ...state, quantity_id: quantity_id });
  };

  //on selecting size get connected other options
  const handleSizeSelect = (sizeId, quantity_id) => {
    props.selectStock({ ...state, quantity_id: quantity_id });
    // let newcolors = [];
    // let newFabrics = [];
    // let newShoesColors = [];
    // props.stock.forEach((element) => {
    //   if (
    //     element.color != null &&
    //     element.size.name === sizeId &&
    //     newcolors.filter((e) => e.id === element.color.id).length == 0
    //   ) {
    //     newcolors.push({ ...element.color, qunId: element.id });
    //   }
    //   if (
    //     element.fabric != null &&
    //     element.size.name === sizeId &&
    //     newFabrics.filter((e) => e.name === element.fabric.name).length == 0
    //   ) {
    //     newFabrics.push({ ...element.fabric, qunId: element.id });
    //   }
    //   if (
    //     element.shoesColor != null &&
    //     element.size.name === sizeId &&
    //     newShoesColors.filter((e) => e.name === element.shoesColor.name)
    //       .length == 0
    //   ) {
    //     newShoesColors.push({ ...element.shoesColor, qunId: element.id });
    //   }
    // });
    // setColors(newcolors);
    // setFabrics(newFabrics);
    // setShoesColors(newShoesColors);
    // setState({ ...state, size: sizeId });
  };


  return (
    <div className="stock-options">
      <div className="Sizes-stock d-flex justify-content-center">
        {sizes.map((st) => (
          <div
            key={st.id}
            className={
              "stock-item d-flex justify-content-center p-2 m-1" +
              (props.quantity_id == st.qunId
                ? " active"
                : " not")
            }
            onClick={() => handleSizeSelect(st.size, st.qunId)}
            style={{
              border:
              props.quantity_id == st.qunId
                  ? "3px solid #b78b1e !important"
                  : "1px solid black",
              cursor: "pointer",
            }}
          >
            <span>{st.size}</span>
          </div>
        ))}
      </div>
      <div className="colors-stock d-flex justify-content-center">
        {colors.map((st) => (
          <div
            key={st.id}
            className={
              "stock-item d-flex justify-content-center p-1 m-1" +
              (props.quantity_id == st.qunId
                ? " active"
                : " not")
            }
            onClick={() => handleColorSelect(st.id, st.qunId)}
            style={{
              border:
              props.quantity_id == st.qunId
                  ? "3px solid #b78b1e !important"
                  : "1px solid black",
              cursor: "pointer",
              width:"40px",
              height: "40px",
              background: st.color
            }}
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockVariation;
