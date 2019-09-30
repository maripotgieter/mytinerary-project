const initState = {
    cities: [],
    itineraries: {},
    citiesLoaded: false,
    commentAdded: false,
    comments: [],
    commentsLoaded: false,
    userAdded: false,
    userLoggedIn: false,
    userLoggedOut: false,
}

function rootReducer (state = initState, action) {
        if(action.type === "GET_CITIES"){
          state =   {
                ...state,
                cities: action.cities
            }
        }
        if(action.type === "GET_CITY"){
          state =   {
                ...state,
                itineraries: action.itineraries,
            }
            
        }
        if(action.type === 'CITIES_LOADED'){
          state = {
            ...state,
            citiesLoaded: action.citiesLoaded,
          }
        }
        if(action.type === 'POST_COMMENT'){
          state = {
            ...state,
            commentAdded:action.commentAdded,
          }
        }
        if(action.type === 'GET_COMMENTS') {
          state = {
            ...state,
            comments: action.comments,
          }
        }
        if(action.type === 'COMMENTS_LOADED'){
          state = {
            ...state,
            commentsLoaded: action.commentsLoaded,
          }
        }
        if(action.type === 'CREATE_USER') {
          state = {
            ...state,
            userAdded: action.userAdded,
          }
        }
        if(action.type === 'LOGIN_USER') {
          state = {
            ...state,
            userLoggedIn: action.userLoggedIn,
          }
        }
        if(action.type === 'LOGOUT_USER') {
          state = {
            ...state,
            userLoggedOut: action.userLoggedOut,
          }
        }


    return state
  }

export default rootReducer


  