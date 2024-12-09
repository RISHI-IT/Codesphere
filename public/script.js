const htmlEditor = document.getElementById("html-editor");
const cssEditor = document.getElementById("css-editor");
const jsEditor = document.getElementById("js-editor");
const livePreivew = document.getElementById("live-preview");
const toggleDarkMode = document.getElementById("toggle-dark-mode");
const socket = io(); // to make a websocket connection to the server using socket IO

// Update live preview
const updatePreview = () => {
    const html = htmlEditor.value; // Fixed: use .value instead of .value()
    const css = `<style>${cssEditor.value}</style>`; 
    const js = `<script>${jsEditor.value}</script>`; 
    const previewContent = `${html}${css}${js}`;
    livePreivew.srcdoc = previewContent;
    socket.emit('codeChange', { html, css, js });
}

// Code changes
socket.on('updateCode', (data) => {
    htmlEditor.value = data.html;
    cssEditor.value = data.css;
    jsEditor.value = data.js;
    updatePreview();
})

// Event listeners for input
htmlEditor.addEventListener('input', updatePreview);
cssEditor.addEventListener('input', updatePreview);
jsEditor.addEventListener('input', updatePreview);

// Dark mode
toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});