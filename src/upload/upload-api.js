import {uploadApiUrl} from "../cfg";

class UploadApi {
    async uploadFile(formData) {
        console.log('uploading file form data');
        console.log(formData);


        return fetch(`${uploadApiUrl}/upload`, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
                alert('Error');
            });
    }
}
export const uploadApi = new UploadApi();