import React, {Component} from 'react';

class UserMessages extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="user-account-area user-account-details bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 mb-5" data-aos="fade">
                            <h2>Messages</h2>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserMessages;
