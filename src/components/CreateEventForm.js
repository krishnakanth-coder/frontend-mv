import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  brideName: Yup.string()
    .matches(
      /^[A-Za-z][A-Za-z\s]*[A-Za-z]$/,
      'Bride Name must start and end with a letter and contain only letters and spaces',
    )
    .matches(/^[A-Za-z\s]{2,50}$/, 'Bride Name must be between 2 and 50 characters')
    .required('Bride Name is required'),
  groomName: Yup.string()
    .matches(
      /^[A-Za-z][A-Za-z\s]*[A-Za-z]$/,
      'Groom Name must start and end with a letter and contain only letters and spaces',
    )
    .matches(/^[A-Za-z\s]{2,50}$/, 'Groom Name must be between 2 and 50 characters')
    .required('Groom Name is required'),
  marriageDate: Yup.date()
    .required('Date of Marriage is required')
    .min(new Date(), 'Date of Marriage cannot be in the past')
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() + 18)),
      'Date of Marriage must be at least 18 years ago',
    ),
  marriageTime: Yup.string()
    .required('Time of Marriage is required')
    .matches(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Time must be in HH:MM format'),
});

const CreateEventForm = (props) => {
  const { addEvent } = props;
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Marriage Form</h2>
      <Formik
        initialValues={{
          brideName: '',
          groomName: '',
          marriageDate: '',
          marriageTime: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          // Handle form submission
          //console.log('Form values:', values);
          setIsSubmitted(true);
          resetForm(); // Optionally reset the form after submission
          // Optionally clear the success message after a few seconds
          addEvent(values);
          setTimeout(() => setIsSubmitted(false), 3000);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {isSubmitted && (
              <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
                Your form has been successfully submitted!
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brideName">
                Bride Name
              </label>
              <Field
                type="text"
                id="brideName"
                name="brideName"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.brideName && touched.brideName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              <ErrorMessage name="brideName" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groomName">
                Groom Name
              </label>
              <Field
                type="text"
                id="groomName"
                name="groomName"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.groomName && touched.groomName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              <ErrorMessage name="groomName" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marriageDate">
                Date of Marriage
              </label>
              <Field
                type="date"
                id="marriageDate"
                name="marriageDate"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.marriageDate && touched.marriageDate
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              <ErrorMessage
                name="marriageDate"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marriageTime">
                Time of Marriage
              </label>
              <Field
                type="time"
                id="marriageTime"
                name="marriageTime"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.marriageTime && touched.marriageTime
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              <ErrorMessage
                name="marriageTime"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEventForm;
