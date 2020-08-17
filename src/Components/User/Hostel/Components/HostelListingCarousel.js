import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from '../../../../Assets/Grand-felda-house.png';

export default class HostelListingCarousel extends Component {
    render() {


        return (

            <div>
                <Carousel
                    showArrows={false}
                    showIndicators={true} showThumbs={false} showStatus={false} infiniteLoop={true} width={'100%'}>
                    {/* <div>
                        <img src={image1} />
                    </div>
                    <div>
                        <img src={ image1 } />
                    </div>
                    <div>
                        <img src={ image1 } />
                    </div>
                     */}
                    {this.props.images.length > 0 ? (this.props.images.map((el, i) => {
                        return (
                            <div key={i}>
                                <img style={{
                                    // width: '100%',
                                    height: '14rem',
                                    maxWidth: '100%',
                                    // maxHeight: '100%',
                                    display: 'block'
                                }} src={el} />
                            </div>
                        )
                    })) : (
                            <div>
                                <img style={{
                                    width: '100%',
                                    height: '14rem'
                                }} src={image1} />
                            </div>
                        )}
                </Carousel>
            </div>


            // <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            //     <div className="carousel-inner">
            //         <div className="carousel-item active">
            //             <img src={ image1 } className="d-block w-100" alt="..." />
            //         </div>
            //         <div className="carousel-item">
            //             <img src={image2}  className="d-block w-100" alt="..." />
            //         </div>
            //         <div className="carousel-item">
            //             <img src={ image3}  className="d-block w-100" alt="..." />
            //         </div>
            //     </div>
            //     <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            //         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            //         <span className="sr-only">Previous</span>
            //     </a>
            //     <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            //         <span className="carousel-control-next-icon" aria-hidden="true"></span>
            //         <span className="sr-only">Next</span>
            //     </a>
            // </div>
        )
    }
}
