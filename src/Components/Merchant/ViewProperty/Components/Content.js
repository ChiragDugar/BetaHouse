import React, { Component } from 'react'
import performRequest from '../../../PerformRequest'


export default class Content extends Component {
    constructor(props){
        super(props)
        this.state ={
            files2:null,
            roomImages:[],
            imageUrls2:[],
            roomFeature:[],
            featureList:[]
        }
    }
    componentDidMount(){
       
        console.log(this.props)
        if(this.props.item.roomImages.length>0){
            this.setState({
                roomImages:this.props.item.roomImages
            })
        }

        // console.log(this.props.item.features)
        this.props.featureList.map((item)=>{
            // console.log(item)
            if(!this.props.item.features.includes(item)){
                // console.log(item)
                // this.setState({
                //     featureList:[item,...this.state.featureList]
                // },()=>{
                //     console.log(this.state.featureList)
                // })
                this.state.featureList.push(item)
            }
        })
        console.log(this.state.featureList)
        this.setState({
            roomTypeId:this.props.item._id,
            roomFeature:this.props.item.features
        })

    }

    handleAddRoomImages = (index) => {
        let path = "https://backend.betahouse.co.in/property/addroomimages"
        // let valid = this.handleValidate()
        let files = this.state.files2;
    // let response = PerformRequest(path, method, body)
        if (files) {
            console.log("check")
            let data = new FormData();
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i]);
                data.append('propertyImages', files[i]);
            }
            data.append('roomTypeId',this.state.roomTypeId)
            fetch(path, {
                method: "POST",
                body: data,
                mode: 'cors',
                headers:{
                    "Access-Control-Allow-Origin": "*",
                    "access-control-allow-headers":"*",
                }
            })
            .then(data => data.json())
            .then(res => {
                if (!res.err) {
                    alert("Successfully Added!")
                    console.log(res)
                    this.setState({
                        roomImages:res.roomType.roomImages
                    })
                    // this.props.history.push({
                    //     pathname: '/merchant/dashboard/addRoom',
                    //     state: {
                    //         propertyId: res.property._id
                    //     }
                    // })
                }
                else
                    alert(res.msg)
            })
            .catch(e => {
                alert(e.message);
            })
        }
    }

    onChangeFile2 = (e) => {
        let obj = e.target.files;
        let total = Object.keys(obj);
        this.setState({
            files2: obj
        })
    }

    handleImageClick2 = (url,index,key) => {
        if(this.state.imageUrls2.includes(url)){
            let data = []
            let imageUrls2 = this.state.imageUrls2.filter((item)=>{if(item!=url){
                data.push(item)
            }})
            console.log("DeSelected",data)
            this.setState({imageUrls2:data},()=>{
                console.log(this.state.imageUrls2)
            })
            console.log(imageUrls2)
            document.getElementById("room"+index+key).style.backgroundColor="white"
        }
        else{
            this.setState({
                imageUrls2:[...this.state.imageUrls2,url]
            },()=>{
                console.log("Selected",this.state.imageUrls2)
                document.getElementById("room"+index+key).style.backgroundColor="grey"
            })

        }
    }

    handleDeleteRoomImage = (index) => {
        let path = "/property/deleteroomimages"
        let method = "POST"
        let body = {
            roomTypeId:this.state.roomTypeId,
            imageUrls:this.state.imageUrls2
        }
        const response = performRequest(path,method,body)
        response.then((res)=>{
            console.log(res)
            alert(res.msg)
            if(res.err === false){
                this.setState({
                    roomImages:res.roomType.roomImages
                })
            }
        })
    }

    handleRoomFeature = (e) => {
        let lhs = e.target.name
        let rhs = e.target.value
        let arr =[]
        this.state.featureList.filter((item)=>{if(rhs!==item){
            arr.push(item)
        }})
        console.log(arr)
        if(!this.state.roomFeature.includes(rhs) && rhs!=""){
            this.setState({ 
                [lhs]: [...this.state.roomFeature,rhs], 
                featureList:arr
            })
        }
    }

    handleRoomFeatureRemove = (index) => {
        let roomFeature = this.state.roomFeature.splice(index,1)
        this.setState(roomFeature)
        if(!this.state.featureList.includes(roomFeature)){
            this.setState({
                featureList:[...this.state.featureList,roomFeature[0]]
            },()=>{
                console.log(this.state.featureList)
            })
        }
    }

    handleRoomSubmit = (index) => {
        // checkIndex()
        let path = "/property/updateroomfeatures"
        let body = {
            roomTypeId:this.state.roomTypeId,
            features:this.state.roomFeature
        }
        const response = performRequest(path,'POST',body)
        response.then(res =>{
            console.log(res)
            alert(res.msg)
            this.setState({
                roomFeature:res.roomType.features,
                disabled2:true
            })
        })
    }


    render() {
        const {item,index} = this.props
        return (
            <div>
                <div className="Content-container font-italic text-center">
                    <span className="content-subHeading font-weight-bold">Description: </span> {this.props.item.description}
                    <br/>
                    <span className="content-subHeading font-weight-bold">Minimum Booking Duration: </span> 
                    {this.props.item.minimumBookingDuration} days
                    <br/>
                    <span className="content-subHeading font-weight-bold">Bed Count: </span> 
                    {this.props.item.bedCount} bed
                    <br/>
                    <span className="content-subHeading font-weight-bold">Per Person Cost Per Month: </span> 
                    Rs. {this.props.item.perPersonCostPerMonth} Per Person Per Month
                    <br />
                    <span className="content-subHeading font-weight-bold">Available for Sharing: </span> 
                    {this.props.item.availableForSharing}

                </div>
                <div className="text-center">
                    {this.state.disabled2?(
                        <div className="text-center font-weight-bold my-3">
                            <div className="bg-light w-75 m-auto p-2">
                                Click on "Edit" to show more of your happy place.
                            </div>
                        </div>
                        ):(
                            <div className="ViewRoom-subContainer">
                                <br />
                                Add Room Images
                                <br />
                                <input type="file" id="propertyImages" onChange={this.onChangeFile2} className="AP1-subHeading" multiple/>
                                <button className="px-2 py-1 bg-dark text-white border-none text-uppercase" onClick={()=>this.handleAddRoomImages(index)}>Add Images</button>
                            </div>
                        )}
                </div>
                <div className="text-center my-2">
                    <div className="ViewRoom-subContainer">
                        <div>
                            <div className="h6">
                                Delete Images - Click images that you want to delete.
                            </div> 
                            <br></br>
                            { 
                                this.state.roomImages.length>0?(
                                    this.state.roomImages.map((item,key)=>
                                        <div className=" w-25 d-inline-block ViewRoom-Image-Container p-3" id={"room"+index+key}  onClick={()=>this.handleImageClick2(item,index,key)} >
                                            <div  className="float-right ViewRoom-Image-btn">X</div>
                                            <img src={item} alt="Room Image" className="img-thumbnail"/>
                                        </div>
                                )):(
                                    <div className="px-3 py-2 bg-light font-weight-bold">Nothing to Delete</div>
                                )
                            }
                            <button className="px-2 py-1 bg-dark text-white border-none text-uppercase" onClick={()=>this.handleDeleteRoomImage(index)}>Delete Images</button>
                            <br />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="h5">
                        Feature 
                    </div> 
                    <div className="row AP1-row1 w-75 mx-auto">
                        <select name="roomFeature" id="feature" className="col-lg-6 col-md-6 col-sm-12 h-25" value={this.state.roomFeature[this.state.roomFeature.length-1]}  onChange={this.handleRoomFeature}>
                            <option className="text-center" value="">Choose Features</option>
                            {this.state.featureList.length?(
                                this.state.featureList.map(item =>
                                    <option className="text-center" value={item}>{item}</option>
                                )
                            ):(
                                null
                            )}
                        </select>
                        <div className="AP1-subHeading-Italics text-left col-lg-6 col-md-6 col-sm-12">
                            <ul>
                            {this.state.roomFeature.length>0?(
                                this.state.roomFeature.map((item,index) => 
                                    <li>{item}<span className="px-3 AP1-featureCancel" onClick={()=>this.handleRoomFeatureRemove(index)}>X</span></li>
                                )
                            ):(
                                <div className="font-weight-bold text-muted ">
                                    {this.state.roomFeature.length?(
                                            `${this.state.roomFeature}`
                                    ):(
                                        <div className="">
                                            No Features Selected
                                        </div>
                                    )}
                                </div>
                            )}
                            </ul>
                        </div>
                        <button className="px-2 py-1 bg-dark text-white border-none text-uppercase mx-auto mb-5" onClick={()=>this.handleRoomSubmit(index)}>Update Features</button>
                    </div>
                </div>
            </div>
        )
    }
}
