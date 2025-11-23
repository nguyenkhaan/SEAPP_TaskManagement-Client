import DOMPurify from 'dompurify';
const purify = (raw) => {
    return DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });
}


export default purify