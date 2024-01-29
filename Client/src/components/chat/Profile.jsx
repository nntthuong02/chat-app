import { IconPlus } from "@tabler/icons-react";
import React, { useContext, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { AuthContext } from "../../context/Authcontext";
import { useEffect } from "react";
import { baseUrl, postRequest } from "../../utils/services";
// import cloudinaryUpload from "../../service/upload";
import axios from "axios";
export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(user);
  const [editMode, setEditMode] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState(user);
  const [error, setError] = useState(false);
  useEffect(() => {
    setOriginalProfileData(user); // Set original data when user changes
  }, [user]);
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleSaveClick = async () => {
    try {
      const response = await postRequest(
        "${baseUrl}/auth/profile",
        JSON.stringify(profileData)
      );
      if (response.error) {
        setTimeout(() => {
          setError(false);
        }, 5000);
        return setError(true);
      }
      console.log(response);
      const newUser = { ...user, ...response };
      console.log(newUser);
      localStorage.setItem("User", JSON.stringify(newUser));
      setOriginalProfileData(profileData);
      setProfileData(profileData);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile changes:", error);
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  const isProfileDataChanged = () => {
    return JSON.stringify(profileData) !== JSON.stringify(originalProfileData);
  };
  //
  useEffect(() => {
    // Gọi API từ backend để lấy đường dẫn hình ảnh đã tải lên
    axios
      .get("http://localhost:8081/auth/cloudinary-upload")
      .then((response) => {
        // Lưu đường dẫn vào setProfileData.avatar
        setProfileData((prevData) => ({
          ...prevData,
          avatar: response.data.secure_url,
        }));
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0], "file");
    cloudinaryUpload(uploadData);
  };
  const [file, setFile] = useState();
  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:3001/upload", formData)
      .then((res) => {})
      .catch((er) => console.log(er));
  };
  //
  return (
    <Card className="w-100 h-100" style={{ borderRadius: ".5rem" }}>
      <Row className="w-100 h-100">
        <Col
          md="4"
          className="gradient-custom text-center text-white"
          style={{
            borderTopLeftRadius: ".5rem",
            borderBottomLeftRadius: ".5rem",
          }}
        >
          <div>
            <div className="profile-image-container">
              <img
                src={profileData.avatar}
                alt="Avatar"
                className="my-5 profile-image"
              />
              <div>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="button" onClick={upload}>
                  Upload
                </button>
              </div>
              {/* <input id="fileInput" type="file" style={{ display: "none" }} /> */}
            </div>
            <h5 className="h5-button-spacing" style={{ color: "black" }}>
              {profileData.name}
            </h5>
          </div>
        </Col>
        <Col md="8">
          <Card.Body className="p-4">
            {editMode ? (
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Email
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Phone
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      name="numberPhone"
                      value={profileData.numberPhone}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Name
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Address
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Gender
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="gender"
                      value={profileData.gender}
                      onChange={handleChange}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <div className="text-center mt-4 mb-4">
                  <Button
                    variant="primary"
                    onClick={handleSaveClick}
                    disabled={!isProfileDataChanged()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    className="ms-2"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            ) : (
              <div>
                <Row className="mb-3">
                  <Col sm="6">
                    <h6>Email</h6>
                    <p className="text-muted">{profileData.email}</p>
                  </Col>
                  <Col sm="6">
                    <h6>Phone</h6>
                    <p className="text-muted">{profileData.numberPhone}</p>
                  </Col>
                  <Col sm="6">
                    <h6>Name</h6>
                    <p className="text-muted">{profileData.name}</p>
                  </Col>
                  <Col sm="6">
                    <h6>Address</h6>
                    <p className="text-muted">{profileData.address}</p>
                  </Col>
                  <Col sm="6">
                    <h6>Gender</h6>
                    <p className="text-muted">{profileData.gender}</p>
                  </Col>
                </Row>
                <div className="d-flex justify-content-start">
                  <a href="#!" className="me-3">
                    <i className="fab fa-facebook fa-lg"></i>
                  </a>
                  <a href="#!" className="me-3">
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                  <a href="#!" className="me-3">
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                </div>
              </div>
            )}
            {!editMode && (
              <div className="text-center mb-4">
                <Button variant="primary" onClick={handleEditClick}>
                  Edit
                </Button>
              </div>
            )}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
