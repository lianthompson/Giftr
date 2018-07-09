import React from 'react';
import { Jumbotron} from 'react-bootstrap';
import Search from './components/Search';
import Signup from './components/Signup';
import './Main.css';


class Main extends React.Component {

    render() {
        return (
            <div>
            <Signup auth={this.props.auth} history={this.props.history} />
            <Jumbotron>
                <div className="main-cta">
                    <h1>Giftr</h1>
                        <Search />
                </div>
            </Jumbotron>
            </div>
        );
    }

}

export default Main;

