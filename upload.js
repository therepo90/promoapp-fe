
let uploadFormConfig = null;
const htmlFormObj = {
  'upload-form1': {
    selectedFile: null,
    croppedFile: null,
  },
  'upload-form2': {
    selectedFile: null,
    croppedFile: null,
  },
};

let MAX_FILE_SIZE = 350 * 1024 * 10 * 2; // 7mb

export function initUpload(formId) {//
    console.log('initUpload', formId);
    const form = document.getElementById(formId);
  const dropzone = form.querySelector('.dropzone');
  const fileInput = form.getElementsByClassName('file')[0];
  const filenamePreview = form.getElementsByClassName('filename-preview')[0];
  const uploadText = form.getElementsByClassName('upload-text')[0];

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('drag-over');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('drag-over');
  });
  dropzone.addEventListener('click', () => {
    fileInput.click(); // Wywołuje kliknięcie na ukrytym input file
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    const file = files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert('File too big. Max is 350KB.');
      this.value = '';
      throw new Error('File too big.');
    }
    fileInput.files = e.dataTransfer.files;
    handleFiles(files);
  });

  fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    const file = files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      // Sprawdzenie, czy rozmiar pliku przekracza 350 KB
      alert('Files under 7mb allowed, current size: ' + file.size + ' bytes');
      this.value = ''; // Wyczyszczenie wybranego pliku
    }
    handleFiles(files);
  });

  function validateFile(file) {
    if (!file) {
      alert('Please select a file.');
      throw new Error('No file selected.');
    }

    const allowedExtensions = ['jpg', 'png', 'jpeg']; // Add more extensions as needed
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert('Invalid file type. Allowed extensions: ' + allowedExtensions.join(', '));

      // Clear file input
      fileInput.value = ''; // Reset the value to clear the file input
      throw new Error('Invalid file type.');
    }
  }

  function handleFiles(files) {
    if (files.length !== 1) {
      alert('Only one file allowed.');
      throw new Error('Only one file allowed.');
    }
    validateFile(files[0]);
    console.log({ files });
    if (!files || files.length === 0) return;
    const file = files[0];

    filenamePreview.textContent = file.name;
    filenamePreview.classList.remove('hidden');

    const dropzone = form.querySelector('.dropzone');
    var targetBgEl = dropzone,
      reader = new FileReader();
    reader.onloadend = function (e) {
      targetBgEl.style['background-image'] = 'url(' + reader.result + ')';
      targetBgEl.style['background-size'] = 'cover';
      targetBgEl.style['background-position'] = 'center';
      targetBgEl.style['background-repeat'] = 'no-repeat';
      targetBgEl.style['background-color'] = 'transparent';
    };
    reader.readAsDataURL(file);
    htmlFormObj[formId].selectedFile = file;
    uploadText.classList.add('hidden');
    console.log({ htmlFormObj });
  }
}

/*
document.addEventListener("DOMContentLoaded", function() {
  initUpload();
});
*/
