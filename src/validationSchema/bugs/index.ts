import * as yup from 'yup';

export const bugValidationSchema = yup.object().shape({
  name: yup.string().required(),
  status: yup.string().required(),
  project_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
