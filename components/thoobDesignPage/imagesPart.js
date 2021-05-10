import React, { Component } from "react";
import { connect } from "react-redux";
import Images from "./includes/images";

export class ImagesPart extends Component {
    render(){
        let { images } = this.props;
        return (
            <>
                {images.length > 0 ? <Images productImages={images} /> : ""}
            </>
        );
    }
}

function mapStateToProps(state) {
  return {
    images: state.customsReducer.images,
    language: state.generalReducer.language,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(ImagesPart);
