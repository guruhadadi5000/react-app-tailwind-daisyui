import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import ProgressBar from "./ProgressBar";
import PersonalInfoStep from "./PersonalInfoStep";
import AccountInfoStep from "./AccountInfoStep";
import PreferencesInfoStep from "./PreferencesInfoStep";
import { AnimatePresence } from "motion/react";

import { motion } from "motion/react";
import ReviewInfoStep from "./ReviewInfoStep";

const validators = {
  required: (value: string) =>
    value?.trim() === "" || value === undefined || value === null
      ? ""
      : "Required",
  email: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "invalid email",
  minLength: (value: string, min: number) =>
    value.length >= min ? "" : `Must be of ${min} length`,
};

const MultiStepForm = () => {
  const [step, setStep] = useState(() => {
    const stepFromLocalStorage = parseInt(
      localStorage.getItem("msf-step") || "0",
    );
    return isNaN(stepFromLocalStorage) ? 0 : stepFromLocalStorage;
  });
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem("msf-data") || "{}"),
  );
  const [complete, setComplete] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem("msf-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("msf-step", JSON.stringify(step));
  }, [step]);

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

  const steps = [
    {
      id: "personal",
      title: "Personal",
      component: (
        <PersonalInfoStep data={data} onChange={handleChange} errors={errors} />
      ),
    },
    {
      id: "account",
      title: "Account",
      component: (
        <AccountInfoStep data={data} onChange={handleChange} errors={errors} />
      ),
    },
    {
      id: "preferences",
      title: "Preferences",
      component: (
        <PreferencesInfoStep
          data={data}
          onChange={handleChange}
          errors={errors}
        />
      ),
    },
    {
      id: "review",
      title: "Review",
      component: <ReviewInfoStep data={data} />,
    },
  ];

  const handlePreviousButton = () => {
    setStep((s) => s - 1);
  };

  const handleNextButton = () => {
    if (!validateStep(step)) return;
    setStep((s) => s + 1);
  };

  const handleResetForm = () => {
    setStep(0);
    setData({});
    localStorage.removeItem("msf-data");
    localStorage.removeItem("msf-step");
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    setSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 3000));
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setComplete(true);
      // setData({});
      // setErrors({});
      // localStorage.removeItem("msf-data");
      // localStorage.removeItem("msf-step");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl border rounded-xl">
        <div className="card shadow-xl">
          <div className="card-body p-6 md:p-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Create Account
              </h2>
              <p className="text-sm text-gray-600">
                This is a multi-step form built with React and Tailwind CSS with
                validation and confetti. Please fill out the form below to
                create your account.
              </p>
            </div>
            <ProgressBar step={step} steps={steps} />
            {/* Form content with animation*/}
            <div className="relative min-h-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[step].id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  {steps[step].component}
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Navigation buttons */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <div>
                <button className="btn btn-secondary" onClick={handleResetForm}>
                  Reset
                </button>
              </div>
              <div className="flex items-center justify-end w-full gap-3">
                {step > 0 && (
                  <button
                    className="btn btn-secondary"
                    onClick={handlePreviousButton}
                  >
                    Previous
                  </button>
                )}
                {step === steps.length - 1 && (
                  <button
                    className="btn btn-active"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={submitting || complete}
                  >
                    {submitting ? (
                      <span className="loading loading-sm" />
                    ) : !submitting && !complete ? (
                      "Submit"
                    ) : (
                      "Completed"
                    )}
                  </button>
                )}
                {step < steps.length - 1 && (
                  <button
                    className="btn btn-primary"
                    onClick={handleNextButton}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p>
                Pro Tip: Feel free to reset the form at any time by clicking
                "Reset"
              </p>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {complete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 flex items-center justify-center p-6"
            >
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                <h3 className="text-3xl font-bold mb-4 text-gray-800">
                  🎉 Account Created!
                </h3>
                <p className="mb-6 text-center text-gray-600">
                  Thank you <strong>{data.fullName}</strong>! Your account has
                  been successfully created. A confirmation email will be sent
                  to <strong>{data.email}</strong>.
                </p>
                <div>
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => {
                      setComplete(false);
                      handleResetForm();
                    }}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultiStepForm;
