import { useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//material-UI
import { TextField, Button } from "@material-ui/core";

//i18n
import { useTranslation } from "react-i18next";

//axios
const EditProfileForm = ({ user }) => {
  const { register, errors, reset } = useForm();
  const { t } = useTranslation();

  useEffect(() => {
    reset(user);
  }, [reset, user]);
  return (
    <>
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
          label="Contact"
          fullWidth
          variant="outlined"
          size="small"
          margin="dense"
          name="contact"
          inputRef={register}
        />
      </div>
      <div>
        <Button variant="contained" fullWidth color="primary">
          edit profile
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({ user: state.User });

export default connect(mapStateToProps)(EditProfileForm);
