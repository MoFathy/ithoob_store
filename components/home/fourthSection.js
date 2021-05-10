import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";

class FourthSection extends Component {
  render() {
    const {
      fourthSection,
      athwabCategory,
      clothesCategory,
      accessoriesCategory,
      shoesCategory
    } = this.props;

    return this.props.status && fourthSection ? (
      <div className="fourthSection">
        <div className="outterContainer">
        <div className="container homeSections">
        
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h2>{fourthSection.title}</h2>
              <p>{fourthSection.desc}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 one-row-column">
              <Link
      

                as={`/products-list/${athwabCategory.slug}`}
                href={`/products-list?slug=${athwabCategory.slug}`}
              >
                <div className="categoryBlock">
                  <img
                    className="lazyload"
                 
                    data-src={athwabCategory.img}
                    alt={athwabCategory.title}
                  />
                  <div className="sharedSection__overlay">
                    {/* <Link
                  // href={`/${fourthSection.categories.athwab.linkPath}`}

                  as={`/products-list/${athwabCategory.slug}`}
                  href={`/products-list?slug=${athwabCategory.slug}`}
                > */}
                    <a>
                      <h3 className="text-center">{athwabCategory.title}</h3>
                    </a>
                    {/* </Link> */}
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-7 two-row-column">
              <div className="row">
                <div className="col-12 has-one">
                  <Link
             
                    as={`/products-list/${clothesCategory.slig}`}
                    href={`/products-list?slug=${clothesCategory.slug}`}
                  >
                    <div className="categoryBlock clothes">
                      <img
                        className="lazyload"
                        // src={fourthSection.categories.clothes.img}
                        alt={clothesCategory.title}
                        data-src={clothesCategory.img}
                      />
                      <div className="sharedSection__overlay">
     
                        <a>
                          <h3 className="text-center">
                            {clothesCategory.title}
                          </h3>
                        </a>
               
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-12 has-two">
                  <div className="row">
                    <div className="col-md-5 box">
                      <Link
               
                        as={`/products-list/${shoesCategory.slug}`}
                        href={`/products-list?slug=${shoesCategory.slug}`}
                      >
                        <div className="categoryBlock">
                          <img
                            className="lazyload"
                      
                            data-src={shoesCategory.img}
                            alt={shoesCategory.title}
                          />
                          <div className="sharedSection__overlay">
             
                            <a>
                              <h3 className="text-center">
                                {shoesCategory.title}
                              </h3>
                            </a>
                        
                          </div>
                        </div>
                      </Link>
                    </div>
                  
                    <div className="col-md-7 box">
                      <Link
              

                        as={`/products-list/${accessoriesCategory.slug}`}
                        href={`/products-list?slug=${accessoriesCategory.slug}`}
                      >
                        <div className="categoryBlock">
                          <img
                            className="lazyload"
                       
                            data-src={accessoriesCategory.img}
                            alt={accessoriesCategory.title}
                          />
                          <div className="sharedSection__overlay">
              
                            <a>
                              <h3 className="text-center">
                                {accessoriesCategory.title}
                              </h3>
                            </a>
                     
                          </div>
                        </div>
                      </Link>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
   
        </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
const mapHomeSectionsStateToProps = state => ({
  status: state.homeSections.status,
  message: state.homeSections.message,
  language: state.homeSections.language,
  fourthSection: state.homeSections.fourthSection,
  athwabCategory: state.homeProducts.athwabCategory,
  clothesCategory: state.homeProducts.clothesCategory,
  accessoriesCategory: state.homeProducts.accessoriesCategory,
  shoesCategory: state.homeProducts.shoesCategory
});
export default connect(
  mapHomeSectionsStateToProps,
  null
)(FourthSection);
