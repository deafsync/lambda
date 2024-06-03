"use client";

import { otpCode } from "@/services/auth.service";
import React, {useState} from "react";
import { useRouter } from 'next/navigation';

import {toast} from "react-hot-toast"

export default function OtpForm() {

  const router = useRouter();

  const [error, setError] = useState(0)
  const [state, setState] = useState({
      "otp": ""
  })

  const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value;
      setState({...state, [name] : value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(state)

    otpCode(state)
        .then(res => {
            if(res) {
                if(res == 1) {
                    toast.success("Check your email to continue")
                    router.push('/login');
                } else if(res == 2) {
                    setError(2)
                    toast.error("An error occured")
                } 
            } else {
                toast.error("An error occured")
            }
        })

  };

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Check OTP code</h3>
              <p className="mt-10">
                Put your otp code from your email box
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-lg-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    OTP Code
                  </label>
                  <input 
                    required 
                    type="text" 
                    name="otp" 
                    placeholder="Otp" 
                    value={state.otp}
                    onChange={handleChange}
                  />
                </div>

                <label className="text-16 lh-1 fw-500 text-red-1 my-10">
                  {error == 2 ? "Incorrect information" : ""}
                </label>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className={`button -md -green-1 text-dark-1 fw-500 w-1/1`}
                  >
                    Check otp code
                  </button> 
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
