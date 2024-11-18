export default function handleErrors(e: any) {
  let errors: {[key: string]: string} = {};

  if (e.response) {
    if (e.response.data.errors) {
      errors = e.response.data.errors;
    } else if (e.response.data.message) {
      const generalMessage = e.response.data.message;
      if (generalMessage) {
        errors = {"error": generalMessage};
      } else {
        errors = {"error": "Unexpected error"};
      }
    } else {
      errors = {"error": "Unexpected error"};
    }
  } else if (e.data) {
    if (e.data.errors) {
      errors = e.data.errors;
    } else if (e.data.message) {
      const generalMessage = e.data.message;
      if (generalMessage) {
        errors = {"error": generalMessage};
      } else {
        errors = {"error": "Unexpected error"};
      }
    } else {
      errors = {"error": "Unexpected error"};
    }
  }

  return errors;
}