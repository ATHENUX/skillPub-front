//axios
import axios from "axiosConfig";

const getUser = async (getUserData) => {
  try {
    const res = await axios.post(
      "/api/getUser",
      {},
      { headers: { auth: localStorage.getItem("session") } }
    );
    if (res.data.success) {
      getUserData(res.data.user);
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    console.error("error: ", error);
  }
};

export default getUser;
