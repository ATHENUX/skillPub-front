import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

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

const PostHome = ({ post, user }) => {
  const [activeShare, setActiveShare] = useState(false);
  const [liked, setLiked] = useState(false);

  const [snackBar, setSnackBar] = useState({
    show: false,
    message: "",
    vertical: "top",
    horizontal: "center",
    severity: "error",
  });
  const classes = usePostStyles();
  const { register, handleSubmit, errors } = useForm();
  const { t } = useTranslation();

  useEffect(() => {
    const find = post.likesList.find((id) => {
      return id === user._id;
    });
    if (find !== undefined) {
      setLiked(true);
    }
  }, [post, user]);

  const handleRepublish = async (data) => {
    try {
      const findUser = post.republishedUsersId.find((id) => {
        return id === user._id;
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
          userId: user._id,
          thumbnailsList: post?.thumbnailsList,
          republishedValidation: true,
          bodyContent: data.bodyContent,
          republishedBodyContent: post?.bodyContent,
          republishedUserId: post.userId._id,
        };

        //the model of the data to send to assign the user who published the original publication and to know the number of Republicans that the publication has
        const republishedIds = {
          userId: user._id,
          postId: post._id,
        };

        const res = await axios.post(
          "/api/republishPost",
          { share, republishedIds },
          { headers: { auth: localStorage.getItem("session") } }
        );

        const { success, message } = res.data;
        if (success) {
          setSnackBar({
            ...snackBar,
            message: t("post.republished.message.success"),
            show: true,
            severity: "success",
          });
        } else {
          if (message === "Already published") {
            setSnackBar({
              ...snackBar,
              message: t("post.republished.message.error"),
              show: true,
            });
          }
        }
      }

      setActiveShare(false);
    } catch (error) {
      setSnackBar({ ...snackBar, message: t("internal.server.error.title"), show: true });
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBar, show: false, severity: "error" });
  };

  const handleLike = async () => {
    try {
      const res = await axios.post(
        "/api/likePost",
        { postId: post._id, userId: user._id },
        { headers: { auth: localStorage.getItem("session") } }
      );
      const { success } = res.data;
      if (success) {
        setLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await axios.post(
        "/api/dislikePost",
        { postId: post._id, userId: user._id },
        { headers: { auth: localStorage.getItem("session") } }
      );
      const { success } = res.data;
      if (success) {
        setLiked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card className={classes.post} elevation={1}>
        {!post?.republishedValidation ? (
          <SimpleHeader
            avatar={post?.userId?.avatar}
            firstName={post?.userId?.firstName}
            lastName={post?.userId?.lastName}
          />
        ) : (
          <HardHeader
            avatar={post?.userId?.avatar}
            firstName={post?.userId?.firstName}
            lastName={post?.userId?.lastName}
            avatarRepublish={post?.republishedUserId?.avatar}
            firstNameRepublish={post?.republishedUserId?.firstName}
            lastNameRepublish={post?.republishedUserId?.lastName}
            republishedBodyContent={post?.republishedBodyContent}
          />
        )}

        <Carousel className={classes.media} fullHeightHover autoPlay={false}>
          {post?.thumbnailsList.length === 1 ? (
            <Image
              publicId={post?.thumbnailsList[0]}
              cloudName={process.env.REACT_APP_CLOUD_NAME || "dmv4ug7sg"}
            />
          ) : (
            post?.thumbnailsList.map((img, id) => (
              <Image
                key={id}
                publicId={img}
                cloudName={process.env.REACT_APP_CLOUD_NAME || "dmv4ug7sg"}
              />
            ))
          )}
        </Carousel>

        <CardContent>
          <Typography>{post?.bodyContent}</Typography>
        </CardContent>
        <Actions
          liked={liked}
          comments={5}
          republishValue={7}
          favorites={2}
          handleRepublish={() => setActiveShare(true)}
          handleLike={handleLike}
          handleDislike={handleDislike}
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
  user: state.User,
  // posts: state.Posts,
});

export default connect(mapStateToProps)(PostHome);
