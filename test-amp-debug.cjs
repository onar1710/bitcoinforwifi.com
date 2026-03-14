const fs = require('fs');
const path = require('path');

console.log('🔍 AMP DEBUG TEST - Buscando problemas de AMP...\n');

// 1. Buscar todas las referencias a AMP en el código
function findAMPReferences(dir) {
    const results = [];
    
    function walkDir(currentDir) {
        const files = fs.readdirSync(currentDir);
        
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
                walkDir(filePath);
            } else if (stat.isFile() && (file.endsWith('.astro') || file.endsWith('.js') || file.endsWith('.mjs') || file.endsWith('.ts'))) {
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    
                    // Buscar referencias a AMP
                    const ampPatterns = [
                        /amphtml/gi,
                        /rel=["']amp["']/gi,
                        /<link[^>]*amp/gi,
                        /NOAMPHTML/gi,
                        /\?amp/gi,
                        /\.amp/gi,
                        /amp-/gi,
                        /cdn\.ampproject\.org/gi
                    ];
                    
                    for (const pattern of ampPatterns) {
                        const matches = content.match(pattern);
                        if (matches) {
                            results.push({
                                file: filePath,
                                pattern: pattern.source,
                                matches: matches,
                                lines: content.split('\n').map((line, i) => {
                                    if (pattern.test(line)) {
                                        return `Line ${i + 1}: ${line.trim()}`;
                                    }
                                }).filter(line => line)
                            });
                        }
                    }
                } catch (err) {
                    // Ignorar errores de lectura
                }
            }
        }
    }
    
    walkDir(dir);
    return results;
}

// 2. Analizar el SEO component específicamente
function analyzeSEOComponent() {
    const seoPath = path.join(__dirname, 'src/components/SimpleSEO.astro');
    
    if (fs.existsSync(seoPath)) {
        const content = fs.readFileSync(seoPath, 'utf8');
        console.log('📄 Analizando SimpleSEO.astro:');
        console.log('=====================================');
        
        // Buscar líneas específicas
        const lines = content.split('\n');
        lines.forEach((line, i) => {
            if (line.includes('amphtml') || line.includes('NOAMPHTML') || line.includes('amp')) {
                console.log(`Line ${i + 1}: ${line.trim()}`);
            }
        });
        
        console.log('\n');
    }
}

// 3. Verificar estructura de archivos AMP
function checkAMPFiles() {
    const pagesDir = path.join(__dirname, 'src/pages');
    const ampFiles = [];
    
    function findAMPFiles(dir) {
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                findAMPFiles(filePath);
            } else if (file.includes('.amp.')) {
                ampFiles.push(filePath);
            }
        }
    }
    
    findAMPFiles(pagesDir);
    
    console.log('📁 Archivos AMP encontrados:');
    console.log('==========================');
    ampFiles.forEach(file => {
        console.log(`✅ ${file.replace(__dirname, '')}`);
    });
    
    if (ampFiles.length === 0) {
        console.log('❌ No se encontraron archivos .amp.astro');
    }
    
    console.log('\n');
    
    return ampFiles;
}

// 4. Simular lo que Google vería
function simulateGoogleCrawl() {
    console.log('🤖 Simulando lo que Google ve:');
    console.log('================================');
    
    // Leer el index.html generado
    const indexPath = path.join(__dirname, 'dist/index.html');
    if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');
        
        // Buscar amphtml
        const amphtmlMatch = content.match(/<link[^>]*rel=["']amphtml["'][^>]*href=["']([^"']+)["']/gi);
        if (amphtmlMatch) {
            console.log('✅ Se encontraron etiquetas amphtml:');
            amphtmlMatch.forEach(match => console.log(`   ${match}`));
        } else {
            console.log('❌ No se encontraron etiquetas amphtml en index.html');
        }
        
        // Buscar NOAMPHTML
        const noampMatch = content.match(/NOAMPHTML/gi);
        if (noampMatch) {
            console.log('❌ Se encontró NOAMPHTML (esto bloquea AMP):');
            noampMatch.forEach(match => console.log(`   ${match}`));
        }
        
    } else {
        console.log('❌ No existe dist/index.html - ejecuta npm run build primero');
    }
    
    console.log('\n');
}

// 5. Test de URLs AMP
function testAMPURLs() {
    console.log('🌐 Testing URLs AMP:');
    console.log('====================');
    
    const testURLs = [
        'http://localhost:4321/',
        'http://localhost:4321/?amp',
        'http://localhost:4321/index.amp',
        'http://localhost:4321/about',
        'http://localhost:4321/about.amp'
    ];
    
    testURLs.forEach(url => {
        console.log(`📍 ${url}`);
        console.log(`   → Debería servir: ${url.includes('.amp') ? 'Página AMP' : 'Página normal'}`);
        console.log(`   → Si tiene ?amp: ${url.includes('?amp') ? 'Debería servir AMP' : 'Debería servir normal'}`);
    });
    
    console.log('\n');
}

// Ejecutar todos los tests
console.log('🚀 Iniciando diagnóstico AMP completo...\n');

const srcDir = path.join(__dirname, 'src');
const ampReferences = findAMPReferences(srcDir);

console.log('🔍 Referencias a AMP encontradas:');
console.log('==================================');
if (ampReferences.length === 0) {
    console.log('✅ No se encontraron referencias problemáticas a AMP');
} else {
    ampReferences.forEach(ref => {
        console.log(`📁 ${ref.file.replace(__dirname, '')}`);
        console.log(`   Pattern: ${ref.pattern}`);
        console.log(`   Matches: ${ref.matches.length}`);
        ref.lines.forEach(line => console.log(`   ${line}`));
        console.log('');
    });
}

analyzeSEOComponent();
checkAMPFiles();
simulateGoogleCrawl();
testAMPURLs();

console.log('🎯 RECOMENDACIONES:');
console.log('===================');
console.log('1. Si NO quieres AMP: Elimina todas las referencias a amphtml');
console.log('2. Si SÍ quieres AMP: Asegúrate que ?amp redirija a .amp files');
console.log('3. Verifica que NOAMPHTML no esté presente');
console.log('4. Testea las URLs en el navegador para ver qué se sirve realmente');

console.log('\n✅ Diagnóstico completado!');
