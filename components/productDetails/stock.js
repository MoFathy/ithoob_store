import React, { useEffect, useState } from "react";

const Stock = (props) => {
  const [state, setState] = useState({
    color: null,
    size: null,
    fabric: null,
    stockId: null,
  });
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [shoesColors, setShoesColors] = useState([]);

  useEffect(() => {
    // set initial stock options
    _getCurrentState();
  }, []);

  const _getCurrentState = () => {
    let sizesState = [];
    let colorsState = [];
    let shoesColorsState = [];
    let fabricsState = [];

    props.stock.forEach((element) => {
      if (
        element.size != null &&
        sizesState.filter((e) => e.name === element.size.name).length == 0
      ) {
        sizesState.push({ ...element.size, qunId: element.id });
      }
      if (
        element.color != null &&
        colorsState.filter((e) => e.id === element.color.id).length == 0
      ) {
        colorsState.push({ ...element.color, qunId: element.id });
      }
      if (
        element.fabric != null &&
        fabricsState.filter((e) => e.name === element.fabric.name).length == 0
      ) {
        fabricsState.push({ ...element.fabric, qunId: element.id });
      }
      if (
        element.shoesColor != null &&
        shoesColorsState.filter((e) => e.name === element.shoesColor.name)
          .length == 0
      ) {
        shoesColorsState.push({ ...element.shoesColor, qunId: element.id });
      }
    });
    console.log("sisssssssss", sizesState);
    setSizes(sizesState);
    setColors(colorsState);
    setFabrics(fabricsState);
    setShoesColors(shoesColorsState);
  };

  //on sselecting color get connected other options
  const handleColorSelect = (id, quantity_id) => {
    let newsizes = [];
    let newfabrics = [];
    props.stock.forEach((element) => {
      if (
        element.size != null &&
        ((element.color != null && element.color.id === id) ||
          (element.shoesColor != null && element.shoesColor.id === id)) &&
        newsizes.filter((e) => e.name === element.size.name).length == 0
      ) {
        console.log(`${id} == ${element.id}`);
        newsizes.push({ ...element.size, qunId: element.id });
      }
      if (
        element.fabric != null &&
        ((element.color != null && element.color.id === id) ||
          (element.shoesColor != null && element.shoesColor.id === id)) &&
        newfabrics.filter((e) => e.name === element.fabric.name).length == 0
      ) {
        newfabrics.push({ ...element.fabric, qunId: element.id });
      }
    });
    setSizes(newsizes);
    setFabrics(newfabrics);
    setState({ ...state, color: id });
    let size = state.size == null ? newsizes[0].name : state.size;
    props.selectStock({ ...state, size: size, quantity_id: quantity_id });
  };

  //on selecting size get connected other options
  const handleSizeSelect = (sizeId, quantity_id) => {
    props.selectStock({ ...state, size: sizeId, quantity_id: quantity_id });
    let newcolors = [];
    let newFabrics = [];
    let newShoesColors = [];
    props.stock.forEach((element) => {
      if (
        element.color != null &&
        element.size.name === sizeId &&
        newcolors.filter((e) => e.id === element.color.id).length == 0
      ) {
        newcolors.push({ ...element.color, qunId: element.id });
      }
      if (
        element.fabric != null &&
        element.size.name === sizeId &&
        newFabrics.filter((e) => e.name === element.fabric.name).length == 0
      ) {
        newFabrics.push({ ...element.fabric, qunId: element.id });
      }
      if (
        element.shoesColor != null &&
        element.size.name === sizeId &&
        newShoesColors.filter((e) => e.name === element.shoesColor.name)
          .length == 0
      ) {
        newShoesColors.push({ ...element.shoesColor, qunId: element.id });
      }
    });
    setColors(newcolors);
    setFabrics(newFabrics);
    setShoesColors(newShoesColors);
    setState({ ...state, size: sizeId });
  };

  //on sselecting color get connected other options
  const handleFabricSelect = (fabricId, quantity_id) => {
    let newcolors = [];
    let newsizes = [];
    let newShoesColors = [];
    props.stock.forEach((element) => {
      if (
        element.size != null &&
        element.fabric.id === fabricId &&
        newsizes.filter((e) => e.name === element.size.name).length == 0
      ) {
        newsizes.push({ ...element.size, qunId: element.id });
      }
      if (
        element.color != null &&
        element.fabric.id === fabricId &&
        newcolors.filter((e) => e.id === element.color.id).length == 0
      ) {
        newcolors.push({ ...element.color, qunId: element.id });
      }
      if (
        element.shoesColor != null &&
        element.fabric.id === fabricId &&
        newShoesColors.filter((e) => e.name === element.shoesColor.name)
          .length == 0
      ) {
        newShoesColors.push({ ...element.shoesColor, qunId: element.id });
      }
    });
    setColors(newcolors);
    setSizes(newsizes);
    setShoesColors(newShoesColors);
    setState({ ...state, fabric: fabricId });
    let size = state.size == null ? newsizes[0].name : state.size;
    props.selectStock({ ...state, size: size, quantity_id: quantity_id });
  };

  return (
    <div className="stock-options">
      <div className="Sizes-stock d-flex justify-content-center">
        {sizes.map((st) => (
          <div
            key={st.id}
            className={
              "stock-item d-flex justify-content-center p-2 m-1" +
              (state.size == st.id || props.quantity_id == st.qunId
                ? " active"
                : " not")
            }
            onClick={() => handleSizeSelect(st.name, st.qunId)}
            style={{
              border:
                state.size == st.id
                  ? "3px solid #b78b1e !important"
                  : "1px solid black",
              cursor: "pointer",
            }}
          >
            <span>{st.name}</span>
          </div>
        ))}
      </div>
      <div className="colors-stock d-flex justify-content-center">
        {colors.map((st) => (
          <div
            key={st.id}
            className={
              "stock-item d-flex justify-content-center p-1 m-1" +
              (state.color == st.id || props.quantity_id == st.qunId
                ? " active"
                : " not")
            }
            onClick={() => handleColorSelect(st.id, st.qunId)}
            style={{
              border:
                state.color == st.id
                  ? "3px solid #b78b1e !important"
                  : "1px solid black",
              cursor: "pointer",
            }}
          >
            <img src={st.img} width="30px" className="" />
          </div>
        ))}
        {shoesColors.map((st) => (
          <div
            key={st.id}
            className={
              "stock-item d-flex justify-content-center p-1 m-1" +
              (state.color == st.id || props.quantity_id == st.qunId
                ? " active"
                : " not")
            }
            onClick={() => handleColorSelect(st.id, st.qunId)}
            style={{
              border:
                state.color == st.id
                  ? "3px solid #b78b1e !important"
                  : "1px solid black",
              cursor: "pointer",
            }}
          >
            <img src={st.image} width="30px" className="" />
          </div>
        ))}
      </div>
      <div className="fabrics-stock d-flex justify-content-center">
        {fabrics.map((st) => (
          <div
            key={st.id}
            className={
              "stock-item d-flex justify-content-center p-1 py-2 m-1 " +
              (state.fabric == st.id || props.quantity_id == st.qunId ? " active" : " not")
            }
            onClick={() => handleFabricSelect(st.id, st.qunId)}
            style={{
              border:
                state.fabric == st.id
                  ? "3px solid #b78b1e !important"
                  : "1px solid black",
              cursor: "pointer",
            }}
          >
            <span>{st.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stock;
