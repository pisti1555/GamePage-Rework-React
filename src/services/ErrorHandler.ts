export default function handleErrors(e: any) {
  let errors: {[key: string]: string} = {};
  const responseErrors = e.response?.data?.errors;

  if (responseErrors) {
    errors = responseErrors;
  } else {
    const generalMessage = e.response.data.message;
    if (generalMessage) {
      errors = {"error": generalMessage};
    } else {
      errors = {"error": "Unexpected error"};
    }
  }

  return errors;
}