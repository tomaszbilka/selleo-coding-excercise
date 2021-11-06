import * as yup from "yup";

export const nameSchema = yup.object().shape({
  name: yup.string().min(3).max(20).required(),
});

export const descriptionSchema = yup.object().shape({
  description: yup.string().min(10).max(500).required(),
});

export const polygonSchema = yup.array().min(3);
