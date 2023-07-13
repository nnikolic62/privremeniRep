import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup.string().required("Ovo polje je obavezno"),
  email: yup
    .string()
    .email("Email nije u ispravnom formatu")
    .required('Ovo polje je obavezno'),
  password: yup.string().required("Ovo polje je obavezno").min(6, "Lozinka mora sadrzati najmanje 6 karaktera"),
  repeatPassword: yup
    .string()
    .required("Ovo polje je obavezno")
    .oneOf([yup.ref("password")], "Lozinke se ne podudaraju")
});
