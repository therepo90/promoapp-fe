export class Templates {
    constructor() {
        this.templates = {};
    }

    register(name, templateSrc) {
        console.log('registering template', name);
        this.templates[name] = window.Handlebars.compile(templateSrc);
    }

    get(name) {
        return this.templates[name];
    }
}
export const templates = new Templates();