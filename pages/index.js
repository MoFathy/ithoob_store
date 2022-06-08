import React, { Component } from "react";
import { connect } from "react-redux";
//included components
import Layout from "../components/layouts/mainLayout.js";
import Banner from "../components/home/banner";
import AthwabProducts from "../components/home/athwabProducts";
import ClothesProducts from "../components/home/clothesProducts";
import AccessoriesProducts from "../components/home/accessoriesProducts";
import RecommendedProducts from "../components/home/recommendedProducts";
import ShoesProducts from "../components/home/shoesProducts";
import FirstSection from "../components/home/firstSection";
import SecondSection from "../components/home/secondSection";
import ThirdSection from "../components/home/thirdSection";
import FourthSection from "../components/home/fourthSection";
import WhyIthoobPart from "../components/aboutPage/whyIthoobComponent";
//actions
import { setActiveMenu } from "../actions/header/categories.js";

import {
  homeSections,
  homeProducts,
  homeBanner
} from "../actions/home/homeActions";
import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import { getFromProductDetailsSatus } from "../actions/productDetails/productDetails";
// import { getHomeSections } from "../actions/home/homeSections";
import cookies from "next-cookies";
import Helmet from "react-helmet";
import WinterCollectionCategory from "../components/home/winterCollectionCategory.js";
import PerfumeCategory from "../components/home/perfumeCategory.js";

class Index extends Component {
  static async getInitialProps({ reduxStore, query, pathname, req }) {
    const { lang } = cookies({ req: req });
    const { ithoobUser } = cookies({ req: req });
    reduxStore.dispatch(setActiveMenu(pathname));
    reduxStore.dispatch(
      changeLangWithoutCookie(lang === "false" ? false : true)
    );

    if (ithoobUser) {
      reduxStore.dispatch(changeIthoobCookie(1));
    }
    await reduxStore.dispatch(homeSections(lang === "false" ? 1 : 2));

    return {
      queryString: query.code ? query.code : null,
      pathname: pathname
    };
  }
  componentDidMount() {
    this.props.dispatch(homeProducts(this.props.language === false ? 1 : 2));
    this.props.dispatch(homeBanner(this.props.language === false ? 1 : 2));
    this.props.dispatch(getFromProductDetailsSatus());
  }
  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.dispatch(homeSections(this.props.language === false ? 1 : 2));
      this.props.dispatch(homeProducts(this.props.language === false ? 1 : 2));
      this.props.dispatch(homeBanner(this.props.language === false ? 1 : 2));
    }
  }

  render() {
    console.log(this.props.sectionsOrder);
    return (
      <Layout
        queryString={this.props.queryString}
        pathname={this.props.pathname}
        classNameData="home"
      >
        <Helmet
          title={this.props.categories.siteTitle + " | Home"}
          meta={[
            {
              property: "description",
              content: this.props.categories.siteDescription
            },
            {
              property: "og:locale",
              content: this.props.language === false ? "en_US" : "ar"
            },
            { property: "og:type", content: "website" },
            {
              property: "og:title",
              content: this.props.categories.siteTitle + " | Home"
            },
            {
              property: "og:description",
              content: this.props.categories.siteDescription
            },
            {
              property: "og:site_name",
              content: this.props.categories.siteTitle + " | Home"
            },
            {
              property: "twitter:title",
              content: this.props.categories.siteTitle + " | Home"
            },
            {
              property: "twitter:description",
              content: this.props.categories.siteDescription
            }
          ]}
        />
        <Banner />
        {this.props.sectionsOrder.map(section => {
          if(section.section_name === "recommended_products" && section.isVisiable){return <RecommendedProducts />}
          else if(section.section_name === "latest_clothes" && section.isVisiable){return <AthwabProducts />}
          else if(section.section_name === "clothes_design" && section.isVisiable){return <FirstSection />}
          else if(section.section_name === "latest_accessories" && section.isVisiable){return <AccessoriesProducts />}
          else if(section.section_name === "latest_designs" && section.isVisiable){return <ClothesProducts />}
          else if(section.section_name === "winter_collection" && section.isVisiable){return <WinterCollectionCategory />}
          else if(section.section_name === "perfume" && section.isVisiable){return <PerfumeCategory />}
          else if(section.section_name === "banner_one" && section.isVisiable){return <SecondSection />}
          else if(section.section_name === "latest_shoes" && section.isVisiable){return <ShoesProducts />}
          else if(section.section_name === "banner_two" && section.isVisiable){return <ThirdSection />}
          else if(section.section_name === "why_iThoob" && section.isVisiable){return <WhyIthoobPart page="home" />}
        })}
        {/* <FourthSection /> */}
      </Layout>
    );
  }
}
const mapGeneralStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories,
  sectionsOrder: state.homeSections.sectionsOrder
});
export default connect(mapGeneralStateToProps, null)(Index);
