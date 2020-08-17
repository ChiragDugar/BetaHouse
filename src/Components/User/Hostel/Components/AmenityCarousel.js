import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel';


export default class AmenityCarousel extends Component {
    render() {
        return (
            <div>

                {this.props.roomTypes.roomImages.length > 0 ? (
                    <Carousel showIndicators={false} showThumbs={false} showStatus={false} infiniteLoop={true} width={'100%'}>
                        {this.props.roomTypes.roomImages.map((el, i) => {
                            return (
                                <div key={i} >
                                    <img style={{
                                        // width: 'auto',
                                        // height: '20rem'
                                        // maxWidth: '100%',
                                        height: '30rem',
                                        display: 'block'
                                    }} src={el} />
                                </div>
                            )
                        })}
                    </Carousel>
                )
                    : (
                        <div>
                            <p style={{
                                padding: "0 1.5rem",
                                fontFamily: "Raleway",
                                fontStyle: "italic"
                            }}>No Room Images uploaded</p>
                        </div>
                    )}
            </div>
        )
    }
}
