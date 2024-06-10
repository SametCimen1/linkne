import { Cookies  } from 'react-cookie';
import ls from 'localstorage-slim';

  const cookies = new Cookies ();
 


  const getCookieRefreshToken = () => {
    const user = cookies.get("refresh");
    if(user === undefined){
      return false;
    }
    else{
      return user
    }
  };

  const updateNewRefreshToken = (token) => {
    cookies.set('refresh', token, {
      maxAge: 3600 * 24 * 7,
      secure: true,
      httpOnly: true
    });
    ls.set('refresh', token, {ttl:3600 * 24 * 7, encrypt: true})
    
  };

  const getAccessToken = () => {
    const user = cookies.get("acc");
    if(user === undefined){
      return false;
    }
    else{
      return user
    }
  };

  const getLocalRefreshToken = () => {
    return ls.get('refresh', {decrypt:true})
  };



  const updateAccessToken = (token) => {
    cookies.set('acc', '', {
      maxAge: 3600 * 24 * 7,
      secure: true,
      httpOnly: false
    })
  };

  
  const removeUser = () => {
    cookies.remove('refresh')
    cookies.remove('acc')
    cookies.remove('jwt')
  };
  
  const TokenService = {
    getCookieRefreshToken,
    updateNewRefreshToken,
    removeUser,
    updateAccessToken,
    getAccessToken,
    getLocalRefreshToken
  };
  
  export default TokenService;