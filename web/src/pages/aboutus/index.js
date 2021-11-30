import React, { useEffect } from 'react'
import pexels from '../../assets/pexels-fauxels-3184418.jpg'
import Header from '../header'
import Footer from '../footer/footer'

function AboutUs() {
    return (
        <>
            <Header />
            <div class="section-gap pt-5" style={{ marginLeft: '1.5rem' }}>
                <div class="about-us" id="services" class="section">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 text-center mt-5">
                                <div class="title" style={{ padding: '0 150px' }}>We're putting
                                    imagination to work</div>
                                <div class="description text-center mt-3" style={{ padding: '0 150px' }}>We Comply HR incorporated in 2021. ComplyHR  is one stop shop, data driven E compliance  Cloud based Platform,  for your company’s compliance requirements ,we are in the vision to provide  the following services governance ,Grievances management , HR Policies , Evidence Archive, Employee On boarding ,Auto  labour law registers generations ,Live chat  & other  Compliance solutions across the organizations varying from different Business segments under different labor acts.
                                </div>
                            </div>
                            <div class="col-12 ">
                                <div class="about-img mt-5">
                                    <img src={pexels} />
                                </div>
                            </div>

                            <div class="col-md-12 mt-5">
                                <div class="title">more</div>
                            </div>
                            <div class="col-md-6 mt-5">
                                <div class="description text-justify"> ComplyHR is purely focused & provides the services in moto of Labour Law Auditee  support , feasibility &  improve their  operational efficiencies  in a wide range of 360 degree  in real time through auto monitoring compliance. Our sms & mails alerts to our customers with statutory due date, Amendments & Task closures.by reducing risks in business and staying on course to success without any setbacks</div>
                            </div>
                            <div class="col-md-6 mt-5">
                                <div class="description text-justify"> Our training vertical helps for upskilling  your workforce with ComplyHR Cloud Based learning management system  for all the business  , to train your employees  with  efficiency with our easy to use interface</div>
                            </div>

                            <div class="col-md-6 mt-5">
                                <div class="description text-justify">

                                    Comply HR is an online product designed and owned by Pro Vista Enterprises, who gives simplified solutions for all your compliance operations, with the ground level understanding of the clients requirements in the market.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs
