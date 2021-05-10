import React, { Component } from "react";
import { connect } from "react-redux";
import { myModule } from "../../scripts/collapsersModule.js";
import $ from "jquery";

import { getStringVal } from "../../scripts/multiLang";

export class FAQ extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, itemsLength) {
    var questionsArr = $(".faqPage").find(".question");
    [...questionsArr].forEach(function(item, index) {
      //if not in questions
      if (
        !$(item)
          .html()
          .includes($(e.target).val())
      ) {
        //and not in its content
        if (
          !$(item)
            .closest(".card")
            .find(".collapserContent")
            .html()
            .includes($(e.target).val())
        ) {
          $(item)
            .closest(".card")
            .hide();
          $(item)
            .closest(".card")
            .removeClass("active");
          $(item)
            .closest(".card")
            .find(".collapse")
            .removeClass("show");
          $(item)
            .closest(".card")
            .find(".collapse")
            .addClass("hidden");
        } else {
          $(item)
            .closest(".card")
            .find("button")
            .collapse("show");
          // var element = $(item).parents(".card").find(".collapserContent");
          // var word =$(e.target).val();
          // var rgxp = new RegExp(word, 'g');
          // var repl = '<span class="marker">' + word + '</span>';
          // element.html(element.html().replace(word, repl));
        }
      } else {
        if (
          !$(item)
            .closest(".card")
            .find(".collapse")
            .hasClass("show")
        ) {
          $(item)
            .closest(".card")
            .addClass("active");
          $(item)
            .closest(".card")
            .find(".collapse")
            .addClass("show");
          $(item)
            .closest(".card")
            .find(".collapse")
            .removeClass("hidden");
        }
        $(item)
          .closest(".card")
          .show();
        // if more than one showed remove active and show from all except first
        // if($(item).parents(".card").find(".collapse.show") > 1){
        //   $(item).parents(".accordion").find(".card").removeClass("active")
        //   $(item).parents(".accordion").find(".card .collapse").removeClass("show")
        //   $(".card:first").addClass("active")
        //   $(".card:first").find(".collapse").addClass("show")
        // }
      }
    });
    var hiddenCards = $(".faqPage .card").filter(function() {
      return $(this).css("display") == "none";
    }).length;
    
    if (itemsLength == hiddenCards) {
      if ($(".faqPage h2.noMatch").css("display") !== "block") {
        $(".faqPage h2.noMatch").text(
          getStringVal(
            this.props.language,
            "NO_SEARCH_RESULTS_MATCH_YOUR_ENTERED_TEXT"
          )
        );
        $(".faqPage h2.noMatch").css("display", "block");
      }
    } else {
      $(".faqPage h2.noMatch").css("display", "none");
    }
  }

  componentDidMount() {
    const collapse = require("bootstrap/js/dist/collapse.js");
  }

  render() {
    const { faq } = this.props;
    if (faq.items) {
      return (
        <div className="faqPage">
          <h2 className="title">{faq.title}</h2>
          {faq.subtitle && faq.subtitle.length > 0 ? (
            <h3>{faq.subtitle}</h3>
          ) : (
            ""
          )}
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="faqPage__search">
                <input
                  placeholder={getStringVal(
                    this.props.language,
                    "LOOKING_IN_THE_QUESTIONS"
                  )}
                  onChange={e => this.handleChange(e, faq.items.length)}
                />
                <span className="icon-Search" />
              </div>
              <div id="accordion">
                {faq.items.map((item, index) => {
                  return (
                    <div className="card" key={"question" + index}>
                      <div className="card-header" id={"heading" + index}>
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link collapserBtn collapsed"
                            data-toggle="collapse"
                            data-target={"#collapse" + index}
                            aria-expanded={index === 0 ? "true" : "false"}
                            aria-controls={"collapse" + index}
                          >
                            <p className="collapserTitle">
                              <span className="icon-arrow" />
                              <span className="question">{item.question}</span>
                            </p>
                          </button>
                        </h5>
                      </div>
                      <div
                        id={"collapse" + index}
                        className="collapse"
                        aria-labelledby={"heading" + index}
                        // data-parent="#accordion"
                      >
                        <div className="card-body">
                          <p className="collapserContent">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <h2 className="noMatch pb-5"></h2>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>{getStringVal(this.props.language, "LOADING")} ... </div>;
    }
  }
}
function mapStateToProps(state) {
  return {
    faq: state.faqReducer.faqData,
    language: state.generalReducer.language
  };
}

//binding actions with component
export default connect(mapStateToProps, null)(FAQ);
