import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemsContainer from './includes/itemsContainer';
import { getAdds } from '../../actions/customizationsPage/addsActions';
// import $ from "jquery";
export class AddsCard extends Component {
componentDidMount(){
this.props.getAdds(this.props.language===false ? 1 : 2);

}
componentDidUpdate(prevProps){
 if(this.props.language !== prevProps.language){
   this.props.dispatch(
    getAdds(this.props.language===false ? 1 : 2)
    );
 }
}
  render() {
    const {addsObject} = this.props;
      if(addsObject){
        return (
          <div id="adds" className="custom text-right">
          {
            addsObject.map((item,index)=>{
              return (
                <div className="custom__items" key={"adds"+item.id} >
                  <ItemsContainer type="addsArray"  Id={item.id}  itemid={this.props.itemid} customObject={item} key={"adds"+item.id} />
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
    addsObject: state.customsReducer.addsobject,
    language: state.generalReducer.language
  }
}
function mapDispatchToProps(dispatch)  {
  return {
    getAdds(language){
        dispatch(getAdds(language));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddsCard);
