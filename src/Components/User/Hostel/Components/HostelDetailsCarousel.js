import React, { Component } from 'react'
// import "~react-image-gallery/styles/scss/image-gallery.scss";
// import "~react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'

export default class HostelDetailsCarousel extends Component {

    constructor(props) {
        super(props)
        props.images.map(el => {
            let obj = {}
            obj = {
                original: el,
                thumbnail: el
            }
            // console.log(obj)
            this.state.finalObject.push(obj)
        })
        // console.log(this.state)
    }

    state = {
        finalObject: []
    }

    render() {

        const customStyles = {
            content: {
                top: '50%',
                // left: '50%',
                // right: 'auto',
                // bottom: 'auto',
                // marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };



        const images = [
            {
                original: this.props.img1,
                thumbnail: this.props.img1,
            },
            {
                original: this.props.img2,
                thumbnail: this.props.img2,
            },
            {
                original: this.props.img3,
                thumbnail: this.props.img3,
            },
        ];



        return (
            < div >
                <ImageGallery items={this.state.finalObject} disableThumbnailScroll={true} />
            </div >
        )
    }
}
