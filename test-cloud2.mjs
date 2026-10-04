import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "zzhjo7jb",
  api_key: "657749858875195",
  api_secret: "BFPwaBpYPgADyKxIZVr2_TNtpfY",
  secure: true,
});

async function testUpload() {
  try {
    const res = await cloudinary.uploader.upload("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", {
      folder: "test",
    });
    console.log("Success:", res.secure_url);
  } catch (error) {
    console.error("Error:", error);
  }
}

testUpload();
