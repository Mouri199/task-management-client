import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';
import { useRef } from "react";
import contact from '../contact.json'
import Lottie from "lottie-react";

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_mnymkyt', 'template_zpb7lho', form.current, 'iAkV4IloxEPF5lThP')
            .then((result) => {
                console.log(result.text);
                console.log('message sent');
                Swal.fire("Message send succesfully!");
                form.current.reset();
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <div>

            <div className=" lg:flex justify-between lg:gap-48 lg:mx-24 mx-10 lg:mt-32 mt-10 mb-10" >
                <Lottie animationData={contact}></Lottie>

                <div>
                    <p className="text-xl font-work font-bold text-[#DAFFFB] uppercase lg:my-7">Let's talk</p>
                    <h3 className="font-play lg:text-4xl text-3xl font-medium text-[#DAFFFB] lg:mb-10">Get in Touch</h3>
                    <form ref={form} onSubmit={sendEmail} className="flex text-[#DAFFFB] flex-col">
                        <label>Name</label>
                        <input type="text" placeholder="enter your name" className="p-3 rounded-xl lg:w-[400px] bg-[#176B87]" name="user_name" id="" />
                        <label>Email</label>
                        <input type="text" placeholder="enter your email" className="p-3 rounded-xl lg:w-[400px] bg-[#176B87]" name="user_email" id="" />
                        <label>Message</label>
                        <input type="text" placeholder="enter your message " className="p-3 rounded-xl lg:w-[400px] pb-40 bg-[#176B87]" name="message" id="" />

                        <input type="submit" value='Send Now' className="lg:p-2 p-1 rounded-lg lg:w-[100px] btn-outline shadow-[0_10px_15px_-3px_rgb(73,162,163)] hover:bg-[#176B87] text-[#DAFFFB] mt-5" />
                    </form>
                </div>



            </div>
        </div>
    );
};

export default Contact;