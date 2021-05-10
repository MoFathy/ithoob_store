import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getYaka } from '../../actions/customizationsPage/yakaActions';
import  ItemsContainer  from './includes/itemsContainer';
// import $ from "jquery";
export class YakaCard extends Component {
componentDidMount(){
this.props.getYaka(this.props.language===false ? 1 : 2);

}
componentDidUpdate(prevProps){
 if(this.props.language !== prevProps.language){
   this.props.dispatch(
      getYaka(this.props.language===false ? 1 : 2)
    );
 }
}
  render() {
    const {yakaObject} = this.props;
      if(yakaObject){
        return (
          <div id="yaka" className="custom text-right">
          {
            yakaObject.map((item,index)=>{
              return (
                <div className="custom__items" key={"yaka"+item.id} style={this.props.itemid !== undefined ? {display:"block"} : index !== 0 ? {display:"none"} : {} }>
                  <ItemsContainer type="yakaArray"  Id={item.id}  itemid={this.props.itemid}  customObject={item} key={"yaka"+item.id} />
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
  yakaObject: state.customsReducer.yakaobject,
  language: state.generalReducer.language
  }
}
function mapDispatchToProps(dispatch)  {
  return {
    getYaka(language){
        dispatch(getYaka(language));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(YakaCard);
