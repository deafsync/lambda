import URL from "./api"

export const get_user = async () => {

    const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
    // console.log(token.refresh)
    const config = {
        headers: {
        'Authorization': `Bearer ${token.refresh}`,
        'Accept': 'application/json'
        }
    };

    const response = await URL.get(`/accounts/auth/me/`, config)
    .then((res) => {
        console.log(res.status)
        if(res.status == 201 || res.status == 200) {
          return res.data
        } else if(res.status == 400) {
            return false
        }
    })
      .catch((err) => {
        return false
      })

    // console.log("RESPONSE", response)
  
    return response 
}

export const update_user = async (credentials) => {

    const previous = await get_user()

    console.log(previous)

    const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
    // console.log(token.refresh)
    const config = {
        headers: {
        'Authorization': `Bearer ${token.refresh}`,
        'Accept': 'application/json'
        }
    };

    const response = await URL.patch(`/accounts/auth/user-me/update/`, {
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        email: previous.email,
        password: ""
    }, config)
    .then((res) => {
        console.log(res.status)
        if(res.status == 201 || res.status == 200) {
          return true
        } else if(res.status == 400) {
            return false
        }
    })
      .catch((err) => {
        return false
      })

    // console.log("RESPONSE", response)
  
    return response 
}