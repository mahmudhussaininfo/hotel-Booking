import cloudinary from "cloudinary";

// config cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudUpload = async (req) => {
  // upload brand logo
  const data = await cloudinary.v2.uploader.upload(req.file.path);
  return data;
};

// multile image upload
export const cloudMultipleUpload = async (files) => {
  const uploads = files.map(async (file) => {
    const data = await cloudinary.v2.uploader.upload(file.path);
    return data.secure_url;
  });

  return Promise.all(uploads);
};

export const cloudDelete = async (publicId) => {
  // delete brand logo
  await cloudinary.v2.uploader.destroy(publicId);
};
