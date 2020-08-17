import React from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import '../StyleSheets/SearchBarDatePicker.scss';

class SearchBarDatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            endDate: new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString() + '-' + new Date().getDate().toString(),
            show: false,
            anotherFlag: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        const [day, month, year] = date.split('-');
        const finalEndDate = year + '-' + month + '-' + day;
        this.setState({
            endDate: finalEndDate,
            displayDate: date,
            show: true,
            anotherFlag: false
        }, () => {
            this.props.handleDates(this.state.endDate)
        });
    }

    render() {
        let minDate;
        let bool = true;
        if (this.props.fromDate === '') {
            minDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
        } else {
            const arr = this.props.fromDate.split('-');
            minDate = new Date(arr[0], arr[1], arr[2]);
            const endArr = this.state.endDate.split('-');
            const endDate = new Date(endArr[0], endArr[1] - 1, endArr[2]);
            if (endDate.getTime() < minDate.getTime()) {
                bool = false;
            }
            else {
                bool = true;
            }
            if (this.props.blurStartDate === 1 && this.state.anotherFlag) {
                document.getElementById("end-date-picker").focus();
            }
        }
        return (
            <ModernDatepicker
                date={this.state.show && bool ? this.state.displayDate : ''}
                format={'DD-MM-YYYY'}
                onChange={date => this.handleChange(date)}
                placeholder={'To'}
                className="date-picker"
                id="end-date-picker"
                minDate={minDate}
            />
        );
    }
}

export default SearchBarDatePicker