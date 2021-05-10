import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from "../components/layouts/mainLayout.js";
import Orders from '../components/ordersPage/orders';
import Router from "next/router";
import {updateBreadcrumb} from "../actions/includes/breadcrumb"
import { getOrders, paymentResponse } from "../actions/ordersPage/ordersActions";
// import "../style.scss";
import Breadcrumb from "../components/ordersPage/breadcrumb";
import {setActiveMenu} from "../actions/header/categories.js";

import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import cookies from "next-cookies"
import Helmet from 'react-helmet'
//layout of about page
 class OrdersLayout extends React.Component {
   static async getInitialProps({ reduxStore, query, pathname, req , res }) {
    reduxStore.dispatch(setActiveMenu(pathname));

		const { lang } = cookies({req:req})
		const { ithoobUser } = cookies({req:req})
    const ithoobUserObj = ithoobUser ? JSON.parse(ithoobUser) : null;
    const authToken = ithoobUser ? ithoobUserObj.authenticationToken : null;

		reduxStore.dispatch(changeLangWithoutCookie(lang==="false" ? false : true))
		if(ithoobUser){
			reduxStore.dispatch(changeIthoobCookie(1))
		}else{
      if(res){
        res.writeHead(302, {Location: "/"})
        res.end()
      } else {
        Router.push('/')
      }
    }

     await reduxStore.dispatch(getOrders(lang==="false" ? 1 : 2,authToken));
     reduxStore.dispatch(updateBreadcrumb([{title:lang ==="false" ?"My Orders":"طلباتي",slug:"/orders"}]))
     return {
       dataCategorySlug: query,
       queryString: query.code ? query.code : null
     };
   }

  render() {
    
    return (
        <Layout queryString={this.props.queryString} classNameData=" withInnerHeader">
		<Helmet
  	 title={this.props.categories.siteTitle + " | Orders" }
  	 meta={[
  		 { property: 'description', content: this.props.categories.siteDescription },
  		 { property: 'og:locale', content: this.props.language === false ? "en_US" : "ar"  },
  		 { property: 'og:type', content: "website"  },
  	   { property: 'og:title', content: this.props.categories.siteTitle + " | Orders"  },
  	   { property: 'og:description', content: this.props.categories.siteDescription },
  		 { property: 'og:site_name', content: this.props.categories.siteTitle + " | Orders"  },
  		 { property: 'twitter:title', content: this.props.categories.siteTitle  + " | Orders" },
  	   { property: 'twitter:description', content: this.props.categories.siteDescription },
  	 ]}
     />
          <div className="container content">
            <Breadcrumb dataCategorySlug={this.props.dataCategorySlug} />
            <Orders pathname={this.props.dataCategorySlug}/>
          </div>
        </Layout>
    )
  }
}
const mapGeneralStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories
});
export default connect(mapGeneralStateToProps,null)(OrdersLayout);
