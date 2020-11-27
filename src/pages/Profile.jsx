import { useRef, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Card,
  Hidden,
  Container,
  Typography,
  Divider,
  Button,
  Chip,
} from "@material-ui/core";
import { useProfileStyles } from "Assets/Styles/profileStyles";

const Profile = () => {
  const classes = useProfileStyles();
  const ref = useRef(null);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (ref.current) {
      setSticky(Boolean(ref.current.getBoundingClientRect().top <= -136)); //-134
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

      <Hidden xsDown>
        <Avatar
          alt="avatar"
          className={`${classes.large} ${classes.avatar} ${isSticky ? classes.fixedAvatar : ""} `}
          src="https://i.pinimg.com/originals/89/34/fe/8934fe9034e62c3f9ef4f02eea2c56ab.png"
        />
        <Card className={`${classes.panel} ${isSticky ? classes.fixed : ""} `} elevation={0}>
          <Container>
            <Button color="primary" variant="contained" className={classes.btn}>
              Follow
            </Button>

            <Typography variant="h6" className={classes.marginTop}>
              Juan Pablo Agudelo Castro
            </Typography>

            <div>
              <Typography>Profile description:</Typography>
              <Typography variant="body1" className={classes.textSize}>
                This is the profile's description
              </Typography>
              <Typography className={classes.text}>
                Contact:
                <Typography component="strong" color="primary" className={classes.text}>
                  3445453453454
                </Typography>
              </Typography>

              <Typography className={classes.text}>
                Address:
                <Typography component="strong" color="primary" className={classes.text}>
                  Carrera 344 # 344- 544
                </Typography>
              </Typography>
            </div>
            <Divider />

            <div className={classes.contentFollower}>
              <Typography>
                Follower:
                <Typography component={RouterLink} color="primary" className={classes.text} to="/">
                  123K
                </Typography>
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography>
                Following:
                <Typography component={RouterLink} color="primary" className={classes.text} to="/">
                  100k
                </Typography>
              </Typography>
            </div>

            <div>
              <Divider className={classes.marginTop} />
              <Typography>Skills</Typography>
              <div className={classes.contentSkills}>
                <Chip label="python" className={classes.skill} />
                <Chip label="react" className={classes.skill} />
                <Chip label="laravel" className={classes.skill} />
                <Chip label="javascript" className={classes.skill} />
                <Chip label="go" className={classes.skill} />
                <Chip label="C" className={classes.skill} />
              </div>
            </div>
          </Container>
        </Card>
      </Hidden>

      <div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus nulla dicta nihil
          quasi excepturi veniam blanditiis possimus, sed ratione perferendis iure nisi. Ratione
          soluta voluptas nisi animi et? Facere, deleniti.
        </p>
      </div>
    </div>
  );
};

export default Profile;
