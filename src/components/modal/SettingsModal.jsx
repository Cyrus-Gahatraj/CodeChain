import React from "react";
import Modal from "./Modal";
import { LogOut } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignOutButton } from "@clerk/nextjs";
import * as Yup from "yup";

function SettingsModal({ onClose }) {
  const initialValues = {
    username: "Cyrus",
    name: "Cyrus-Gahatraj",
    gender: "",
    bio: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be 20 characters or less"),
    name: Yup.string()
      .required("Name is required")
      .max(50, "Name must be 50 characters or less"),
    gender: Yup.string().required("Gender is required"),
    bio: Yup.string().max(150, "Bio must be 150 characters or less").nullable(),
  });

  const handleSubmit = (values) => {
    console.log("Form data", values);
    // Here you would typically send the data to your backend
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="w-full max-w-md text-white mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#fffcf2]">
          Settings
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#fffcf2] mb-1"
                >
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 bg-[#252422] border border-[#403d39] rounded-md text-[#fffcf2] focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-[#ff595e] text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#fffcf2] mb-1"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 bg-[#252422] border border-[#403d39] rounded-md text-[#fffcf2] focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-[#ff595e] text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-[#fffcf2] mb-1"
                >
                  Gender
                </label>
                <Field
                  as="select"
                  id="gender"
                  name="gender"
                  className="w-full px-4 py-2 bg-[#252422] border border-[#403d39] rounded-md text-[#fffcf2] focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-[#ff595e] text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-[#fffcf2] mb-1"
                >
                  Bio (max 150 words)
                </label>
                <Field
                  as="textarea"
                  id="bio"
                  name="bio"
                  rows="4"
                  className="w-full px-4 py-2 bg-[#252422] border border-[#403d39] rounded-md text-[#fffcf2] focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
                />
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-[#ff595e] text-sm mt-1"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-[#fffcf2] bg-[#403d39] rounded-md hover:bg-[#4a4743] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-[#fffcf2] bg-[#eb5e28] rounded-md hover:bg-[#f27036] transition-colors disabled:opacity-50"
                >
                  Save Settings
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-10 pt-4 border-t border-gray-700 flex justify-center">
          <SignOutButton>
            <button className="flex items-center gap-2 text-[#ff595e] hover:text-[#ff6b6b] transition-colors font-semibold">
            <LogOut className="size-5" />
            Log Out
          </button>
          </SignOutButton>
        </div>
      </div>
    </Modal>
  );
}

export default SettingsModal;
