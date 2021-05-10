import React, { Component } from 'react';
import { connect } from 'react-redux';
import ZarzourContent from '../../components/includes/newCarousel';
import { getZarzour } from '../../actions/customizationsPage/zarzourActions';
// import $ from "jquery";
export class ZarzourCustom extends Component {
componentDidMount(){
this.props.getZarzour(this.props.language===false ? 1 : 2);

}
componentDidUpdate(prevProps){
 if(this.props.language !== prevProps.language){
   this.props.dispatch(
      getZarzour(this.props.language===false ? 1 : 2)
    );
 }
}
  render() {
    const {zarzourObject} = this.props;
      if(zarzourObject){
        return (
          <div id="zarzour" className="custom text-right">
          {
            zarzourObject.map((item,index)=>{
              return (
                <div className="custom__items" key={"zarzour"+item.id} style={this.props.itemid !== undefined ? {display:"block"} : index !== 0 ? {display:"none"} : {} }>
                  <ZarzourContent type="zarzourArray"  Id={item.id}  itemid={this.props.itemid} customObject={item} key={"zarzour"+item.id} />
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
    zarzourObject: state.customsReducer.zarzourobject,
    language: state.generalReducer.language
  }
}
function mapDispatchToProps(dispatch)  {
  return {
    getZarzour(language){
        dispatch(getZarzour(language));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ZarzourCustom);
