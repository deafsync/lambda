import URL from "./api"

/*

{
  "email": "user@example.com",
  "id": 2
}

{
  "email": [
    "Un objet user avec ce champ email existe déjà."
  ]
}

*/

export const auth = async () => {
  return localStorage.getItem('NiI.sInR5') ? true : false
}


export const signup = async (credentials) => {

    const response = await URL.post(`accounts/auth/`, credentials)
    .then((res) => {
        console.log(res.status)
        if(res.status == 201 || res.status == 200) {
          localStorage.setItem('NiI.sInR5-cCI-6I?kpX', JSON.stringify(res.data));

          return 1
        } else if(res.status == 400) {
          if(res.data.hasOwnProperty("email")) {
            return 2
          }
          if(res.data.hasOwnProperty("password")) {
            return 3
          }
        }

        return false
    })
      .catch((err) => {
        return false
      })

    // console.log("RESPONSE", response)
  
    return response 
}

export const otpCode = async (credentials) => {
    const email = JSON.parse(localStorage.getItem('NiI.sInR5-cCI-6I?kpX'));

    const response = await URL.get(`/accounts/auth/users/activation/${email.email}/${credentials.otp}/`)
    .then((res) => {
        console.log(res.status)
        if(res.status == 201 || res.status == 200 ) {
          if(res.data.message != "Invalid activation code")
            return 1
          return 2
        } else {
          return 2
        }
    })
      .catch(() => {
        return false
      })

    // console.log("RESPONSE", response)
  
    return response 
}

export const login = async (credentials) => {

  const response = await URL.post(`/accounts/auth/jwt/create/`, credentials)
  .then((res) => {
  console.log(res.status)
    if(res.status == 201 || res.status == 200) {
      localStorage.setItem('NiI.sInR5', JSON.stringify(res.data));
      return 1
    } else if(res.status == 400) {
      if(res.data.hasOwnProperty("email")) {
        return 2
      }
      if(res.data.hasOwnProperty("password")) {
        return 3
      }
    }

  return false
  })
    .catch(() => {
      return false
    })

  // console.log("RESPONSE", response)

  return response 
}

export const logout = async () => {
  const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
  console.log(token.refresh)
  const config = {
    headers: {
      'Authorization': `Bearer ${token.refresh}`,
      'accept': 'application/json'
    }
  };

  localStorage.removeItem('NiI.sInR5')

  // const response = await URL.post(`/accounts/auth/logout/`, {
  //   refresh: token.refresh
  // }, config)
  // .then((res) => {
  //     if(res.status == 201 || res.status == 200) {
  //       localStorage.setItem('NiI.sInR5', null);
  //       return 1
  //     } else if(res.status == 400) {
  //       return 2
  //     }
  //     return false
  // })
  //   .catch(() => {
  //     return false
  //   })

  return 1
}