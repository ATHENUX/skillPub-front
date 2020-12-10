//material-UI
import { Card, CardContent, Typography } from "@material-ui/core";
import { usePostStyles } from "Assets/Styles/postsStyles";
import Carousel from "react-material-ui-carousel";

//components
import SimpleHeader from "./SimpleHeader";
import HardHeader from "./HardHeader";
import Actions from "./Actions";

const Post = () => {
  const classes = usePostStyles();
  return (
    <div className={classes.postContainer}>
      <Card className={classes.post}>
        <SimpleHeader />
        {/* <HardHeader /> */}

        <Carousel className={classes.media} fullHeightHover>
          <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" alt="" />
          <img
            src="https://cdn.shopify.com/s/files/1/0229/0839/files/Busqueda_de_imagenes_3_large.jpg?v=1578328497"
            alt=""
          />
          <img
            src="https://miracomosehace.com/wp-content/uploads/2020/03/fotografia-naturaleza-HD.jpg"
            alt=""
          />
        </Carousel>

        <CardContent>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias esse voluptatibus
            suscipit, ratione repudiandae explicabo quaerat distinctio unde mollitia vitae magnam
            asperiores expedita aperiam veniam molestiae obcaecati natus non et!
          </Typography>
        </CardContent>

        <Actions />
      </Card>
    </div>
  );
};

export default Post;
