import { useState } from "react";
import { setPosts } from "Redux/Reducers/Posts";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//material-UI
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Container,
  Divider,
  Button,
} from "@material-ui/core";
import { usePostStyles } from "Assets/Styles/postsStyles";
import Carousel from "react-material-ui-carousel";

//components
import SimpleHeader from "./SimpleHeader";
import HardHeader from "./HardHeader";
import Actions from "./Actions";
import SnackBar from "Components/SnackBar";
import { Image } from "cloudinary-react";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

const Post = ({ post, posts, setPosts, id, user, myUser }) => {
  const classes = usePostStyles();
  const [snackBar, setSnackBar] = useState({
    show: false,
    message: "",
    vertical: "top",
    horizontal: "center",
    severity: "error",
  });
  const [activeShare, setActiveShare] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { t } = useTranslation();

  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBar, show: false, severity: "error" });
  };

  const handleRepublish = async (data) => {
    try {
      const findUser = posts[id].republishedUsersId.find((id) => {
        return id === myUser._id;
      });

      if (findUser !== undefined) {
        setSnackBar({
          ...snackBar,
          message: t("post.republished.message.error"),
          show: true,
        });
      } else {
        //the model of the data to send to create the republication
        const share = {
          userId: myUser._id,
          thumbnailsList: post?.thumbnailsList,
          republishedValidation: true,
          bodyContent: data.bodyContent,
          republishedBodyContent: post?.bodyContent,
          republishedUserId: user._id,
        };

        //the model of the data to send to assign the user who published the original publication and to know the number of Republicans that the publication has
        const republishedIds = {
          userId: myUser._id,
          postId: post._id,
        };

        const res = await axios.post(
          "/api/republishPost",
          { share, republishedIds },
          { headers: { auth: localStorage.getItem("session") } }
        );

        const { success, message } = res.data;
        if (success) {
          const newPosts = posts;
          const republishedUsersId = posts[id].republishedUsersId;
          newPosts[id].republishedUsersId = [...republishedUsersId, user._id];
          setPosts([...newPosts]);
          setSnackBar({
            ...snackBar,
            message: t("post.republished.message.success"),
            show: true,
            severity: "success",
          });
        } else {
          if (message === "Already published") {
            setSnackBar({ ...snackBar, message: t("post.republished.message.error"), show: true });
          }
        }
      }

      setActiveShare(false);
    } catch (error) {
      setSnackBar({ ...snackBar, message: t("internal.server.error.title"), show: true });
    }
  };

  return (
    <>
      <Card className={classes.post} elevation={1}>
        {!post?.republishedValidation ? (
          <SimpleHeader
            avatar={user?.avatar}
            firstName={user?.firstName}
            lastName={user?.lastName}
          />
        ) : (
          <HardHeader
            avatar={user?.avatar}
            firstName={user?.firstName}
            lastName={user?.lastName}
            avatarRepublish={post?.republishedUserId?.avatar}
            firstNameRepublish={post?.republishedUserId?.firstName}
            lastNameRepublish={post?.republishedUserId?.lastName}
            republishedBodyContent={post?.republishedBodyContent}
          />
        )}

        {post?.thumbnailsList.length !== 0 && (
          <Carousel className={classes.media} fullHeightHover autoPlay={false}>
            {post?.thumbnailsList.length === 1 ? (
              <Image
                publicId={post?.thumbnailsList[0]}
                cloudName={process.env.REACT_APP_CLOUD_NAME}
              />
            ) : (
              post?.thumbnailsList.map((img, id) => (
                <Image key={id} publicId={img} cloudName={process.env.REACT_APP_CLOUD_NAME} />
              ))
            )}
          </Carousel>
        )}

        <CardContent>
          <Typography>{post?.bodyContent}</Typography>
        </CardContent>
        <Actions
          likes={post?.likesList?.length}
          comments={post?.comments?.length}
          republishValue={post?.republishedUsersId?.length}
          favorites={post?.favorites?.length}
          handleRepublish={() => setActiveShare(true)}
        />
        {activeShare && (
          <div>
            <Divider className={classes.marginBottom} />
            <Container className={classes.marginBottom}>
              <form onSubmit={handleSubmit(handleRepublish)}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label={t("post.add")}
                  name="bodyContent"
                  autoComplete="off"
                  inputRef={register({
                    required: { value: true, message: t("post.add.message") },
                  })}
                  error={Boolean(errors?.bodyContent)}
                />
                <div className={classes.contentButton}>
                  <Button className={classes.btnDefault} onClick={() => setActiveShare(false)}>
                    {t("cancel")}
                  </Button>

                  <Button type="submit" color="primary">
                    {t("share")}
                  </Button>
                </div>
              </form>
            </Container>
          </div>
        )}
      </Card>
      <SnackBar snackBar={snackBar} handleClose={handleCloseSnackBar} />
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.Posts,
  myUser: state.User,
});

const mapDispatchToProps = {
  setPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
