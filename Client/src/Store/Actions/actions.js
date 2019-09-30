export function fetchingCities(cities) {
    return {
        type: 'GET_CITIES',
        cities
    };
}

export function citiesIsLoaded(citiesLoaded) {
    return {
        type: 'CITIES_LOADED',
        citiesLoaded
    }
}

export function fetchCities() {
    return dispatch => {
        fetch("/api/city", {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then(response => response.json())
            .then(json => { 
               console.log(json)
              
                dispatch(fetchingCities(json))
                dispatch(citiesIsLoaded(true))
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export function fetchingItinerary(itineraries) {
    return {
        type: 'GET_CITY',
        itineraries,
    };
}
export function fetchItineraryForCity(name) {

    return dispatch => {
        fetch("/api/itinerary/" + name, {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then(response => response.json())
            .then(json => {
                dispatch(fetchingItinerary(json))
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export function postComments(commentAdded) {
    return {
        type: 'POST_COMMENT',
        commentAdded,
    };
}

export function postingComments(comments) {

    return dispatch => {
        fetch("/api/comments/add", {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "post=" + comments.post + "&time=" + comments.time + "&ref=" + comments.ref
        })
            .then(response => {
                console.log(response)
                dispatch(postComments(true))
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export function getComments(comments) {
    return {
        type: 'GET_COMMENTS',
        comments,
    };
}

export function commentsAreLoaded(commentsLoaded) {
    return {
        type: 'COMMENTS_LOADED',
        commentsLoaded,
    };
}

export function gettingComments(reference) {

    return dispatch => {
        fetch("/api/comments/get/" + reference, {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },

        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                dispatch(getComments(json))
                dispatch(commentsAreLoaded(true))
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export function signUpSuccess(userAdded) {
    return {
        type: 'CREATE_USER',
        userAdded,
    };
}

export function signUp(information) {

    return dispatch => {

            fetch("/api/user/create", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "username=" + information.username + "&email=" + information.email + "&password=" + information.password
            })
                .then(response => {
                   
                    if(response.status == 200) {
                        dispatch(loginUser(information))
                        dispatch(signUpSuccess(true))
                    } else {
                        console.log(response)
                    }   
                })
                .catch((error) => {
                    console.error(error);
                });
        } 

    }

export function loginSuccess(userLoggedIn) {
        return {
            type: 'LOGIN_USER',
            userLoggedIn,
        };
    }

export function loginUser(userInfo) {
        return dispatch => {

            fetch("/api/user/login", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "email=" + userInfo.email + "&password=" + userInfo.password
            })
                .then(response => response.json()
                    // response.json()
                  
                
                    // if(response.status == 500) {
                    //     console.log("Something went wrong....again")
                    // } else {
                    // dispatch(loginSuccess(true))
                    // }
               
                ).then( m => {
                    if(m.success == false){
                        console.log(m.message)
                    } else {
                        console.log(m.message)
                    localStorage("token", m.token);
                    dispatch(loginSuccess(true))
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } 
    }

export function createGoogleUser(code) {

        return dispatch => {
            fetch("/auth/google/redirect" + code, {
                method: "GET",
                mode: "no-cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(response => {
               console.log(response)
                // dispatch(signUpSuccess(true))
                return response.json()
            })
            .then( m => {
                console.log(m)
            }
            )
            .catch((error) => {
                    console.log(error);
                });
        }
    }

export function logoutSuccess(userLoggedOut) {
        return {
            type: 'LOGOUT_USER',
            userLoggedOut,
        };
    }

 export function logoutUser(token) {

        return dispatch => {
            fetch("/api/user/logout?token=" + token, {
                method: "GET",
                mode: "no-cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
    
            })
                .then(response => response.json())
                .then(json => {
                    if(json.success == false){
                        console.log(json.message)
                    } else {
                    console.log(json.message)
                    localStorage.removeItem("token");
                     dispatch(logoutSuccess(true))
                    }  
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    


    // export function verifySuccess(userLoggedIn) {
    //     return {
    //         type: 'LOGIN_USER',
    //         userLoggedIn,
    //     };
    // }

    // export function verifyUser() {

    //     return dispatch => {
    //         fetch("/api/user/verify/" + token, {
    //             method: "GET",
    //             mode: "no-cors",
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    
    //         })
    //             .then(response => response.json())
    //             .then(json => {
    //                 console.log(json)
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     }
    // }

