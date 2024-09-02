import { useContext, useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import { uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploadded, setUpload] = useState(0);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/items/${fileName}`);

      // Start the upload
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      // Monitor the upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          // Get the download URL after the upload is complete
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUpload((prev) => prev + 1);
          });
        }
      );
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgSm, label: "imgSm" },
      { file: imgTitle, label: "imgTitle" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  console.log(movie);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" id="title" name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            id="desc"
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" id="year" name="year" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" id="genre" name="genre" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" id="limit" name="limit" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Is Series ? </label>
          <select name="isSeries" id="isSeries">
            <option value="false">No</option>
            <option value="true">yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploadded === 5 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
