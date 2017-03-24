const textbox = document.getElementById("playerInput");

export default function setupInput(onInput, onError) {
    textbox.addEventListener("keypress", (e) => {
        if (e.keyCode == 13) {
            const line = textbox.value;
            const validChars = /^[\w\s]+$/;
            if (validChars.test(line)) {
                onInput(line);
            } else {
                onError(line);
            }
            textbox.value = '';
        }
    });
}
