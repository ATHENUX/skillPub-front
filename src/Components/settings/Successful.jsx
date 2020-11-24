import { Button, Container } from "@material-ui/core";

const Successful = ({ finish }) => {
  return (
    <Container>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, repudiandae similique.
        Quae, dicta reiciendis! Necessitatibus, atque nam et exercitationem ex magni porro
        laboriosam! Soluta aperiam perspiciatis perferendis dicta quam ratione.
      </p>
      <Button variant="contained" color="primary" onClick={finish}>
        finish
      </Button>
    </Container>
  );
};

export default Successful;
