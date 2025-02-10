const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Diretório onde estão os arquivos HTML
const adestramentoDir = path.join(__dirname, 'adestramento');
const banhoetosaDir = path.join(__dirname, 'banho e tosa');
const cagoriasDir = path.join(__dirname, 'cagorias');
const carrinhoDir = path.join(__dirname, 'carrinho');
const homeDir = path.join(__dirname, 'home');
const loginDir = path.join(__dirname, 'login');
const servicosDir = path.join(__dirname, 'servicos');
const servicosveterinariosDir = path.join(__dirname, 'servicos veterinarios');

// Função para gerar um hash SHA-256 de um arquivo
function generateHash(fileContent) {
    return crypto.createHash('sha256').update(fileContent).digest('hex');
}

// Função para gerar hashes de todos os arquivos em um diretório
function generateHashesForDirectory(directory) {
    const hashes = {};
    fs.readdirSync(directory).forEach(file => {
        const filePath = path.join(directory, file);
        const content = fs.readFileSync(filePath, 'utf8');
        hashes[file] = generateHash(content);
    });
    return hashes;
}

// Gera os hashes para as páginas e componentes
const adestramentoHashes = generateHashesForDirectory(adestramentoDir);
const banhoetosaHashes = generateHashesForDirectory(banhoetosaDir);
const cagoriasHashes = generateHashesForDirectory(cagoriasDir);
const carrinhoHashes = generateHashesForDirectory(carrinhoDir);
const homeHashes = generateHashesForDirectory(homeDir);
const loginHashes = generateHashesForDirectory(loginDir);
const servicosHashes = generateHashesForDirectory(servicosDir);
const servicosveterinariosHashes = generateHashesForDirectory(servicosveterinariosDir);

// Combina os hashes em um único objeto
const allHashes = { ...adestramentoHashes, ...banhoetosaHashes, ...cagoriasHashes, ...carrinhoHashes, ...homeHashes, ...loginHashes, ...servicosHashes, ...servicosveterinariosHashes };

// Salva os hashes em um arquivo JSON
fs.writeFileSync('hashes.json', JSON.stringify(allHashes, null, 2));
console.log('Hashes gerados e salvos em hashes.json');