import React, { Component } from "react";
import { connect } from "react-redux";
// import "bootstrap/js/dist/collapse";
class Policies extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/collapse");
  }
  render() {
    console.log('====================================');
    console.log(this.props.stockType);
    console.log('====================================');
    return (
      <div className="policies">
        {this.props.policies.map((collapse, index) => {
          if(this.props.stockType !== "fabric"){
            if(!(collapse.title == "إلغاء الطلبات"  || collapse.title == "Cancelling orders")){
              return (<div id={`accordion${index}`} key={index}>
              <div className="card">
                <div className="card-header" id={`heading${index}`}>
                  <h5 className="mb-0">
                    <button
                      className={index == 0 ? "btn btn-link" : "btn btn-link collapsed"}
                      data-toggle="collapse"
                      data-target={`#collapse${index}`}
                      aria-expanded={index == 0 ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                    >
                      <span>{'>'}</span>{collapse.title}
                    </button>
                  </h5>
                </div>
  
                <div
                  id={`collapse${index}`}
                  className={index == 0 ? "collapse show" : "collapse"}
                  aria-labelledby={`heading${index}`}
                  data-parent={`#accordion${index}`}
                >
                  <div className="card-body">{collapse.description}</div>
                </div>
              </div>
            </div>
          )
            }
          }else{
            return (<div id={`accordion${index}`} key={index}>
              <div className="card">
                <div className="card-header" id={`heading${index}`}>
                  <h5 className="mb-0">
                    <button
                      className={index == 0 ? "btn btn-link" : "btn btn-link collapsed"}
                      data-toggle="collapse"
                      data-target={`#collapse${index}`}
                      aria-expanded={index == 0 ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                    >
                      <span>{'>'}</span> {collapse.title}
                    </button>
                  </h5>
                </div>
  
                <div
                  id={`collapse${index}`}
                  className={index == 0 ? "collapse show" : "collapse"}
                  aria-labelledby={`heading${index}`}
                  data-parent={`#accordion${index}`}
                >
                  <div className="card-body">{collapse.description}</div>
                </div>
              </div>
            </div>
          )
          }
        })}
      </div>
    );
  }
}
const mapProductDetailsStateToProps = state => ({
  language: state.productDetails.language,
  status: state.productDetails.status,
  message: state.productDetails.message,
  policies: state.productDetails.policies,
  stockType : state.productDetails.productDetails.stockType
});

export default connect(
  mapProductDetailsStateToProps,
  null
)(Policies);
