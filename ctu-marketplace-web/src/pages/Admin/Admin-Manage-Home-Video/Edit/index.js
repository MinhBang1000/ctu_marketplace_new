import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ArrowBack from "../../../../components/ArrowBack";
import environment from "../../../../environments/environment";
import authHeader from "../../../../services/auth.header";

import {
  retrieveHomeVideoById,
  updateHomeVideoById
} from "../../../../store/admin.homeVideoSlice";

const AdminManageHomeVideo = (props) => {
  const [previewVideo, setPreviewVideo] = useState();
  const [video, setVideo] = useState();
  const [name, setName] = useState();

  const videoRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation('common');

  useEffect(() => {
    videoRef.current?.load();
  }, [previewVideo]);

  useEffect(() => {
    dispatch(retrieveHomeVideoById(props.match.params.id)).then((response) => {
      const { name, url } = response.payload.data;
      setPreviewVideo(url);
      setName(name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const onChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const objURL = URL.createObjectURL(file);
  //   setPreviewVideo(objURL);
  //   setVideo(file);
  // };

  const onDropzoneAreaChange = (files) => {
    const file = files[0];
    if (!file) return;

    const objURL = URL.createObjectURL(file);
    setPreviewVideo(objURL);
    setVideo(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (video) {
      let formData = new FormData();
      formData.append("upload", video);

      axios
        .post(environment.url.java + "/upload-file", formData, {
          headers: authHeader(),
        })
        .then((response) => {
          const url = response.data.url;

          if (response.data) {
            const data = {
              id: 101,
              url,
            };
            dispatch(updateHomeVideoById(data)).then(() => {
              history.push("/admin/home-video");
            });
          } else {
            return alert("failed to upload file");
          }
        });
    }

    const data = {
      id: 101,
      name,
      url: previewVideo,
    };
    dispatch(updateHomeVideoById(data)).then(() => {
      history.push("/admin/home-video");
    });
  };

  const onDelete = () => {
    setPreviewVideo(null);
  };

  return (
    <>
      <ArrowBack />
      <div className="container mt-2">
        <h3>{"Upload the home page video"}</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group mb-4">
            <label className="form-label">{ t('admin.home-video.form.name') }</label>
            <input
              type="text"
              className="form-control"
              defaultValue={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{ t('admin.home-video.form.video') }</label>
            <DropzoneArea
              // acceptedFiles={["video/mp4,video/x-m4v,video/*"]}
              dropzoneText={"Drag and drop an video here or click"}
              initialFiles={[previewVideo]}
              maxFileSize={100000000}
              onChange={onDropzoneAreaChange}
              onDelete={onDelete}
            />
            {previewVideo ? (
              <video ref={videoRef} width="500" controls>
                <source src={previewVideo} />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>

          <button type="submit" className="btn btn-success">
            { t('admin.home-video.form.btn-text') }
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminManageHomeVideo;
