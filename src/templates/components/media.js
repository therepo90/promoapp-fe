export const template = `
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
`;
