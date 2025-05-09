export  const template = `

    <h3>Main page</h3>
    <div class="image-item selected">
        <a>  <!-- Link do dużego obrazu w nowej karcie -->
            <img src="{{pageResources.mainImgServingUrl}}" alt="thumb" class="thumbnail">
        </a>
        <a href="{{pageResources.mainImgServingUrl}}" download class="download-link" target="_blank">Download</a>  <!-- Link do pobrania -->
    </div>
    <h3>Logo</h3>
    <div class="image-item selected">
        <a>  <!-- Link do dużego obrazu w nowej karcie -->
            <img src="{{pageResources.logoImgServingUrl}}" alt="thumb" class="thumbnail">
        </a>
        <a href="{{pageResources.logoImgServingUrl}}" download class="download-link" target="_blank">Download</a>  <!-- Link do pobrania -->
    </div>
    <h3>Entering picture</h3>
    <div class="image-gallery thumbs">
        {{#each generatedImages.servingUrls}}
            <div class="image-item" id="image-item-{{@index}}">
                <a href="#" onclick="selectEntering(event, '{{@index}}', '{{this}}')">
                    <img src="{{this}}" alt="thumb" class="thumbnail">
                </a>
                <a href="{{this}}" download class="download-link" target="_blank">Download</a>  <!-- Link do pobrania -->
            </div>
        {{/each}}
    </div>
    <h3>App features screens</h3>
    <div class="flex two">
        <form class="upload-form" id="upload-form1">
            <div class="flex one center dropzone" enctype="multipart/form-data" class="dropzone">
                <label for="file1" class="the-label flex-center">
                    <div class="upload-text">
                        <button type="button" class="btn btn-primary button submit">Upload feature 1 screen
                        </button>
                    </div>
                    <span class="filename-preview hidden"></span>
                </label>
                <input type="file" name="file" class="file hidden" accept="image/*" id="file1" >
            </div>
        </form>
        <form class="upload-form" id="upload-form2" style="margin-left:20px;">
            <div class="flex one center dropzone" enctype="multipart/form-data" class="dropzone">
                <label for="file2"  class="the-label flex-center">
                    <div class="upload-text">
                        <button type="button" class="btn btn-primary button submit">Upload feature 2 screen
                        </button>
                    </div>
                    <span class="filename-preview hidden" ></span>
                </label>
                <input type="file" name="file" class="file hidden"  accept="image/*" id="file2">
            </div>
        </form>
    </div>

    <button class="btn btn-primary" id="gen-vid-btn">Generate video</button>
    <div id="video-output"></div>
`;