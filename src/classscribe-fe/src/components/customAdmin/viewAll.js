import React from 'react';
import moment from 'moment';
import WeekCalendar from'react-week-calendar';

import 'react-week-calendar/dist/style.less';

export default class CourseCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastUid: 1,
            selectedIntervals: []
        }
    }

    handleEventRemove = (event) => {
        const{selectedIntervals} = this.state;
        const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
        if (index > -1) {
            selectedIntervals.splice(index, 1);
            this.setState({selectedIntervals});
        }
    }

    handleEventUpdate = (event) => {
        const {selectedIntervals} = this.state;
        const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
        if (index > -1) {
            selectedIntervals[index] = event;
            this.setState({selectedIntervals});
        }
    }

    handleSelect = (newIntervals) => {
        alert("in Select");
        const{lastUid, selectedIntervals} = this.state;
        const intervals = newIntervals.map( (interval, index) => {
            return {
                ...interval,
                uid: lastUid + index
            }
        });

    this.setState({
        selectedIntervals: selectedIntervals.concat(intervals),
        lastUid: lastUid + newIntervals.length
    });

    }

    render() {
        return <WeekCalendar
            startTime= {moment({h:7, m:0})}
            endTime = {moment({h:19, m:0})}
            numberOfDays = {7}
            dayFormat={'dd.'}
            cellHeight={20}
            selectedIntervals = {this.state.selectedIntervals}
            onIntervalSelect = {this.handleSelect}
            onIntervalUpdate = {this.handleEventUpdate}
            onIntervalRemove = {this.handleEventRemove}
        />
    }
}