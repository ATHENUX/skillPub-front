import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//material-UI
import { TextField, Button } from "@material-ui/core";

//components
import SnackBar from "Components/SnackBar";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";
const EditProfileForm = ({ user }) => {
  const initialSnackBarProps = {
    show: false,
    message: "",
    vertical: "top",
    horizontal: "left",
    severity: "error",
  };
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState(initialSnackBarProps);
  const { register, errors, reset, handleSubmit } = useForm();
  const { t } = useTranslation();

  useEffect(() => {
    reset(user);
  }, [reset, user]);

  const handleSave = async (data) => {
    try {
      setLoading(true);
      let config = {
        headers: {
          auth: localStorage.getItem("session"),
        },
      };
      const res = await axios.put("/api/updateMainInfo", data, config);
      const { success } = res.data;
      if (success) {
        initialSnackBarProps.severity = "success";
        initialSnackBarProps.message = t("main.info.updated");
      } else {
        initialSnackBarProps.message = t("internal.server.error.title");
      }
      setSnackBar({
        ...initialSnackBarProps,
        show: true,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSnackBar(initialSnackBarProps);
  };

  return (
    <>
      <SnackBar snackBar={snackBar} handleClose={handleClose} />
      <form onSubmit={handleSubmit(handleSave)}>
        <div>
          <TextField
            label="First Name"
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            name="firstName"
            inputRef={register({
              required: { value: true, message: t("first.name.error.input.required") },
            })}
            error={Boolean(errors?.firstName)}
            helperText={errors?.firstName?.message}
          />
        </div>
        <div>
          <TextField
            label="Last Name"
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            name="lastName"
            inputRef={register({
              required: { value: true, message: t("last.name.error.input.required") },
            })}
            error={Boolean(errors?.lastName)}
            helperText={errors?.lastName?.message}
          />
        </div>
        <div>
          <TextField
            label="Description"
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            multiline
            rows={2}
            name="description"
            inputRef={register({
              maxLength: { value: 60, message: t("description.max.length") },
            })}
          />
        </div>
        <div>
          <TextField
            label="Phone"
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            name="phone"
            inputRef={register}
          />
        </div>
        <div>
          <Button variant="contained" fullWidth color="primary" disabled={loading} type="submit">
            {!loading ? t("save") : t("saving")}
          </Button>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({ user: state.User });

export default connect(mapStateToProps)(EditProfileForm);
