const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Substitua pelos seus diretórios onde estão os seus arquivos HTML
const adestramentoDir = path.join(__dirname, 'adestramento');
const banhoetosaDir = path.join(__dirname, 'banho e tosa');
const cagoriasDir = path.join(__dirname, 'cagorias');
const carrinhoDir = path.join(__dirname, 'carrinho');
const homeDir = path.join(__dirname, 'home');
const loginDir = path.join(__dirname, 'login');
const servicosDir = path.join(__dirname, 'servicos');
const servicosveterinariosDir = path.join(__dirname, 'servicos veterinarios');

// Hashes originais (gerados previamente)
const originalHashes = {
    "adestramento.html": "c83f0a7b86d0c0af63f775ed20c55cc636bcfcf8f25fd64e9fbe33615fa9ee2f",
    "styles.css": "2022c4c56fd8524c452a04d9a6937956ed43d7b781200e642b428f14e81f6958",
    "banhoetosa.html": "45ec6edc9a7b663a04bfd6f3c97a62ef14fe6d5a81e8d78a41878d29708df34a",
    "categorias.html": "7c4121a5bd252f9113e01334f7029ed577893f8db1ba60f415b72a22bd6cff99",
    "carrinho.html": "3e7bb35e99f2956342fca6b1f227b9262d07e0a2444c0f9607b15fb1f63d62c6",
    "script.js": "caf2c0ffe294354923d457866db025e013069ce0a87315dbb3128c05a7614883",
    "index.html": "70f1bab614664d891b5a0deb49acad702ff54d22882bebfb6c72eaab78b36e5f",
    "cadastro.html": "1331e46a0132c7cbb8b47b5bfdf850363c45ecb2a058973a5a6e28e5b90fde19",
    "style.css": "1e8b2803bc45e6829c2208a9e0fb762e5a462ab742de64e87ad0261964d246ed",
    "servicos.html": "293b0e8a00cdaf23588509474cdac6ce2536ce5bd0eed33cf439ef3dfb754d7f",
    "veterinarios.html": "3f530c17a369fc541a3ee1defd1677a7c125db03e3002fd55e8921f2913c9f04"
  }

// Função para gerar um hash SHA-256 de um arquivo
function generateHash(fileContent) {
    return crypto.createHash('sha256').update(fileContent).digest('hex');
}

// Função para verificar os arquivos em um diretório
function checkFilesInDirectory(directory, hashes) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Erro ao ler o diretório ${directory}:`, err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Erro ao ler o arquivo ${filePath}:`, err);
                    return;
                }

                const currentHash = generateHash(data);
                if (currentHash !== hashes[file]) {
                    console.log(`Atenção: O arquivo ${file} foi modificado!`);
                } else {
                    console.log(`O arquivo ${file} está intacto.`);
                }
            });
        });
    });
}

// Verifica os arquivos nas pastas
checkFilesInDirectory(adestramentoDir, originalHashes);
checkFilesInDirectory(banhoetosaDir, originalHashes);
checkFilesInDirectory(carrinhoDir, originalHashes);
checkFilesInDirectory(cagoriasDir, originalHashes);
checkFilesInDirectory(homeDir, originalHashes);
checkFilesInDirectory(loginDir, originalHashes);
checkFilesInDirectory(servicosDir, originalHashes);
checkFilesInDirectory(servicosveterinariosDir, originalHashes);
