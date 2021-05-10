import React, { Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
class Banner extends Component {
  state = { width: 900};
  updateDimensions = () => {
    this.setState({ width: window.innerWidth});
  };
  componentDidMount() {
    require("jquery");
    require("bootstrap/js/dist/carousel");
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const slider =
      this.props.data && this.props.data.length > 0 ? (
        <div className="carousel slide  carousel-fade" data-ride="carousel" id="ithoobBanner" data-interval="3000">
          <ol className="carousel-indicators">
            {this.props.data.map((slide, index) => (
              <li
                key={index}
                data-target="#ithoobBanner"
                data-slide-to={index}
                className={index === 0 ? "active" : ""}
              />
            ))}
          </ol>
          <div className="carousel-inner">
            {this.props.data.map((slide, index) => (
              <div
                key={index}
                className={
                  index === 0 ? "carousel-item active" : "carousel-item"
                }
              >
                <img
                  className="d-block w-100"
                  alt={slide.title}
                  src={this.state.width < 769 && slide.mobile_image ? slide.mobile_image :slide.imgSrc}
                />
                <div className="carousel-caption d-md-block">
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-lg-9">
                        <h5 style={{color: `${slide.text_color}`}}>{slide.title}</h5>
                        <p style={{color: `${slide.text_color}`}}>{slide.desc}</p>
                        <Link href={slide.btn_url}>
                          <button className="d-block button">
                            {slide.btn_text}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      );

    return this.props.data && this.props.data.length > 0 ? (
      <div className="banner">
        <div className="slider">{slider}</div>
      </div>
    ) : (
      <div className="banner">
      <div className="slider">
      <div className="carousel slide" data-ride="carousel" id="ithoobBanner">
      <div className="carousel-inner">
      <img
        className="d-block w-100"
        // src={slide.img}
        alt="alternate banner"
        // src={slide.imgSrc}
        src={require('../../images/alternateBanner.png')}
      />
      </div>
    </div>
      </div>
        </div>
    );
  }
}

const mapBannerStateToProps = state => ({
  language: state.generalReducer.language,
  data: state.banner.data,
  status: state.banner.status,
  message: state.banner.message
});

// const mapBannerDispatchToProps = dispatch => ({
//   // getBanner: language => {
//   //   dispatch(getBanner(language));
//   // }
// });

// export default Banner;

export default connect(
  mapBannerStateToProps,
  null
)(Banner);
