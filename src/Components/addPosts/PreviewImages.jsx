import { useEffect, useState } from "react";
//Material-UI
import { GridList, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { usePostStyles } from "Assets/Styles/postsStyles";

const Previewimages = ({ previewImages, handleDeselectImage }) => {
  const classes = usePostStyles();
  const [calculate, setCalculate] = useState([]);

  useEffect(() => {
    const cal = [];
    if (previewImages.length === 1) cal.push(2);
    if (previewImages.length === 4 || (previewImages.length === 3) | (previewImages.length === 1)) {
      cal.push(1, 1, 2, 2);
    }
    if (previewImages.length === 5) {
      cal.push(1, 1, 2, 1, 1);
    }

    setCalculate([...cal]);
  }, [previewImages]);

  return (
    <>
      <GridList cellHeight={200} cols={2} className={classes.gridList}>
        {previewImages.map((selectedImage, index) => (
          <GridListTile key={index} cols={calculate[index] || 1}>
            <img src={selectedImage} alt={selectedImage} />
            <GridListTileBar
              actionPosition="right"
              titlePosition="top"
              className={classes.titleBar}
              actionIcon={
                <IconButton
                  className={classes.closeIcon}
                  size="small"
                  onClick={() => handleDeselectImage(selectedImage)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </>
  );
};

export default Previewimages;
