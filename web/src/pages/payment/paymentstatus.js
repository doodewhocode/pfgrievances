import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
function PaymentStatus(props) {
    const search = props.location.search;
    const txnid = new URLSearchParams(search).get('txnid');
    const status = new URLSearchParams(search).get('status');
    return (
        <>
            {status && <div>
                <h4>Payment is successfully done !</h4>
                <h5>  please note the tranaction id <b>{txnid} </b> for future references </h5>
                <span> Thank you for choosing complyhr </span>
                <span>please visit main screen to track or find out the process</span>
                <a> click here to check the status </a>

            </div>}

            {!status && <div>
                <h4>Payment is failed, please try again or contact support team via mail info@complyhr.com</h4>
                <h5>  please note the tranaction id <b>{txnid} </b> for future references </h5>
                <a> click here to retry payment </a>
            </div>}
        </>
    )
}
const mapStoreToProps = state => ({
})
const mapDispatchToProps = {
}
export default connect(mapStoreToProps, mapDispatchToProps)(PaymentStatus)