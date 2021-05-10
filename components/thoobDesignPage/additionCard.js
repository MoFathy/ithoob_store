import React, { Component } from 'react';
import { connect } from 'react-redux';
import OthersContent from '../../components/includes/newCarousel';
import { getOthers } from '../../actions/customizationsPage/othersActions';
import ItemsContainer from './includes/itemsContainer';
// import $ from "jquery";
export class AdditionCard extends Component {
  componentDidMount(){
  this.props.getOthers(this.props.language===false ? 1 : 2);

  }
  componentDidUpdate(prevProps){
   if(this.props.language !== prevProps.language){
     this.props.dispatch(
        getOthers(this.props.language===false ? 1 : 2)
      );
   }
  }
  render() {
    const {othersObject} = this.props;
      if(othersObject){
        return (
          <div id="others" className="custom others text-right">
          {
            othersObject.map((item,index)=>{
              return(
                <div className="custom__items"  key={"other"+item.id} style={this.props.itemid !== undefined ? {display:"block"} : index === 0 || item.info ? {display:"block"} : {display:"none"} }>
                  <ItemsContainer  type="othersArray" Id={item.id}  itemid={this.props.itemid}  customObject={item} key={"other"+item.id} />
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
    othersObject: state.customsReducer.othersobject,
    language: state.generalReducer.language
  }
}
function mapDispatchToProps(dispatch)  {
  return {
    getOthers(language){
        dispatch(getOthers(language));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdditionCard);
