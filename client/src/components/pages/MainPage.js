import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";

class MainPage extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Fragment>
                <Link to='/signup'>SignUP</Link><br />
                <Link to='/signin'>SignIN</Link>
            </Fragment>
        );
    }

}

export default MainPage;
