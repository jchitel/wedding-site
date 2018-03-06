import * as React from 'react';
import { centerText, colorPrimary } from '../styles';
import * as target from '../target.png';
import * as bbb from '../bedbathbeyond.png';
import * as amazon from '../amazon.png';


interface RegistryState {
    target: string;
    bbb: string;
    amazon: string;
}

const targetLink = 'https://www.target.com/gift-registry/giftgiver?registryId=32f2a8d63aa1458e82149d8abd922ebd&type=WEDDING';
const bbbLink = 'https://www.bedbathandbeyond.com/store/giftregistry/view_registry_guest.jsp?eventType=Wedding&registryId=545402352';
const amazonLink = 'https://www.amazon.com/wedding/jake-chitel-megan-heim-milwaukee-june-2018/registry/1PNJF2X8JJ9C1';

export default class Registry extends React.PureComponent<{}, RegistryState> {
    constructor(props: {}) {
        super(props);

        this.state = { target: '', bbb: '', amazon: '' };
    }

    componentDidMount() {
        this.setState({ target, bbb, amazon });
    }

    render() {
        const { target, bbb, amazon } = this.state;

        return (
            <>
                <span id="registry" style={{ ...centerText, fontSize: '4em' }}>Registries</span>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', maxHeight: 300 }}>
                    <a href={targetLink} target="_blank" style={{ width: '30%' }}>
                        <img style={{ width: '100%' }} src={target} />
                    </a>
                    <div style={{ border: `1px solid ${colorPrimary}` }} />
                    <a href={bbbLink} target="_blank" style={{ width: '30%' }}>
                        <img style={{ width: '100%' }} src={bbb} />
                    </a>
                    <div style={{ border: `1px solid ${colorPrimary}` }} />
                    <a href={amazonLink} target="_blank" style={{ width: '30%' }}>
                        <img style={{ width: '100%' }} src={amazon} />
                    </a>
                </div>
            </>
        );
    }
}