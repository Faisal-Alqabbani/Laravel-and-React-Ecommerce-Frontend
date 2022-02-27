import axios from "axios";
import React, { Component, Fragment } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppURL from "../../api/AppURL";
import validation from "../../validation/validation";
export class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      message: "",
    };
  }
  nameOnChange = (e) => {
    let name = e.target.value;
    // alert(name);
    this.setState({ name: name });
  };
  emailOnChange = (e) => {
    let email = e.target.value;
    this.setState({ email: email });
  };
  messageOnChange = (e) => {
    let message = e.target.value;
    this.setState({ message: message });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    let name = this.state.name;
    let email = this.state.email;
    let message = this.state.message;
    let sendBtn = document.getElementById("sendBtn");
    let contactForm = document.getElementById("contactForm");
    contactForm.reset();
    if (message.length === 0) {
      toast.error("Please Write your message");
    } else if (name.length === 0) {
      toast.error("Please Write your name");
    } else if (email.length === 0) {
      toast.error("Please Write your email");
    } else if (!validation.NameRegx.test(name)) {
      toast.error("Invalid Name");
    } else {
      sendBtn.innerText = "Sending...";

      let MyFormData = new FormData();
      MyFormData.append("name", name);
      MyFormData.append("email", email);
      MyFormData.append("message", message);
      axios
        .post(AppURL.PostContact, MyFormData)
        .then(function (response) {
          if (response.status === 200 && response.data === 1) {
            toast.success("Message has sent Successfully");
            sendBtn.innerText = "Send";
            contactForm.reset();
            this.setState({
              name: "",
              email: "",
              message: "",
            });
          } else {
            toast.error("Error");
          }
        })
        .catch(function (error) {
          toast.error(error);
          sendBtn.innerText = "Send";
        });
    }
  };
  render() {
    return (
      <Fragment>
        <Container>
          <Row className="p-2">
            <Col className="shadow-sm bg-white" md={12} lg={12} sm={12} xs={12}>
              <Row className="text-center">
                <Col
                  className="d-flex justify-content-center"
                  md={6}
                  lg={6}
                  sm={6}
                  xs={6}
                >
                  <Form
                    id="contactForm"
                    onSubmit={this.onFormSubmit}
                    className="onboardForm"
                  >
                    <h4 className="section-title-login">USER SIGN IN</h4>
                    <h6 className="section-sub-title">
                      Please Enter Your Contact With Us.
                    </h6>
                    <input
                      type="text"
                      className="form-control m-2"
                      placeholder="Enter Your Name"
                      onChange={this.nameOnChange}
                    />
                    <input
                      type="text"
                      className="form-control m-2"
                      placeholder="Enter Your Email Address"
                      onChange={this.emailOnChange}
                    />
                    <Form.Control
                      as="textarea"
                      className="form-control m-2"
                      rows={3}
                      placeholder="Enter Your Message"
                      onChange={this.messageOnChange}
                    />
                    <Button
                      type="submit"
                      className="btn btn-block m-2 site-btn-login"
                      id="sendBtn"
                    >
                      Send
                    </Button>
                  </Form>
                </Col>
                <Col md={6} lg={6} sm={6} xs={6}>
                  <h4 className="section-title-login">OUR ADDRESS</h4>
                  <p className="section-title-contact">
                    Lorem ipsum dolor sit amet consectetur <br /> Email:
                    faisal.alqabbani1@gmail.com
                  </p>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830916178!2d-73.83959827460342!3d40.697663748583444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2z2YbZitmI2YrZiNix2YPYjCDYp9mE2YjZhNin2YrYp9iqINin2YTZhdiq2K3Yr9ip!5e0!3m2!1sar!2ssa!4v1640592093186!5m2!1sar!2ssa"
                    width="600"
                    styles="border:0;"
                    height="450"
                    title="contact-app"
                    allowfullscreen=""
                    loading="lazy"
                  ></iframe>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </Fragment>
    );
  }
}

export default Contact;
