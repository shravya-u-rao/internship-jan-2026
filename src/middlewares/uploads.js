import multer from "multer";

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();



    // console.log(file);
    
    //abc def.jpg
    //23432.jpeg
    //23432.jpeg
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length,
    );

    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });
export default upload;