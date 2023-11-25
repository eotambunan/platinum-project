
import Dropzone from 'react-dropzone-uploader';
import { useState } from 'react';

export default function UploaderCloudinary() {
    const [urlImage, setUrlImage] = useState(null);

    const getUploadParams = () => {
        return { url: "http://localhost:3001/api/cloudinary" }
    }

    const handleChangeStatus = ({ meta, xhr }, status) => {
        console.log(status)



        if (status === 'done') {
            let response = JSON.parse(xhr.response);
            setUrlImage(response.url)
        }
    }

    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    return (
       <>
         <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            styles={{ minHeight: 200, maxHeight: 250  }}
            accept='image/*'
        />

        <h1 className='text-center mt-2'>Ini URL Image</h1>
        {urlImage && ( 
            <div className='text-center'>
                <img src={urlImage} className='img-fluid' />
            </div>
        )}
       </>
    )
}