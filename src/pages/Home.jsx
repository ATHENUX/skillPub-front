import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { constants } from "constants/constants";
import { setPosts } from "Redux/Reducers/Posts";

//material-UI
import { Typography, useMediaQuery } from "@material-ui/core";
import useCustomStyles from "Assets/Styles/CustomStyles";
import { useTheme } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";

//components
import AddPost from "Components/addPosts/AddPost";
import PostHome from "Components/post/PostHome";
import InfiniteScroll from "react-infinite-scroll-component";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

//hooks
import useSEO from "Hooks/useSEO";

const Home = ({ posts, user, setPosts }) => {
  const classes = useCustomStyles();
  const theme = useTheme();
  const watch = useMediaQuery(theme.breakpoints.up("sm"));

  const [limit, setLimit] = useState(constants.numberPosts);
  const [hasMore, setHasMore] = useState(true);
  const { t } = useTranslation();

  useSEO({
    title: "Home",
    description: "home information",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          "/api/getPostsHome",
          { id: user._id, limit },
          { headers: { auth: localStorage.getItem("session") } }
        );
        const { success } = res.data;
        if (success) {
          setHasMore(res.data.hasMore);
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setPosts, limit, user]);

  const fetchMoreData = async () => {
    const newLimit = limit + constants.numberPosts;
    setLimit(newLimit);
    try {
      const res = await axios.post(
        "/api/getPostsHome",
        { id: user._id, limit },
        { headers: { auth: localStorage.getItem("session") } }
      );
      const { success } = res.data;
      if (success) {
        setHasMore(res.data.hasMore);
        setPosts(res.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.main}>
      <div className={watch ? classes.middle : ""}>
        <AddPost />

        {posts.length !== 0 ? (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <Typography variant="subtitle2" align="center">
                {t("loading.message")}
              </Typography>
            }
            endMessage={
              <Alert severity="info" variant="filled" style={{ margin: "10px 0" }}>
                {t("end.message")}
              </Alert>
            }
          >
            {posts?.map((post) => (
              <PostHome post={post} />
            ))}
          </InfiniteScroll>
        ) : (
          <Alert style={{ marginTop: 10 }} severity="info" variant="outlined">
            {t("no.following.message")}
          </Alert>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.User,
  posts: state.Posts,
});

const mapDispatchToProps = {
  setPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
