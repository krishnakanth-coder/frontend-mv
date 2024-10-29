import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is configured

// Function to extract the video ID from a YouTube URL
const extractVideoIdFromUrl = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Validation schema using Yup
const validationSchema = Yup.object({
  videoUrl: Yup.string()
    .required('YouTube URL is required')
    .test('is-valid-youtube-url', 'Must be a valid YouTube URL', (value) => {
      const videoId = extractVideoIdFromUrl(value);
      return videoId !== null;
    }),
  videoName: Yup.string().required('Video Name is required'),
});

const AddLiveForm = (props) => {
  const { onLiveSubmit } = props;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit YouTube Video</h2>
        <Formik
          initialValues={{ videoUrl: '', videoName: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const videoId = extractVideoIdFromUrl(values.videoUrl);
            if (videoId) {
              const formData = {
                videoId,
                videoName: values.videoName,
              };

              if (onLiveSubmit) {
                onLiveSubmit(formData); // Handle the form data locally
              }

              resetForm(); // Reset the form after submission
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="videoName" className="block text-sm font-medium text-gray-700">
                  Video Name:
                </label>
                <Field
                  name="videoName"
                  type="text"
                  placeholder="Enter the video name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
                <ErrorMessage
                  name="videoName"
                  component="div"
                  className="mt-2 text-sm text-red-600"
                />
              </div>

              <div>
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
                  YouTube Video URL:
                </label>
                <Field
                  name="videoUrl"
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=PT0lYT4O9tQ"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
                <ErrorMessage
                  name="videoUrl"
                  component="div"
                  className="mt-2 text-sm text-red-600"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddLiveForm;
