import React, { useEffect, useState } from "react";
import "./ProfileForm.css";
import defaultPic from "./defaultPic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser, UpdatePic } from "../../actions/Authctions";
import Spinner from "../Spinner/Spinner";

const AccountUpdate = () => {
  const [formData, setFormData] = useState({
    profilePicture: defaultPic,
    country: "",
    pincode: "",
    address: "",
    name: "",
    phone:""
  });
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [fileuploaded, setFileUploaded] = useState(false);
  const loading = useSelector((state) => state.authReducer.loading);
  const userdetailload = useSelector(
    (state) => state.authReducer.authData.user
  );
  const token = useSelector((state) => state.authReducer.authData).token;

  useEffect(() => {
    if (userdetailload.profilePic) {
      setFormData({
        ...formData,
        profilePicture: userdetailload.profilePic,
        name: userdetailload.name,
        country: userdetailload.Country,
        pincode: userdetailload.pincode,
        address: userdetailload.Address,
        phone: userdetailload.Phone,

      });
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePicture: file,
    });
    setFileUploaded(true);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileuploaded) {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.profilePicture);
      dispatch(UpdatePic(formDataToSend, token));
    }
    dispatch(UpdateUser(formData, token));
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="profile-form-container">
            <h3 className="text-center mb-3">Profile Update</h3>
            <form onSubmit={handleSubmit} className="profile-form">
              <center>
                <img
                  src={previewImage ? previewImage : formData.profilePicture}
                  alt="Profile Preview"
                  className="profile-picture-preview img-fluid"
                />
              </center>
              <div className="form-group">
                <label>Profile Picture:</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Country:</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountUpdate;
