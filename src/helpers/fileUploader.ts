export const fileUploader = async (formData: FormData): Promise<string> => {
  formData.append("upload_preset", "bookUniverse");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/decj7ot9x/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const fileUploadResponse = await res.json();

  return fileUploadResponse?.url;
};
