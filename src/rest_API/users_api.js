import axios from "axios";
import Cookies from "js-cookie";
export const postLogin = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/users/v1/login",
      {
        email: email,
        password: password,
      }
    );

    // Assuming the cookie name is 'access-token'
    const accessToken = getCookie("access-token");
    // Save the token as a cookie
    Cookies.set("access-token", accessToken, {
      expires: 7,
      secure: true,
      sameSite: "None",
    });

    return accessToken;
  } catch (error) {
    console.error(
      "Error logging in:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Function to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
