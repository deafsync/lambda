import URL from "./api"

export const create_category = async (credentials) => {

    const response = await URL.post(`/formations/categorie_formations/`, credentials)
    .then((res) => {
        console.log(res.status)
        if(res.status == 201) {
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

export const get_categories = async () => {

    const response = await URL.get(`/formations/categorie_formations/`)
    .then((res) => {
        if(res.status == 201 || res.status == 200) {
        return res.data
        } else if(res.status == 400) {
            return false
        }
    })
      .catch((err) => {
        return false
      })

    console.log("RESPONSE", response)
  
    return response 
}

export const get_formations_number = async () => {

  let number = 0 

  const response = await URL.get(`/formations/categorie_formations/`)
  .then((res) => {
      if(res.status == 201 || res.status == 200) {
        console.log(res.data.length)
        for(let i = 0; i < res.data.length; i++) {
          number += res.data[i].formations.length
          console.log(res.data[i].formations.length)
        }

        return number
      } else if(res.status == 400) {
          return number
      }
  })
    .catch((err) => {
      return number
    })

  console.log("RESPONSE Formation", response)

  return response 
}

export const create_formation = async (credentials) => {

  const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
  // console.log(token.refresh)
  const config = {
    headers: {
      'Authorization': `Bearer ${token.refresh}`,
      'content-type' : 'multipart/form-data',
      'Accept': 'application/json'
    }
  };

  const response = await URL.post(`/formations/formations/`,
   credentials,
   config
  )
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

export const get_formations = async () => {

  const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
  // console.log(token.refresh)
  const config = {
    headers: {
      'Authorization': `Bearer ${token.refresh}`,
      'content-type' : 'multipart/form-data',
      'Accept': 'application/json'
    }
  };

  const response = await URL.get(`/formations/user_formations/`,
    config
  )
  .then((res) => {
    console.log(res.data)
    if(res.status == 201 || res.status == 200) {
    return res.data
    } else if(res.status == 400) {
        return false
    }
  })
    .catch((err) => {
      return false
    })

  console.log("RESPONSE", response)

  return response 
}

export const get_users_number = async () => {

  let number = 0 

  const response = await URL.get(`/accounts/auth/user/all/`)
  .then((res) => {
      if(res.status == 201 || res.status == 200) {
        return res.data.length
      } else if(res.status == 400) {
          return number
      }
  })
    .catch((err) => {
      return number
    })

  console.log("RESPONSE", response)

  return response 
}

export const get_admin_formations = async () => {

  const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
  // console.log(token.refresh)
  const config = {
    headers: {
      'Authorization': `Bearer ${token.refresh}`,
      'content-type' : 'multipart/form-data',
      'Accept': 'application/json'
    }
  };

  const response = await URL.get(`/formations/formations/my_courses/`,
    config
  )
  .then((res) => {
    console.log(res.data)
    if(res.status == 201 || res.status == 200) {
      return res.data
    } else if(res.status == 400) {
        return false
    }
  })
    .catch((err) => {
      return false
    })

  console.log("RESPONSE", response)

  return response 
}

export const get_one_formations = async (id) => {

  const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
  // console.log(token.refresh)
  const config = {
    headers: {
      'Authorization': `Bearer ${token.refresh}`,
      'Accept': 'application/json'
    }
  };

  const response = await URL.get(`/formations/formations/${id}/`,
    config
  )
  .then((res) => {
    if(res.status == 201 || res.status == 200) {
      return res.data
    } else if(res.status == 400) {
        return false
    }
  })
    .catch((err) => {
      return false
    })

  console.log("RESPONSE", response)

  return response 
}

export const create_course = async (credentials) => {

  const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
  // console.log(token.refresh)
  const config = {
    headers: {
      'Authorization': `Bearer ${token.refresh}`,
    }
  };

  const response = await URL.post(`/formations/cours/`,
   credentials,
   config
  )
  .then((res) => {
      console.log(res.data)
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

export const get_course = async (id) => {

  const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
  // console.log(token.refresh)
  const config = {
    headers: {
      'Authorization': `Bearer ${token.refresh}`,
      'Accept': 'application/json'
    }
  };

  const response = await URL.get(`/formations/cours/${id}/`,
   config
  )
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

export const get_formations_list = async () => {

  const response = await URL.get(`/formations/categorie_formations/`)
  .then((res) => {
      if(res.status == 201 || res.status == 200) {
        console.log(res.data)
        let data = []
        res.data.map(el => data.push(...el.formations))
        return data
      } else if(res.status == 400) {
          return false
      }
  })
    .catch((err) => {
      return false
    })

  console.log("RESPONSE ??", response)

  return response 
}

export const proceed_course = async (id) => {

  const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
  // console.log(token.refresh)
  const config = {
    headers: {
      'Authorization': `Bearer ${token.refresh}`,
      'Accept': 'application/json'
    }
  };

  const user = JSON.parse(localStorage.getItem("NiI.sInR5-cCI-6I?kpX-@6I?kpX"))

  const response = await URL.post(`/formations/user_formations/`, {
      user: user.id,
      formation: id
    },
   config
  )
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

export const get_user_formations = async () => {

  const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
  // console.log(token.refresh)
  const config = {
    headers: {
      'Authorization': `Bearer ${token.refresh}`,
      'Accept': 'application/json'
    }
  };

  const response = await URL.get(`/formations/user_formations/`, config)
    .then((res) => {
        if(res.status == 201 || res.status == 200) {
          console.log("------------------", res.data)
          let data = res.data.map(el => {
              if (!el.formation) {  
                  console.warn("⚠️ Formation null détectée pour l'élément :", el);
                  return null; // Ignore l'élément si la formation est null
              }

              el.formation["form_id"] = el.id;
              return el.formation;
          }).filter(el => el !== null); // Supprime les valeurs null

          return data
        } else if(res.status == 400) {
          return false
        }
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des formations:", err);

      return false
    })

  console.log("RESPONSE USER FORMATION", response)

  return response 
}

export const get_user_formation = async (id) => {

  const token = JSON.parse(localStorage.getItem('NiI.sInR5'));
  // console.log(token.refresh)
  const config = {
    headers: {
      'Authorization': `Bearer ${token.refresh}`,
      'Accept': 'application/json'
    }
  };

  const response = await URL.get(`/formations/user_formations/${id}/`, config)
    .then((res) => {
        if(res.status == 201 || res.status == 200) {
          return res.data.formation
        } else if(res.status == 400) {
            return false
        }
    })
    .catch((err) => {
      return false
    })

  console.log("RESPONSE USER FORMATION", response)

  return response 
}