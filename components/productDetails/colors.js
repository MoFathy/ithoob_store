import React, { Component } from "react";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";


class Colors extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
    return (
      <div
        className={this.props.closeBtnIsShown ?
          this.props.getEidtsIsLoading
            ? "colors form-group isLoading"
            : "colors form-group"
            :"colors form-group text-right"
        }
      >
        <label>{getStringVal(this.props.language, "THE_COLOR")}</label>
        {this.props.colors.map((color, index) => (
          <img
            className={
              (color.default == true && this.props.selectedColorId == "") ||
              (color.default == true && !this.props.selectedColorId) ||
              this.props.selectedColorId == color.id
                ? "active lazyload"
                : "lazyload"
            }
            src={color.img}
            atr=""
            key={index}
            id={color.id}
            onClick={
              this.props.closeBtnIsShown
                ? () => this.props.handleColorClick(color.id)
                : ""
            }
          />
        ))}
      </div>
    );
  }
}
const mapCartHeaderStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobCookie: state.loginReducer.ithoobCookie,
  cartCount: state.cartHeader.cartCount,
  cartItems: state.cartHeader.cartItems
});

export default connect(
  mapCartHeaderStateToProps,
  null
)(Colors);
