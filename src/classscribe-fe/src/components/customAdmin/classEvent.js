import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  professor: PropTypes.string.isRequired,
  lamp: PropTypes.string.isRequired,
  days: PropTypes.string.isRequired,
  building: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  semester: PropTypes.string.isRequired
};


class ClassEvent extends React.PureComponent {
  render() {
    const {
      start,
      end,
      name,
      professor
    } = this.props;
    return (
      <div className="event">
        <span>{`${start.format('H:mm')} - ${end.format('H:mm')}`}</span>
        <br></br>
        {name}
        <br></br>
        {professor}
      </div>
    );
  }
}

ClassEvent.propTypes = propTypes;
export default ClassEvent;