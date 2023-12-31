import Dropzone from "react-dropzone-uploader";
import { useState } from "react";
import { Button } from "react-bootstrap";

import { saveImage, uploadImage } from '@/rest_API/users_api';



export default function DropzoneUploader({fetchData}) {
    const [urlImage, setUrlImage] = useState(null);

    const getUploadParams = () => {
        return { url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/v1/cloudinary` };
    };
    // http://api.griyadandelion.space/api/users/v1/cloudinary

    const handleChangeStatus = ({ meta, xhr }, status) => {

        if (status === "done") {
          console.log(xhr);
            let response = JSON.parse(xhr.response);
            setUrlImage(response.url);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await saveImage(urlImage)
            fetchData()
            window.location.reload()
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
<Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        styles={{
          dropzone: {
            minHeight: 400, // Tinggi minimum area dropzone
            maxHeight: 500, // Tinggi maksimum area dropzone
            overflowY: "auto", // Aktifkan overflow pada sumbu Y jika gambar melebihi tinggi maksimum
            backgroundColor: "grey"
          },
          dropzoneActive: {
            borderColor: "green", // Warna border saat dropzone aktif (file sedang di-drag)
          },
          inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {}),
          previewImage: {
            maxHeight: 400, // Tinggi maksimum gambar preview
          },
        }}
        accept="image/*"
      />
            {urlImage?<Button onClick={handleSubmit}>Save Profile Picture</Button>:<Button onClick={handleSubmit} disabled>Choose your image</Button>}
        </>
    );
}
