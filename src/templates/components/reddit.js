export const template = `

    <p><strong>URL:</strong> <a href="{{url}}" target="_blank">{{url}}</a></p>
    <section>
        <h2 class="section-title">What your page offers:</h2>
        <p>{{desc}}</p>
    </section>

    <div class="meta" >
        <section>
            <h2 class="section-title">Keywords</h2>
            <ul class="keyword-list">
                {{#each keywords}}
                    <li>{{this}}</li>
                {{/each}}
            </ul>
        </section>

        <section>
            <h2 class="section-title">Features</h2>
            <ul class="func-list">
                {{#each funcs}}
                    <li>{{this}}</li>
                {{/each}}
            </ul>
        </section>
    </div>
    <section class="hashtags">

        <div class="accordion" id="hashtagsAccordion">
            <div class="accordion-item" style="border:none;">
                <h2 class="accordion-header" id="headingHashtags" style="padding:0;">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" style="padding-left:0;"
                            data-bs-target="#collapseHashtags" aria-expanded="false" aria-controls="collapseHashtags">
                        <h2 class="section-title">Hashtags</h2>
                    </button>
                </h2>
                <div id="collapseHashtags" class="accordion-collapse collapse" aria-labelledby="headingHashtags"
                     data-bs-parent="#hashtagsAccordion">
                    <div class="accordion-body">
                        {{#if hashtags}}

                            {{#if hashtags.twitter}}
                                <p>Twitter:
                                    {{#each hashtags.twitter}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.instagram}}
                                <p>Instagram:
                                    {{#each hashtags.instagram}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.tikTok}}
                                <p>TikTok:
                                    {{#each hashtags.tikTok}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.medium}}
                                <p>Medium:
                                    {{#each hashtags.medium}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.devTo}}
                                <p>Dev.to:
                                    {{#each hashtags.devTo}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.hackerNews}}
                                <p>Hacker News:
                                    {{#each hashtags.hackerNews}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                            {{#if hashtags.youtube}}
                                <p>YouTube:
                                    {{#each hashtags.youtube}}
                                        <span class="copyable-hashtag" onclick="copyToClipboard(this)">{{this}}</span>
                                    {{/each}}
                                </p>
                            {{/if}}

                        {{else}}
                            <p>No hashtags found.</p>
                        {{/if}}
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <h2 class="section-title">Reddit Posts</h2>
        <div class="small-text">
            Free version is limited. Full access is 4.99$.
        </div>
        {{#each posts}}
            <div class="subreddit-section">
                <h3 class="subr"><a target="_blank" href="https://reddit.com/r/{{@key}}">/r/{{@key}}</a></h3>
                <ul class="post-list">
                    {{#each this}}
                        <li>
                            <a class="post-link" href="{{href}}" onclick="goToLink(event, '{{href}}')">{{title}}</a>
                            <span class="post-votes">({{votes}} votes)</span>
                            <p>{{truncate text 200}}</p>


                            <div class="{{#ifEq href "Unlock"}}hidden{{/ifEq}}">
                                <p class="summary"><b>Summary:</b> {{reason}}</p>
                                <p class="answer">
                                    <b>Your answer:</b>
                                    <button onclick="showAnswer('{{subr}}-{{@index}}', this)">Show</button>
                                    <span id="answer-{{subr}}-{{@index}}" class="hidden">
                                        (<span class="small-text">Click text to copy</span>)
                                        <span onclick="copyToClipboard(this)">{{answer}}</span>
                                    </span>
                                </p>
                            </div>
                        </li>
                    {{/each}}
                </ul>
            </div>
        {{/each}}
    </section>


    <!--<section>
        <h2 class="section-title">Other stuff you prolly wanna use:</h2>
    </section>-->


    <section>
        <h2 class="section-title">Subreddits related to your app</h2>
        <div class="small-text">
            Free version is limited. Full access is 4.99$.
        </div>
        <ul class="sub-list">
            {{#each subs}}
                <li><a href="{{link}}" onclick="goToLink(event, '{{link}}')" target="_blank">{{name}}</a> ({{fNum users}} users)</li>
            {{/each}}
        </ul>
    </section>
`;