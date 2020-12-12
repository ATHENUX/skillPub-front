import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setPosts } from "Redux/Reducers/Posts";
import { connect } from "react-redux";

//material-UI
import Skeleton from "@material-ui/lab/Skeleton";
import { useProfileStyles } from "Assets/Styles/profileStyles";

//componensts
import Sidebar from "Components/profile/Sidebar";
import SidebarMd from "Components/profile/SidebarMd";
import SkeletonSidebar from "Components/profile/SkeletonSidebar";
import SkeletonSidebarMd from "Components/profile/SkeletonSidebarMd";
import AppBarProfile from "Components/profile/AppBarProfile";
import AppBarProfileMd from "Components/profile/AppBarProfileMd";
import Post from "Components/post/Post";
import SnackBar from "Components/SnackBar";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

const Profile = ({ setPosts, posts }) => {
  const [snackBar, setSnackBar] = useState({
    show: false,
    message: "",
    vertical: "top",
    horizontal: "left",
    severity: "error",
  });
  const [isFixed, setIsFixed] = useState(false);
  const [isFixedMd, setIsFixedMd] = useState(false);
  const [loading, setloading] = useState(false);
  const classes = useProfileStyles();
  const [user, setUser] = useState({});
  const ref = useRef(null);
  const { userID } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollMd);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
      window.removeEventListener("scroll", () => handleScrollMd);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          "/api/getUser",
          { id: userID },
          { headers: { auth: localStorage.getItem("session") } }
        );
        const resPosts = await axios.post(
          "/api/getPostsProfile",
          { id: userID },
          { headers: { auth: localStorage.getItem("session") } }
        );
        if (res.data.success && resPosts.data.success) {
          setUser(res.data.user);
          setPosts(resPosts.data.posts);
          setloading(true);
        }
      } catch (error) {
        setSnackBar({ ...snackBar, show: true, message: t("internal.server.error.title") });
      }
    })();
  }, [userID, snackBar, t, setPosts]);

  const handleScroll = () => {
    if (ref.current) {
      setIsFixed(Boolean(ref.current.getBoundingClientRect().top <= -136));
    }
  };

  const handleScrollMd = () => {
    if (ref.current) {
      setIsFixedMd(Boolean(ref.current.getBoundingClientRect().top <= -515));
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBar, show: false, severity: "error" });
  };

  return (
    <div>
      <div className={classes.bannerContent}>
        {loading ? (
          <img
            src="https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://imkova.cl/wp-content/uploads/2020/07/banner-editable-Fortnite-1.jpg"
            alt="banner"
            ref={ref}
          />
        ) : (
          <Skeleton variant="rect" height={300} ref={ref} />
        )}
      </div>
      {loading ? <Sidebar isFixed={isFixed} user={user} /> : <SkeletonSidebar isFixed={isFixed} />}
      {loading ? <SidebarMd user={user} /> : <SkeletonSidebarMd />}

      <AppBarProfile isFixed={isFixed} user={user} />
      <AppBarProfileMd isFixed={isFixedMd} user={user} />
      <div className={classes.postContainer}>
        {posts?.map((post, id) => (
          <Post key={post._id} user={user} post={post} id={id} />
        ))}
      </div>
      <SnackBar snackBar={snackBar} handleClose={handleCloseSnackBar} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.Posts,
});

const mapDispatchToProps = {
  setPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
