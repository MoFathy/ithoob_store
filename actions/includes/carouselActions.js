export const STORE__FABRICS = "STORE__FABRICS";
export const STORE__YAKA = "STORE__YAKA";
export const STORE__ZARZOUR = "STORE__ZARZOUR";
export const STORE__AKMAM = "STORE__AKMAM";
export const STORE__OTHERS = "STORE__OTHERS";
export const INCREMENT__QUANTITY = "INCREMENT__QUANTITY";
export const DECREMENT__QUANTITY = "DECREMENT__QUANTITY";
export const STORE__SIZEID = "STORE__SIZEID";
export const SIZEMAN__STATUS = "SIZEMAN__STATUS";
export const UNSELECT_SIZE = "UNSELECT_SIZE";
export const STORE_MEASUREID = "STORE_MEASUREID";
export const EMPTY_MEASUREMENT_ID = "EMPTY_MEASUREMENT_ID";
export const STORE_MEASUREMENTS = "STORE_MEASUREMENTS";
export const CHANGE_SHOES_SIZE = "CHANGE_SHOES_SIZE";
export const STORE_FABRIC_IMAGES = "STORE_FABRIC_IMAGES";
export const FABRIC_HEADER_IMAGES = "FABRIC_HEADER_IMAGES";
export const YAKA_HEADER_IMAGES = "YAKA_HEADER_IMAGES";
export const ZARZOUR_HEADER_IMAGES = "ZARZOUR_HEADER_IMAGES";
export const AKMAM_HEADER_IMAGES = "AKMAM_HEADER_IMAGES";
export const OTHERS_HEADER_IMAGES = "OTHERS_HEADER_IMAGES";
export const RESET_PRESENT_DATA = "RESET_PRESENT_DATA";
export const UPDATE_SIZEMAN__STATUS = "UPDATE_SIZEMAN__STATUS";

export const resetPresentData = () => {
  return {
    type: RESET_PRESENT_DATA
  };
};
export const storeHeaderFabricImages = (images, customCost, required) => {
  return {
    type: FABRIC_HEADER_IMAGES,
    images,
    customCost,
    required
  };
};
export const storeHeaderYakaImages = (images, customCost, required) => {
  return {
    type: YAKA_HEADER_IMAGES,
    images,
    customCost,
    required
  };
};
export const storeHeaderZarzourImages = (images, customCost, required) => {
  return {
    type: ZARZOUR_HEADER_IMAGES,
    images,
    customCost,
    required
  };
};
export const storeHeaderAkmamImages = (images, customCost, required) => {
  return {
    type: AKMAM_HEADER_IMAGES,
    images,
    customCost,
    required
  };
};
export const storeHeaderOthersImages = (images, customCost, required) => {
  return {
    type: OTHERS_HEADER_IMAGES,
    images,
    customCost,
    required
  };
};
export const storeFabricImages = fabricImages => {
  return {
    type: STORE_FABRIC_IMAGES,
    fabricImages
  };
};
export const storeMesurementsObject = () => {
  return {
    type: STORE_MEASUREMENTS
  };
};
export const emptyMeasurementId = () => {
  return {
    type: EMPTY_MEASUREMENT_ID
  };
};
export const userMeasureId = measureID => {
  return {
    type: STORE_MEASUREID,
    measureID
  };
};
export const unSelectSize = () => {
  return {
    type: UNSELECT_SIZE
  };
};
export const toggleSizeManBtn = () => {
  return {
    type: SIZEMAN__STATUS
  };
};
export const storeSizeID = sizeId => {
  return {
    type: STORE__SIZEID,
    sizeId
  };
};
export const incrementQuantity = () => {
  return {
    type: INCREMENT__QUANTITY
  };
};
export const decrementQuantity = () => {
  return {
    type: DECREMENT__QUANTITY
  };
};

export const storeFabrics = (fabricsArray, cost, imagesIds, required) => ({
  type: STORE__FABRICS,
  fabricsArray,
  cost,
  imagesIds,
  required
});
export const storeYaka = (
  yakaArray,
  cost,
  imagesIds,
  required,
  recomBetana,
  customtype
) => ({
  type: STORE__YAKA,
  yakaArray,
  cost,
  imagesIds,
  required,
  recomBetana,
  customtype
});
export const storeZarzour = (
  zarzourArray,
  cost,
  imagesIds,
  required,
  recomBetana,
  customtype
) => ({
  type: STORE__ZARZOUR,
  zarzourArray,
  cost,
  imagesIds,
  required,
  recomBetana,
  customtype
});
export const storeAkmam = (
  akmamArray,
  cost,
  imagesIds,
  required,
  recomBetana,
  customtype
) => ({
  type: STORE__AKMAM,
  akmamArray,
  cost,
  imagesIds,
  required,
  recomBetana,
  customtype
});
export const storeOthers = (othersArray, cost, imagesIds, required) => ({
  type: STORE__OTHERS,
  othersArray,
  cost,
  imagesIds,
  required
});
export const changeShoesSize = size => ({
  type: CHANGE_SHOES_SIZE,
  size
});

export const updateSizeMan = status => {
  // console.log("updateSizeMan from action");
  return {
    type: UPDATE_SIZEMAN__STATUS,
    status
  };
};
