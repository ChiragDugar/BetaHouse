import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import India from '../../../../Assets/India.png'
import Canada from '../../../../Assets/Canada.png'
import Aus from '../../../../Assets/Aus.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../../../Assets/Grand-felda-house.png'
import PerformRequest from '../../../PerformRequest'

export default class Test extends React.Component {

  state = {
    children: [India, Canada, Aus, India, Canada, Aus, India, Canada, Aus],
    activeItemIndex: 0,
    childrenText: ['India', 'Canada', 'Australia'],
    propsList: null
  }

  componentWillMount() {
    this.setState({
      children: [India, Canada, Aus, India, Canada, Aus, India, Canada, Aus],
      childrenText: ['India', 'Canada', 'Australia'],
      activeItemIndex: 0,
    });

  }

  componentDidMount() {
    this.setState({
      propsList: this.props.propsList
    })
  }

  handleClick = (el) => {
    let path = "/property/view/propertydirect"
    let method = "POST"
    let testDate = new Date()
    let todayDate = new Date(testDate.getFullYear(), testDate.getMonth() + 1, testDate.getDate());
    let body = {
      fromDate: testDate.toISOString().split('T')[0],
      toDate: todayDate.toISOString().split('T')[0],
      propertyId: el._id
    }

    console.log(body)
    let response = PerformRequest(path, method, body)
    response
      .then(res => {
        console.log(res);
        this.props.history.push({
          "pathname": "/user/listing/detail/" + el._id + "?" + body.fromDate + "?" + body.toDate,
          state: {
            images: res.properties[0].propertyImages,
            propertyName: res.properties[0].propertyName,
            description: res.properties[0].description,
            address: res.properties[0].address,
            propertyId: res.properties[0].propertyId,
            features: res.properties[0].features,
            minimumCost: res.properties[0].minimumCost,
            fromDate: testDate.toISOString().split('T')[0],
            toDate: todayDate.toISOString().split('T')[0],
            offers: res.properties[0].offers,
            studentId: res.properties[0].studentId,
            roomTypeNames: res.properties[0].roomTypeNames,
            isAvailable: res.properties[0].isAvailable
          }
        })
      })

  }


  render() {

    // const {
    //   activeItemIndex,
    //   children,
    // } = this.state;

    return (
      <div style={{ "padding": "0 4rem", "margin": "0rem" }}>
        <ItemsCarousel
          infiniteLoop={false}
          gutter={12}
          activePosition={'center'}
          chevronWidth={60}
          disableSwipe={false}
          alwaysShowChevrons={false}
          numberOfCards={window.innerWidth < 768 ? 1 : 3}
          slidesToScroll={1}
          outsideChevron={true}
          showSlither={false}
          firstAndLastGutter={false}
          activeItemIndex={this.state.activeItemIndex}
          requestToChangeActive={value => this.setState({ activeItemIndex: value })}
          rightChevron={'>'}
          leftChevron={'<'}
        >

          {this.props.value === "studentAccom" && this.state && this.state.propsList && this.state.propsList.studentAccom.length > 0 && this.state.propsList.studentAccom.map(el => {
            return (
              <div
                onClick={() => this.handleClick(el)}
              >
                <Carousel
                  showArrows={false}
                  showIndicators={true} showThumbs={false} showStatus={false} infiniteLoop={true} width={'100%'}>
                  {el.propertyImages.map((img, i) => {
                    return (<div
                      key={i}
                      style={{
                        height: 290,
                        background: `linear-gradient(to right,rgba(45,45,45,0.45),rgba(45,45,45,0.45)), url(${img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {el.propertyName}
                    </div>)
                  })}
                </Carousel>
              </div>
            )

          })
          }





          {this.props.value === "coLiving" && this.state && this.state.propsList && this.state.propsList.coLiving.length > 0 && this.state.propsList.coLiving.map(el => {
            return (
              <Carousel
                showArrows={false}
                showIndicators={true} showThumbs={false} showStatus={false} infiniteLoop={true} width={'100%'}>
                {el.propertyImages.map((img, i) => {
                  return (<div
                    key={i}
                    style={{
                      height: 290,
                      background: `linear-gradient(to right,rgba(45,45,45,0.45),rgba(45,45,45,0.45)), url(${img})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                    onClick={() => this.handleClick(el)}
                  >
                    {el.propertyName}
                  </div>)
                })}
              </Carousel>
            )

          })
          }







        </ItemsCarousel>
      </div>
    );
  }
} 