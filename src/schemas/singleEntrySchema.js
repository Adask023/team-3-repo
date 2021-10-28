import * as yup from "yup";

const singleEntrySchema = yup.object().shape({
  startTime: yup.string().required(),
  endTime: yup.string().optional(),
  tagBundleName: yup.string().optional(),
  tagName: yup.string().optional(),
});

export { singleEntrySchema };
