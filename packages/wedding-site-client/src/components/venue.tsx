import * as React from 'react';
import { centerText } from '../styles';
import gesuImage from '../images/gesu.jpg';
import mamImage from '../images/mam.jpg';


interface VenueState {
    googleMapsHeight: number;
    googleMapsWidth: number;
}

export default class Venue extends React.PureComponent<{}, VenueState> {
    state: VenueState = { googleMapsHeight: 0, googleMapsWidth: 0 };

    setGoogleSize = (event: React.SyntheticEvent<HTMLImageElement>) => this.setState({
        googleMapsHeight: event.currentTarget.getBoundingClientRect().height | 0,
        googleMapsWidth: (event.currentTarget.getBoundingClientRect().width * 3 / 2) | 0
    });

    render() {
        const { googleMapsHeight, googleMapsWidth } = this.state;
        const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap`
                            + `?size=${googleMapsWidth}x${googleMapsHeight}`
                            + `&key=AIzaSyCB7uuMVKZcFx1fKpp6cpSoOlYBRnLG88o`
                            + `&markers=label%3AG%7CChurch%20of%20the%20Gesu`
                            + `&markers=label%3AP%7C43.0378191%2C-87.9270358`;

        return (
            <>
                <span id="venue" style={{ ...centerText, fontSize: '4em' }}>Ceremony</span>
                <span style={{ ...centerText, fontSize: '2.5em' }}>
                    <a href="http://www.gesuparish.org/" target="_blank">Church of the Gesu</a>
                </span>
                <span style={{ ...centerText, fontSize: '1.5em', marginBottom: 10 }}>1145 W Wisconsin Ave, Milwaukee, WI 53233</span>
                <div style={{ width: '80%', margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '40%' }}>
                        <img onLoad={this.setGoogleSize} src={gesuImage} style={{ width: '100%', height: 'auto' }} />
                    </div>
                    {googleMapsHeight && googleMapsWidth && <img src={googleMapsUrl} />}
                </div>
                <span style={{ ...centerText, fontSize: '1em' }}>Parking is available in Lot J behind the church, accessible via 11th St. Additional parking is available on nearby streets.</span>
                <span style={{ ...centerText, fontSize: '4em' }}>Reception</span>
                <span style={{ ...centerText, fontSize: '2.5em' }}>
                    <a href="https://mam.org/" target="_blank">Milwaukee Art Museum</a>
                </span>
                <span style={{ ...centerText, fontSize: '1.5em', marginBottom: 10 }}>700 N Art Museum Dr, Milwaukee, WI 53202</span>
                <img src={mamImage} style={{ width: '80%', display: 'block', margin: 'auto' }} />
            </>
        );
    }
}
