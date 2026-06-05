const ProgressBar = ({
  step: currentStep,
  steps,
}: {
  step: number;
  steps: any[];
}) => {
  return (
    <div>
      <ul className="steps  w-full mb-4">
        {steps.map((step, index) => {
          return (
            <li
              key={step.id}
              className={`step ${index <= currentStep ? "step-primary" : ""} text-xs sm:text-sm`}
            >
              {step.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProgressBar;
