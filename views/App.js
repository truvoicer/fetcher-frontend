import {AddAxiosInterceptors, LoadEnvironment} from "../library/api/global-scripts"
import React from "react";
import Header from "./Layout/Header";
import Site from "./Templates/Site";
import Footer from "./Layout/Footer";
import {validateToken} from "../redux/actions/session-actions";
import {connect} from "react-redux";
import {isObjectEmpty, isSet} from "../library/utils";
import {siteConfig} from "../config/site-config";
import {getWidget, setModalComponentAction} from "../redux/actions/page-actions";
import PageModal from "./Components/Modals/PageModal";

const FetcherApp = ({modal}) => {
    AddAxiosInterceptors();
    LoadEnvironment();
    validateToken();
    const getModal = () => {
        if (isSet(modal.component) && !isObjectEmpty(modal.component) && modal.show) {
            return (
                <PageModal show={modal.show}>
                    {getWidget(modal.component, modal.data)}
                </PageModal>
            )
        }
    }
    return (
        <>
            <div className="site-wrap">
                <Header/>
                <Site/>
                <Footer/>
            </div>
            {getModal()}
        </>
    )
}

function mapStateToProps(state) {
    // console.log(state.page.modal)
    return {
        modal: state.page.modal
    };
}

export default connect(
    mapStateToProps,
    null
)(FetcherApp);