import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

export function AddLibrary(url) {
    const script = document.createElement('script');
    script.src = url
    script.async = true;
    document.body.appendChild(script);
}
function EnableIframe(props) {
    console.log(props)

    useEffect(() => {

        window.addEventListener('load', function (e) {
            var key = props.location.state['key'];
            var access_key = props.location.state['access_key'];
            var easebuzzCheckout = new window.EasebuzzCheckout(key, "prod")
            console.log("easebuzzCheckout", easebuzzCheckout)
            var options = {
                access_key: access_key, // access key received via Initiate Payment
                onResponse: (response) => {
                    document.getElementById('response').innerText = JSON.stringify(response);
                },
                theme: "#123456" // color hex
            }
            easebuzzCheckout.initiatePayment(options);
        })
        // return () => {
        //     document.body.removeChild(script);
        // }
    }, [])
    return (<>
        {AddLibrary("https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js")}
        
        <p id='response'></p>
    </>)
}

const mapStoreToProps = state => ({
})
const mapDispatchToProps = {
}
export default connect(mapStoreToProps, mapDispatchToProps)(EnableIframe)