import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setPosts } from "Redux/Reducers/Posts";
import { connect } from "react-redux";
import { constants } from "constants/constants";

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
import { Image } from "cloudinary-react";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

//hooks
import useSEO from "Hooks/useSEO";

const Profile = ({ setPosts, posts, userState }) => {
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
  const [limit, setLimit] = useState(constants.numberPosts);
  const [postsCount, setPostsCount] = useState(0);
  const ref = useRef(null);
  const visor = useRef(null);
  const { userID } = useParams();
  const { t } = useTranslation();

  useSEO({ title: "profile", description: "User profile" });

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
        const resCountPosts = await axios.post(
          "/api/countPosts",
          { id: userID },
          { headers: { auth: localStorage.getItem("session") } }
        );

        if (res.data.success && resCountPosts.data.success) {
          setPostsCount(resCountPosts.data.count + constants.numberPosts);
          setUser(res.data.user);
          setloading(true);
        }
      } catch (error) {
        setSnackBar({ ...snackBar, show: true, message: t("internal.server.error.title") });
      }
    })();
  }, [userID, snackBar, t, setPosts]);

  useEffect(() => {
    const callback = async (entries, observer) => {
      const el = entries[0];
      if (limit <= postsCount) {
        if (el.isIntersecting) {
          const res = await axios.post(
            "/api/getPostsProfile",
            { id: userID, limit },
            { headers: { auth: localStorage.getItem("session") } }
          );

          if (res.data.success) {
            setLimit(limit + constants.numberPosts);
            observer.disconnect();
            setPosts(res.data.posts);
          }
        }
      }
    };
    let observer = new IntersectionObserver(callback, {
      rootMargin: "1000px",
      threshold: 1.0,
    });

    observer.observe(visor.current);
  }, [setPosts, userID, limit, postsCount]);

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
          <>
            {userState.banner ? (
              <Image publicId={userState.banner} cloudName={process.env.REACT_APP_CLOUD_NAME} />
            ) : (
              <img
                src="https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://imkova.cl/wp-content/uploads/2020/07/banner-editable-Fortnite-1.jpg"
                alt="banner"
                ref={ref}
              />
            )}
          </>
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
        <div id="visor" ref={visor}></div>
      </div>
      <SnackBar snackBar={snackBar} handleClose={handleCloseSnackBar} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.Posts,
  userState: state.User,
});

const mapDispatchToProps = {
  setPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
