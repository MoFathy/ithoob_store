import { getHomeSections } from "./homeSections";
import { getBanner } from "./homeBanner";

import { getHomeProducts } from "./homeProducts";


export const homeProducts = language => dispatch => {
    return Promise.all([
      dispatch(getHomeProducts(language)),
      // dispatch(getHomeSections(language)),
      // dispatch(getBanner(language))
    ]).then(res => {
      // console.log(res);
    });
    // getHomeProducts(language);
    // getHomeSections(language);
    // getBanner(language);
  };

  export const homeSections = language => dispatch => {
      return Promise.all([
        // dispatch(getHomeProducts(language)),
        dispatch(getHomeSections(language)),
        // dispatch(getBanner(language))
      ]).then(res => {
        // console.log(res);
      });
      // getHomeProducts(language);
      // getHomeSections(language);
      // getBanner(language);
    };

    export const homeBanner = language => dispatch => {
        return Promise.all([
          // dispatch(getHomeProducts(language)),
          // dispatch(getHomeSections(language)),
          dispatch(getBanner(language))
        ]).then(res => {
          // console.log(res);
        });
        // getHomeProducts(language);
        // getHomeSections(language);
        // getBanner(language);
      };
