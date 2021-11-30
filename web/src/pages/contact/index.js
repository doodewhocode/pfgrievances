import React, { useEffect } from 'react'
import banner from '../../assets/banner-img2.png'
import Header from '../header'
import Footer from '../footer/footer'
function Contact() {
    return (
        <>
            <Header />
            <div class="section-gap  pt-5" style={{ marginLeft: '1.5rem' }}>
                <div class="contact-us">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 mt-5">
                                <div class="heading">We’d love to hear from you!</div>
                                <div class="description pt-5">Whether you have a question about features, pricing, need a demo,
                                    or anything else, our team is ready to answer all your questions.</div>
                                <div class="details pt-5">Call us at </div>
                                <div class=""> 91- 9886686263 / +91- 8124507850</div>
                                <div class="details pt-3"> Email Us At </div>
                                <div> ananth@complyhrm.com / bala@complyhrm.com </div>
                            </div>
                            <div class="col-md-6 mt-5">
                                <div class="contact-img">
                                    <img src={banner} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Contact

