//

let text = document.querySelector('#text');
let words = document.querySelector('#words');
let chars = document.querySelector('#chars');

text.addEventListener('input', () =>{
    chars.textContent = text.value.length;

    let txt = text.value.trim();
    words.textContent = txt.split(/\s+/).filter((item) => item).length;
});