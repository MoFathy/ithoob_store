import React, { Component } from 'react';
import AkmamContent from '../../components/includes/newCarousel';
import { connect } from 'react-redux';
import { getAkmam } from '../../actions/customizationsPage/akmamActions';
import ItemsContainer from './includes/itemsContainer';
// import $ from "jquery";
export class SleeveCard extends Component {
componentDidMount(){
this.props.getAkmam(this.props.language===false ? 1 : 2);

}
componentDidUpdate(prevProps){
 if(this.props.language !== prevProps.language){
   this.props.dispatch(
      getAkmam(this.props.language===false ? 1 : 2)
    );
 }
}
  render() {
    const {akmamObject} = this.props;
      if(akmamObject){
        return (
          <div id="akmam" className="custom text-right">
          {
            akmamObject.map((item,index)=>{
              return (
                <div className="custom__items" key={"akmam"+item.id} style={this.props.itemid !== undefined ? {display:"block"} : index !== 0 ? {display:"none"} : {} }>
                  <ItemsContainer type="akmamArray"  Id={item.id}  itemid={this.props.itemid}   customObject={item} key={"akmam"+item.id} />
                </div>
              )
            })
          }
          </div>
        )
      }else{
        return(
          <div></div>
        )
      }
  }
}
function mapStateToProps(state){
  return{
    akmamObject: state.customsReducer.akmamobject,
    language: state.generalReducer.language
  }
}
function mapDispatchToProps(dispatch)  {
  return {
    getAkmam(language){
        dispatch(getAkmam(language));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SleeveCard);
