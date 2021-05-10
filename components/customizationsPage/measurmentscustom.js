import React, { Component } from 'react';
import { connect } from 'react-redux';
import SizeSection from '../includes/measurementPart'
import QuantitySection from '../includes/quantityPart'
import $ from "jquery";
// import { getMeasurments , getMeasurementSuccess } from '../../actions/customizationsPage/measurementsActions';
import { incrementQuantity,decrementQuantity} from '../../actions/includes/carouselActions';
export class MeasurementsCustom extends Component {
  componentDidMount(){
    //patams language
    // this.props.getMeasurments("1");
  }
  constructor(props) {
   super(props);
     this.handleMinusClick = this.handleMinusClick.bind(this);
      this.handlePlusClick = this.handlePlusClick.bind(this);
  }
  // storeSizeID(sizeId){
  //   this.props.storeSizeID(sizeId);
  // }
  handlePlusClick(){
    this.props.incrementQuantity();
  }
  handleMinusClick(){
    this.props.decrementQuantity();
  }
  render() {
    // const { measurementsitems } = this.props;
    // if(measurementsitems.items){
      return(
        <div className="custom text-right">
          <QuantitySection quantity={this.props.quantity} handlePlusClick={this.handlePlusClick} handleMinusClick={this.handleMinusClick}/>
          <SizeSection pathname={this.props.pathname} sizeType={this.props.sizeType} measurementsTable={this.props.measurementsTable}/>
        </div>
      )
    // }else{
    //   return (
    //     <div>loading ... </div>
    //   )
    // }
  }
}

function mapStateToProps(state){
  return{
      // measurementsitems: state.customsReducer.measurementsitems,
      quantity:state.carouselReducer.present.quantity,
			sizeType:state.customsReducer.sizeType,
			measurementsTable: state.customsReducer.measurementsTable
      // itemPresent:state.carouselReducer.present
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // getMeasurments(language) {
    //     dispatch(getMeasurments(language))
    // },
    decrementQuantity(){
      dispatch(decrementQuantity())
    },
    incrementQuantity(){
      dispatch(incrementQuantity())
    },
  };
}

//binding actions with component
export default connect(mapStateToProps, mapDispatchToProps)(MeasurementsCustom);
