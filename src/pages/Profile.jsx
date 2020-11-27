import { useRef, useEffect, useState } from "react";

//material ui
import { useProfileStyles } from "Assets/Styles/profileStyles";

//componenst
import Sidebar from "Components/profile/Sidebar";
import AppBarProfile from "Components/profile/AppBarProfile";
import Post from "Components/profile/Post";

const Profile = () => {
  const classes = useProfileStyles();
  const ref = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (ref.current) {
      setIsFixed(Boolean(ref.current.getBoundingClientRect().top <= -136)); //-134
    }
  };

  return (
    <div>
      <div className={classes.bannerContent}>
        <img
          src="https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://imkova.cl/wp-content/uploads/2020/07/banner-editable-Fortnite-1.jpg"
          alt="banner"
          ref={ref}
        />
      </div>

      <Sidebar isFixed={isFixed} />
      <AppBarProfile isFixed={isFixed} />
      <Post />
    </div>
  );
};

export default Profile;
