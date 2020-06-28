// A REACT-LEAFLET VERSION OF ESRI-LEAFLET'S L.ESRI.GEOCODING.GEOSEARCH
// https://github.com/slutske22/react-leaflet-custom-components/blob/master/src/components/GeoSearch.jsx

import { withLeaflet, MapControl } from "react-leaflet";
import * as ELG from "esri-leaflet-geocoder";

class GeoSearch extends MapControl {
  createLeafletElement(props) {
    const searchOptions = {
       ...props,
      providers: props.providers.map( provider => ELG[provider]())
    };

    const GeoSearch = new ELG.Geosearch(searchOptions);
    return GeoSearch;
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default withLeaflet(GeoSearch);