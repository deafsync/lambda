"use client";

import { signup } from "@/services/auth.service";
import Link from "next/link";
import React, {useState} from "react";
import { useRouter } from 'next/navigation';

import {toast} from "react-hot-toast"

export default function SignUpForm() {

  const router = useRouter();

  const [error, setError] = useState(0)
  const [state, setState] = useState({
      "password": "",
      "re_password": "",
      "email": ""
  })

  const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value;
      setState({...state, [name] : value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state)

    if(state.password != state.password) {
      setError(1)
    } else {
      signup(state)
        .then(res => {
          if(res) {
            if(res == 1) {
              toast.success("Check your email to continue")
              router.push('/otp');
            } else if(res == 2) {
              setError(2)
            } else if(res == 3) {
              setError(3)
            }
          } else {
            toast.error("An error occured")
          }
        })
      
    }

  };

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Sign Up</h3>
              <p className="mt-10">
                Already have an account?
                <Link href="/login" className="text-purple-1">
                  Log in
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-lg-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input 
                    required 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    value={state.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password *
                  </label>
                  <input 
                    required 
                    type="text" 
                    name="password" 
                    placeholder="Password"
                    value={state.password} 
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Confirm Password *
                  </label>
                  <input 
                    required 
                    type="text" 
                    name="re_password" 
                    placeholder="Confirm password" 
                    value={state.re_password}
                    onChange={handleChange}
                  />
                </div>
                <label className="text-16 lh-1 fw-500 text-red-1 my-10">
                  {error == 1 ? "non-compliant passwords" : error == 2 ? "existed email" : error == 3 ? "not robust password" : ""}
                </label>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className={`button -md -green-1 text-dark-1 fw-500 w-1/1`}
                  >
                    Register
                  </button> 
                </div>
              </form>

              {/* <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <div>
                  <button className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14">
                    Log In via Facebook
                  </button>
                </div>
                <div>
                  <button className="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14">
                    Log In via Google+
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
