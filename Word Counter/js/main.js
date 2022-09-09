//

const senha = document.querySelector('.senha');
const genSenha = document.querySelector('#gen');
const copySenha = document.querySelector('#copy');

genSenha.addEventListener('click', (e) => {
    e.preventDefault();

    const chars = '!@#$%&abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const tam = 20;
    let novaSenha = '';

    for (let i = 0; i <= tam; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        novaSenha += chars.substring(randomNumber, randomNumber + 1);
    }

    senha.value = novaSenha;
});

copySenha.addEventListener('click', (e) => {
    e.preventDefault();

    if (!senha.value) {
        copySenha.style.background = 'red';
        copySenha.textContent = 'Clique em Gerar!';
        setInterval(() => {
            copySenha.style.background = 'rgb(255, 4, 121)';
            copySenha.textContent = 'Copiar Senha';
        }, 2000);
    } else {
        navigator.clipboard.writeText(senha.value);
        copySenha.style.background = 'rgb(74, 207, 96)';
        copySenha.textContent = 'Senha Copiada!';
        setInterval(() => {
            copySenha.style.background = 'rgb(255, 4, 121)';
            copySenha.textContent = 'Copiar Senha';
        }, 3000);
    }
});