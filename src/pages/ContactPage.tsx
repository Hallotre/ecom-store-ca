import { useState } from "react";
import { ContactFormData } from "../types/types";

const ContactPage = () => {
  const initialFormState: ContactFormData = {
    fullName: "",
    subject: "",
    email: "",
    body: "",
  };

  const [formData, setFormData] = useState<ContactFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    let isValid = true;

    // Validate full name (min 3 characters, required)
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
      isValid = false;
    }

    // Validate subject (min 3 characters, required)
    if (!formData.subject || formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
      isValid = false;
    }

    // Validate email (valid email format, required)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate body (min 3 characters, required)
    if (!formData.body || formData.body.trim().length < 3) {
      newErrors.body = "Message must be at least 3 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, log the data and show success message
      console.log("Form data submitted:", formData);
      setIsSubmitted(true);
      setFormData(initialFormState);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-medium text-gray-900 mb-8">Contact Us</h1>

      {isSubmitted ? (
        <div
          className="bg-green-100 border border-green-200 text-green-600 px-6 py-5 rounded-lg mb-6"
          role="alert"
        >
          <p className="font-medium">Success!</p>
          <p className="mt-1">
            Your message has been sent. We'll get back to you soon.
          </p>
          <button
            className="mt-4 text-primary hover:text-primary/80 font-medium focus:outline-none transition-colors"
            onClick={() => setIsSubmitted(false)}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-lg p-8"
        >
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="block text-gray-900 text-sm font-medium mb-2"
            >
              Full Name*
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${
                errors.fullName
                  ? "border-red-600 text-red-600"
                  : "border-gray-200 text-gray-900"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1.5 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="subject"
              className="block text-gray-900 text-sm font-medium mb-2"
            >
              Subject*
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${
                errors.subject
                  ? "border-red-600 text-red-600"
                  : "border-gray-200 text-gray-900"
              }`}
            />
            {errors.subject && (
              <p className="mt-1.5 text-sm text-red-600">{errors.subject}</p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-900 text-sm font-medium mb-2"
            >
              Email*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${
                errors.email
                  ? "border-red-600 text-red-600"
                  : "border-gray-200 text-gray-900"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="body"
              className="block text-gray-900 text-sm font-medium mb-2"
            >
              Message*
            </label>
            <textarea
              id="body"
              name="body"
              rows={5}
              value={formData.body}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${
                errors.body
                  ? "border-red-600 text-red-600"
                  : "border-gray-200 text-gray-900"
              }`}
            />
            {errors.body && (
              <p className="mt-1.5 text-sm text-red-600">{errors.body}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactPage;
