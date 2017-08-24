import { connect } from 'react-redux';
import Map from '../components/Map';


const mapStateToProps = (state) => {
  let markers = [];
  if(state.isbn !== "" && state.bookInfo.hasOwnProperty('isbn')){
    markers.push(state.bookInfo);
    return {markers};
		}
		if(state.isbn !== "" && (state.bookInfo.hasOwnProperty('notfound'))){
    return {markers};
  }
  for (let prop in state.records) {
    markers.push({
      isbn: state.records[prop].isbn,
      name: state.records[prop].name,  
      latitude: Number(state.records[prop].latitude),
      longitude: Number(state.records[prop].longitude),
      category: state.records[prop].category
    });
  } 

  return { markers : markers };
}

export default connect(mapStateToProps)(Map);