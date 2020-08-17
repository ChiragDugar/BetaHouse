import React from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import '../StyleSheets/SearchBarDatePicker.scss';

class SearchBarDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      show: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    const [day, month, year] = date.split('-');
    const finalStartDate = year + '-' + month + '-' + day;
    console.log(finalStartDate);
    this.setState({
      displayValue: date,
      startDate: finalStartDate,
      show: true
    }, () => {
      this.props.handleDates(this.state.startDate)
    });
  }

  handleBlur = () => {
    this.props.handleBlurStartDate();
  }

  render() {
    return (
      <ModernDatepicker
        date={this.state.show ? this.state.displayValue : ''}
        format={'DD-MM-YYYY'}
        onChange={date => this.handleChange(date)}
        onBlur={() => this.handleBlur()}
        placeholder={'From'}
        // primaryColor={'#75b1a9'}
        // secondaryColor={'#75b1a9'}
        // primaryTextColor={'#4f6457'}
        // secondaryTextColor={'#acd0c0'}
        className="date-picker"
        minDate={new Date()
        }
      />
    );
  }
}

export default SearchBarDatePicker