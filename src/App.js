import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import SearchBar from './components/SearchBar';
import DayCard from './components/DayCard';
import DayDetails from './components/DayDetails';
import sampleData from './data/sample.json';


console.log("This is our sampleData.json: ", sampleData);

const App = () => {
  const [state, setState] = useState({
    searchTerm: "",
    selectedDay: null,
    days: sampleData.data, 
    location: "Denver, CO", 
    // days: [], 
    // location: "" 
  });

  const { searchTerm, selectedDay, days, location } = state;

  return (
  <Container>
    <Row>
      <Col md={7}> <h1> Weather for CITY, ST </h1> </Col>
      <Col md={5}> 
        <SearchBar />
      </Col>
    </Row>
    <Row>
      {sampleData.data.map(day => (
        <DayCard 
        key={day.valid_date}
        isSelected={day === selectedDay}
        setSelected= {()=> setState({...state, selectedDay: day})}
        temp={day.temp}
        high={day.high_temp}
        low={day.low_temp}
        icon={day.weather.icon}
        description={day.weather.description}
        day={moment(day.valid_date, "YYYY-MM-DD").format("dddd")}
        />
      ))}
    </Row>
    <Row>
      <Col>
        {selectedDay ? (
            <DayDetails
            day={moment(selectedDay.valid_date, "YYYY-MM-DD").format("dddd, MMMM Do, YYYY")}
            temp={selectedDay.temp}
            high={selectedDay.high_temp}
            appHigh={selectedDay.app_max_temp}
            low={selectedDay.low_temp}
            appLow={selectedDay.app_min_temp}
            icon={selectedDay.weather.icon}
            description={selectedDay.weather.description}
            precip={selectedDay.pop}
            humidity={selectedDay.rh}
            windSpeed={selectedDay.wind_spd}
            windDir={selectedDay.wind_cdir_full}
            /> ) : (
              <h3>{days.length ? "Click on a day above to view details!" : null}</h3>
            )}
      </Col>
    </Row>

  </Container>
  );
}

export default App;
