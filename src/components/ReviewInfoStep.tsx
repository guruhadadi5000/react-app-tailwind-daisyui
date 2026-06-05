import type { ReviewInfoStepProps } from "../types/form";

const ReviewInfoStep = ({ data }: ReviewInfoStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold"> Review Your Information</h3>
      <p className="text-xs text-gray-500">
        {" "}
        Please review the information you have entered below. If you need to
        make any changes, please click the previous button to go back.
      </p>
      <div className="grid gap-2">
        <div className="flex justify-between">
          <span className="font-medium">Full Name:</span>
          <strong>{data.fullName}</strong>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <strong>{data.email}</strong>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Username</span>
          <strong>{data.username}</strong>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Selected Plan</span>
          <strong>{data.plan}</strong>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email Notifications</span>
          <strong>{data.notifications ? "On" : "Off"}</strong>
        </div>
      </div>
    </div>
  );
};

export default ReviewInfoStep;
