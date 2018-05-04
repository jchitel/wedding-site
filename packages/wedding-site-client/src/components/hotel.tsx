import * as React from 'react';
import { centerText } from '../styles';


export default function Hotel() {
    return (
        <>
            <span id="hotel" style={{ ...centerText, fontSize: '4em' }}>Hotel</span>
            <span style={{ ...centerText, fontSize: '2.5em' }}>Fairfield Inn &amp; Suites Milwaukee Downtown</span>
            <span style={{ ...centerText, fontSize: '1.5em' }}>710 N Old World Third St, Milwaukee, Wisconsin 53203</span>
            <span style={{ ...centerText, fontSize: '2em' }}>
                <a href="http://www.marriott.com/meeting-event-hotels/group-corporate-travel/groupCorp.mi?resLinkData=Heim%20%26%20Chitel%20Wedding%5Emkefd%60HEIHEIK%7CHEIHEIQ%60169.00%60USD%60false%604%606/22/18%606/24/18%606/1/18&app=resvlink&stop_mobi=yes" target="_blank">Reserve your room here!</a>
            </span>
        </>
    );
}
