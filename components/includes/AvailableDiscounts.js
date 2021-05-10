import React from 'react';
import { getStringVal } from "../../scripts/multiLang";

class AvailableDiscounts extends React.Component {

    constructor(props) {
        super(props);
    }

    getAvailableDiscounts = () => {
        // Sometimes, the discount is returned as "undefined", the below conditions
        let userDiscount = parseFloat(this.props.userDiscount) == undefined ? 0 : this.props.userDiscount;
        let partnerDiscount = parseFloat(this.props.partnerDiscount) == undefined ? 0 : this.props.partnerDiscount + "%";

        // If 'partnerDiscount' is the highest discount
        if(parseFloat(partnerDiscount) >= parseFloat(userDiscount)) {
            if(parseFloat(userDiscount) > 0) {
            // Show both, but linethrough on userDiscount
            return (<div>
                <div className="card-text d-flex partnerDiscount userDiscount">
                <div className="title">
                    {/* الخصم الدائم */}
                    {getStringVal(this.props.language, "PERMANENT_DISCOUNT")}
                    <span
                    className="icon-round-error-symbol"
                    onMouseEnter={e => this.props.msgAppear(e)}
                    onMouseLeave={e => this.props.msgDisappear(e)}
                    ></span>
                    <span className="desc">
                    {/* خصم دائم بقيمة */}
                    {getStringVal(
                        this.props.language,
                        "PERMANENT_DISCOUNT_WORTH"
                    )}
        
                    <b
                        className={
                        this.props.language === true ? " pr-2 pl-2" : "pr-2 pl-2"
                        }
                    >
                        {userDiscount}
                    </b>
        
                    {/* دائم لكونك أحد شركاء أي ثوب */}
                    {getStringVal(
                        this.props.language,
                        "BEING_A_PERMANENT_PARTNERS_ANY_GOWN"
                    )}
                    </span>
                </div>
                <div className="price">
                    -
                    <strike
        
                    >
                    {(parseFloat(this.props.total) *
                        parseFloat(userDiscount)) /
                        100}
                    </strike>
                    {getStringVal(this.props.language, "SR")}
                </div>
                </div>
                <div className="card-text d-flex partnerDiscount">
                <div className="title">
                    {/* كود الشركاء */}
        
                    {getStringVal(this.props.language, "PARTNERS_CODE")}
                    <span
                    className="icon-round-error-symbol"
                    onMouseEnter={e => this.props.msgAppear(e)}
                    onMouseLeave={e => this.props.msgDisappear(e)}
                    ></span>
                    <span className="desc">
                    {/* لقد تحصلت على خصم بقيمه */}
                    {getStringVal(
                        this.props.language,
                        "I_HAVE_OBTAINED_A_DISCOUNT_VALUES"
                    )}{" "}
                    <b
                        className={
                        this.props.language === true ? " pl-2 pr-2" : "pl-2 pr-2"
                        }
                    >
                        {partnerDiscount}
                    </b>
                    {/* غير شامل الشحن و تكلفه الترزى */}{" "}
                    {getStringVal(
                        this.props.language,
                        "SHIPPING_IS_A_COMPREHENSIVE_AND_COST_TAILOR"
                    )}
                    </span>
                </div>
                <div className="price">
                    -
                    <span
        
                    >
                    {(parseFloat(this.props.total) *
                        parseFloat(partnerDiscount)) /
                        100}
                    </span>
                    {/* ريال */}
                    {getStringVal(this.props.language, "SR")}
                </div>
                </div>
                <p className="card-text">{getStringVal(this.props.language, "HIGHEST_DISCOUNT_WILL_BE_APPLIED")}</p>
            </div>)
            } else {
            // Show only partnerDiscount - If it's > 0
                if(parseFloat(partnerDiscount) > 0) {
                    return (<div className="card-text d-flex partnerDiscount">
            <div className="title">
                {/* كود الشركاء */}
        
                {getStringVal(this.props.language, "PARTNERS_CODE")}
                <span
                className="icon-round-error-symbol"
                onMouseEnter={e => this.props.msgAppear(e)}
                onMouseLeave={e => this.props.msgDisappear(e)}
                ></span>
                <span className="desc">
                {/* لقد تحصلت على خصم بقيمه */}
                {getStringVal(
                    this.props.language,
                    "I_HAVE_OBTAINED_A_DISCOUNT_VALUES"
                )}{" "}
                <b
                    className={
                    this.props.language === true ? " pl-2 pr-2" : "pl-2 pr-2"
                    }
                >
                    {partnerDiscount}
                </b>
                {/* غير شامل الشحن و تكلفه الترزى */}{" "}
                {getStringVal(
                    this.props.language,
                    "SHIPPING_IS_A_COMPREHENSIVE_AND_COST_TAILOR"
                )}
                </span>
            </div>
            <div className="price">
                -
                <span
        
                >
                {(parseFloat(this.props.total) *
                    parseFloat(partnerDiscount)) /
                    100}
                </span>
                {/* ريال */}
                {getStringVal(this.props.language, "SR")}
            </div>
            </div>)
                }    
            }
        
        } else {
        // If 'userDiscount' is the highest discount
            if(parseFloat(partnerDiscount) > 0) {
            /// Show both, but linethrough on partnerDiscount
            return (<div>
                <div className="card-text d-flex partnerDiscount">
                <div className="title">
                    {/* كود الشركاء */}
        
                    {getStringVal(this.props.language, "PARTNERS_CODE")}
                    <span
                    className="icon-round-error-symbol"
                    onMouseEnter={e => this.props.msgAppear(e)}
                    onMouseLeave={e => this.props.msgDisappear(e)}
                    ></span>
                    <span className="desc">
                    {/* لقد تحصلت على خصم بقيمه */}
                    {getStringVal(
                        this.props.language,
                        "I_HAVE_OBTAINED_A_DISCOUNT_VALUES"
                    )}{" "}
                    <b
                        className={
                        this.props.language === true ? " pl-2 pr-2" : "pl-2 pr-2"
                        }
                    >
                        {partnerDiscount}
                    </b>
                    {/* غير شامل الشحن و تكلفه الترزى */}{" "}
                    {getStringVal(
                        this.props.language,
                        "SHIPPING_IS_A_COMPREHENSIVE_AND_COST_TAILOR"
                    )}
                    </span>
                </div>
                <div className="price">
                    -
                    <strike
        
                    >
                    {(parseFloat(this.props.total) *
                        parseFloat(partnerDiscount)) /
                        100}
                    </strike>
                    {/* ريال */}
                    {getStringVal(this.props.language, "SR")}
                </div>
                </div>
                <div className="card-text d-flex partnerDiscount userDiscount">
                <div className="title">
                    {/* الخصم الدائم */}
                    {getStringVal(this.props.language, "PERMANENT_DISCOUNT")}
                    <span
                    className="icon-round-error-symbol"
                    onMouseEnter={e => this.props.msgAppear(e)}
                    onMouseLeave={e => this.props.msgDisappear(e)}
                    ></span>
                    <span className="desc">
                    {/* خصم دائم بقيمة */}
                    {getStringVal(
                        this.props.language,
                        "PERMANENT_DISCOUNT_WORTH"
                    )}
        
                    <b
                        className={
                        this.props.language === true ? " pr-2 pl-2" : "pr-2 pl-2"
                        }
                    >
                        {userDiscount}
                    </b>
        
                    {/* دائم لكونك أحد شركاء أي ثوب */}
                    {getStringVal(
                        this.props.language,
                        "BEING_A_PERMANENT_PARTNERS_ANY_GOWN"
                    )}
                    </span>
                </div>
                <div className="price">
                    -
                    <span
        
                    >
                    {(parseFloat(this.props.total) *
                        parseFloat(userDiscount)) /
                        100}
                    </span>
                    {getStringVal(this.props.language, "SR")}
                </div>
                </div>
                <p className="card-text">{getStringVal(this.props.language, "HIGHEST_DISCOUNT_WILL_BE_APPLIED")}</p>
            </div>)
        
            } else {
                // Show only userDiscount - If it's > 0
                if(parseFloat(userDiscount) > 0) {
                    return (<div className="card-text d-flex partnerDiscount userDiscount">
            <div className="title">
                {/* الخصم الدائم */}
                {getStringVal(this.props.language, "PERMANENT_DISCOUNT")}
                <span
                className="icon-round-error-symbol"
                onMouseEnter={e => this.props.msgAppear(e)}
                onMouseLeave={e => this.props.msgDisappear(e)}
                ></span>
                <span className="desc">
                {/* خصم دائم بقيمة */}
                {getStringVal(
                    this.props.language,
                    "PERMANENT_DISCOUNT_WORTH"
                )}
        
                <b
                    className={
                    this.props.language === true ? " pr-2 pl-2" : "pr-2 pl-2"
                    }
                >
                    {userDiscount}
                </b>
        
                {/* دائم لكونك أحد شركاء أي ثوب */}
                {getStringVal(
                    this.props.language,
                    "BEING_A_PERMANENT_PARTNERS_ANY_GOWN"
                )}
                </span>
            </div>
            <div className="price">
                -
                <span
        
                >
                {(parseFloat(this.props.total) *
                    parseFloat(userDiscount)) /
                    100}
                </span>
                {getStringVal(this.props.language, "SR")}
            </div>
            </div>)
                }
            }
        }
    }

    render() {
        return (<div className="available-discounts">{this.getAvailableDiscounts()}</div>);
    }
}

export default AvailableDiscounts;