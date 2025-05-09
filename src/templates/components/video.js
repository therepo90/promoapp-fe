export const template = `
    <h3>Video</h3>
    <div id="video-container">
        {{#if videoUrl}}
            <video id="my-video" width="640" height="360" controls>
                <source src="{{videoUrl}}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <a href="{{videoUrl}}" download class="download-link" target="_blank">Download Video</a>
        {{else}}
            <p>No video available.</p>
        {{/if}}
    </div>`;