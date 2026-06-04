import { useEffect, useState } from "react";

const validators = {
  required: (value: string) =>
    value.trim() !== "" || undefined || null ? "" : "Required",
  email: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "invalid email",
  minLength: (value: string, min: number) =>
    value.length >= min ? "" : `Must be of ${min} length`,
};

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem("msf-data") || "{}"),
  );
  const [complete, setComplete] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("msf-data", JSON.stringify(data));
  }, [data]);

  const handleChange = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validateStep = (s = step) => {
    const e = {};
    if (s === 0) {
      e.fullName = validators.required(data.fullName);
      e.email = validators.required(data.email) || validators.email(data.email);
    }
    if (s === 1) {
      e.username =
        validators.required(data.username) ||
        validators.minLength(data.username, 5);
      e.password =
        validators.required(data.password) ||
        validators.minLength(data.password, 8);
      e.passwordConfirm =
        validators.required(data.passwordConfirm) ||
        validators.minLength(data.passwordConfirm, 8);
      e.passwordMatch =
        data.password === data.passwordConfirm ? "" : "Passwords do not match";
    }
    if (s === 2) {
      e.plan = validators.required(data.plan);
    }
    setErrors(e);
    return Object.values(e).every((error) => error === "");
  };

  return <div>MultiStepForm</div>;
};

export default MultiStepForm;
