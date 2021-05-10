import React, { Component } from "react";
import Link from "next/link";

class HomeSection extends Component {
  render() {
    const { dataSection, dataClassName } = this.props;
    return dataSection ? (
      <div className={` homeSections sharedSection ${dataClassName}`}>
        <img
          src={dataSection.imgSrc}
          alt={dataSection.title}
          className="w-100"
        />

        <div className="sharedSection__overlay">
          <div className="container">
            {/* <div className="col-lg-5 mx-auto"> */}
            <h2>{dataSection.title}</h2>
            <p>{dataSection.desc}</p>
            {/* <Link href={`/${dataSection.linkPath}`}>
                <button className="button">{dataSection.linkTitle}</button>
              </Link> */}
            <Link href={dataSection.linkPath}>
              <button className="button">{dataSection.linkTitle}</button>
            </Link>
            {/* </div> */}
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
export default HomeSection;
