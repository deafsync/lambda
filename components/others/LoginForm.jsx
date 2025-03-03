

"use client";

import { login, signup } from "@/services/auth.service";
import Link from "next/link";
import React, {useState} from "react";
import { useRouter } from 'next/navigation';

import {toast} from "react-hot-toast"

export default function SignUpForm() {

  const router = useRouter();

  const [error, setError] = useState(0)
  const [state, setState] = useState({
      "password": "",
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
      login(state)
        .then(res => {
          if(res) {
            if(res == 1) {
              router.push('/home');
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
            <h3 className="text-30 lh-13">Login</h3>
              <p className="mt-10">
                Don't have an account yet?
                <Link href="/signup" className="text-purple-1">
                  Sign up for free
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
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    value={state.password} 
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
                    Login
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
