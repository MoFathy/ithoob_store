import React, { Component } from "react";
import { connect } from "react-redux";
import { changeDeliveryAddress } from "../../actions/checkout/confirmPayment";
import { getCountries } from "../../actions/signupPopUp/signupActions";
import { getStringVal } from "../../scripts/multiLang";

class DeliveryAddress extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCountries(this.props.language === false ? 1 : 2);
  }
  render() {
    return (
      <div className="delivery-address">
        <div className="row">
          <div className="col-6">
            <div className=" form-group region">
              <label htmlFor="region">
                {getStringVal(this.props.language, "REGION")}
              </label>
              <select
                  className="form-control"
                  id="region"
                  onChange={(e) => this.props.changeDeliveryAddress({...this.props.deliveryAddress, region : e.target.value})}
                >
                  {this.props.countries && this.props.countries[0] ? this.props.countries[0].areas.map(area=> {
                    return <option value={area.name} key={area.id}>{area.name}</option>
                  }) : <option value={'الرياض'}>الرياض</option>}
                </select>
              {/* <input
                type="text"
                ref="region"
                className="nameInput form-control"
                id="region"
                disabled
                value="الرياض"
                onChange={(e) => this.props.changeDeliveryAddress({...this.props.deliveryAddress, origin : e.target.value})}
              /> */}
            </div>
            <p className="invalidInput__region" />
          </div>
          <div className="col-6">
            <div className=" form-group naighborhood">
              <label htmlFor="naighborhood">
                {getStringVal(this.props.language, "THE_NAIGHBORHOOD")}
              </label>
              <input
                type="text"
                ref="naighborhood"
                className="nameInput form-control"
                maxLength="25"
                id="naighborhood"
                onChange={(e) => this.props.changeDeliveryAddress({...this.props.deliveryAddress, naighborhood : e.target.value})}

              />
            </div>
            <p className="invalidInput__naighborhood" />
          </div>
          <div className="col-6">
            <div className=" form-group street">
              <label htmlFor="street">
                {getStringVal(this.props.language, "THE_STREET")}
              </label>
              <input
                type="text"
                ref="street"
                maxLength="15"
                className="form-control"
                id="street"
                onChange={(e) => this.props.changeDeliveryAddress({...this.props.deliveryAddress, street : e.target.value})}

              />
            </div>

            <p className="invalidInput__street" />
          </div>
          <div className="col-6">
            <div className=" form-group milestone">
              <label htmlFor="milestone">
                {getStringVal(this.props.language, "NERABY_MILESTONE")}
              </label>
              <input
                type="text"
                ref="milestone"
                maxLength="15"
                className="form-control"
                id="milestone"
                onChange={(e) => this.props.changeDeliveryAddress({...this.props.deliveryAddress, milestone : e.target.value})}

              />
            </div>
            <p className="invalidInput__milestone" />
          </div>
          <div className="col-12">
            <div className=" form-group details">
              <label htmlFor="details">
                {getStringVal(this.props.language, "OTHER_DETAILS")}
              </label>
              <textarea
                className="form-control"
                rows="3"
                type="text"
                ref="details"
                maxLength="100"
                className="form-control"
                id="details"
                onChange={(e) => this.props.changeDeliveryAddress({...this.props.deliveryAddress, details : e.target.value})}

              ></textarea>
            </div>
          </div>
          <div className="col-12">
            <p className="mt-2">
              {getStringVal(this.props.language, "THE_SUITABLE_TIME")}
            </p>
          </div>
          <div className="col-6">
            <div className=" form-group from">
              <label htmlFor="from" className="time-label">
                {getStringVal(this.props.language, "FROM")}
              </label>
              <input
                type="datetime-local"
                ref="from"
                maxLength="15"
                className="form-control"
                id="from"
                onChange={(e) => this.props.changeDeliveryAddress({...this.props.deliveryAddress, from : e.target.value})}

              />
            </div>
            <p className="invalidInput__from" />
          </div>
          <div className="col-6">
            <div className=" form-group to">
              <label htmlFor="to" className="time-label">
                {getStringVal(this.props.language, "TO")}
              </label>
              <input
                type="datetime-local"
                ref="to"
                maxLength="15"
                className="form-control"
                id="to"
                onChange={(e) => this.props.changeDeliveryAddress({...this.props.deliveryAddress, to : e.target.value})}

              />
            </div>
            <p className="invalidInput__to" />
          </div>
        </div>
      </div>
    );
  }
}

const mapDelieveryStateToProps = (state) => ({
  language: state.generalReducer.language,
  deliveryAddress: state.checkout.deliveryAddress,
  countries: state.signupReducer.countries,
});

const mapDelieveryDispatchToProps = (dispatch) => ({
  changeDeliveryAddress: (payload) => {
    dispatch(changeDeliveryAddress(payload));
  },
  getCountries(lang) {
    dispatch(getCountries(lang));
  },

});

export default connect(
  mapDelieveryStateToProps,
  mapDelieveryDispatchToProps
)(DeliveryAddress);
