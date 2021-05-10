import React, { Component } from 'react';
import FabricContent from '../../components/includes/newCarousel';
// import $ from "jquery";
import { connect } from 'react-redux';
import FabricsContainer from './includes/fabricsContainer';
export class FabricsCard extends Component {

  render() {
    const {fabricsObject} = this.props;
      if(fabricsObject){
        return (
          <div id="fabrics" className="custom text-right">
          {
            fabricsObject.map((item,index)=>{
              return (
                <div className="custom__items" key={"fabric"+item.id} style={this.props.itemid !== undefined ? {display:"block"} : index !== 0 ? {display:"none"} : {} }>
                  <FabricsContainer type="fabricArray"  itemid={this.props.itemid} Id={item.id} customObject={item} key={"fabric"+item.id}/>
                </div>
              )
            })
          }
          </div>
        )
      }
  }
}
function mapStateToProps(state){
  return{
    fabricsObject: state.customsReducer.generalitems
  }
}
export default connect(mapStateToProps, null)(FabricsCard);
