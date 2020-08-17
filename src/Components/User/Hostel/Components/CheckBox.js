import React,{Component} from "react";

class Option extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 'Sharing',
        roomTypes: this.props.roomTypes
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      console.log(this.props)
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      if(this.state.value=="Sharing"){
        alert('You have Selected:' + this.state.value +'Room '+"You will be paying for "+"1/"+this.state.roomTypes.bedCount+" rooms.") ;
      }
      else{
        alert('You have Selected:' + this.state.value +'Room '+"You will be paying for "+this.state.roomTypes.bedCount+"/"+this.state.roomTypes.bedCount+"") ;
      }
      this.props.history.push({
        pathname:'/user/overview',
        state:{
          studentId: this.props.studentId,
          roomTypes:this.props.roomTypes
        }
      })
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your Desired Option : 
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="Sharing">Sharing</option>
              <option value="NotSharing">Not Sharing</option>
            </select>
          </label>
          <br></br>
          <br></br>
          <input type="submit" value="Submit" /><br></br>
          <br></br>
        </form>
      );
    }
  }
  export default Option