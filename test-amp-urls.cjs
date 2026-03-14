const http = require('http');
const https = require('https');

console.log('🧪 AMP URL TEST - Verificando URLs AMP en tiempo real...\n');

// Función para hacer peticiones HTTP
function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        
        const req = client.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    content: data.substring(0, 1000) // Primeros 1000 caracteres
                });
            });
        });
        
        req.on('error', reject);
        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Timeout'));
        });
    });
}

// URLs a testear
const testUrls = [
    { url: 'http://localhost:4321/', expected: 'normal' },
    { url: 'http://localhost:4321/?amp', expected: 'redirect' },
    { url: 'http://localhost:4321/index.amp', expected: 'amp' },
    { url: 'http://localhost:4321/about', expected: 'normal' },
    { url: 'http://localhost:4321/about.amp', expected: 'amp' },
    { url: 'http://localhost:4321/blog', expected: 'normal' },
    { url: 'http://localhost:4321/blog.amp', expected: 'amp' }
];

async function runTests() {
    console.log('🌐 Testeando URLs...\n');
    
    for (const test of testUrls) {
        try {
            console.log(`📍 ${test.url}`);
            console.log(`   Expected: ${test.expected}`);
            
            const result = await fetchUrl(test.url);
            console.log(`   Status: ${result.status}`);
            
            // Verificar si es AMP (solo contenido AMP real)
            const isAMP = result.content.includes('amp-boilerplate') || 
                         result.content.includes('cdn.ampproject.org') ||
                         result.content.includes('<html amp') ||
                         result.content.includes('<html ⚡') ||
                         result.content.includes('⚡') && result.content.includes('html');
            
            // Verificar si es redirect
            const isRedirect = result.status >= 300 && result.status < 400;
            
            console.log(`   Actual: ${isRedirect ? 'redirect' : (isAMP ? 'amp' : 'normal')}`);
            
            if (test.expected === 'amp' && !isAMP) {
                console.log('   ❌ ERROR: Se esperaba AMP pero no es AMP');
            } else if (test.expected === 'normal' && isAMP) {
                console.log('   ❌ ERROR: Se esperaba normal pero es AMP');
            } else if (test.expected === 'redirect' && !isRedirect) {
                console.log('   ❌ ERROR: Se esperaba redirect pero no hay redirect');
            } else {
                console.log('   ✅ OK');
            }
            
            if (isRedirect && result.headers.location) {
                console.log(`   → Redirect to: ${result.headers.location}`);
            }
            
            console.log('');
            
        } catch (error) {
            console.log(`   ❌ ERROR: ${error.message}\n`);
        }
    }
    
    console.log('🎯 Análisis del Sitemap:');
    console.log('======================');
    
    try {
        const sitemapResult = await fetchUrl('http://localhost:4321/sitemap.xml');
        if (sitemapResult.status === 200) {
            console.log('✅ Sitemap accessible');
            
            // Buscar URLs AMP en el sitemap
            const ampMatches = sitemapResult.content.match(/<amp:html>([^<]+)<\/amp:html>/g);
            if (ampMatches) {
                console.log(`📄 URLs AMP en sitemap: ${ampMatches.length}`);
                ampMatches.forEach(match => {
                    const url = match.replace(/<amp:html>|<\/amp:html>/g, '');
                    console.log(`   → ${url}`);
                });
            } else {
                console.log('❌ No se encontraron URLs AMP en el sitemap');
            }
        } else {
            console.log(`❌ Sitemap no accessible: ${sitemapResult.status}`);
        }
    } catch (error) {
        console.log(`❌ Error accediendo sitemap: ${error.message}`);
    }
    
    console.log('\n🔍 Verificación final:');
    console.log('=====================');
    console.log('1. Las páginas .amp deben servir contenido AMP válido');
    console.log('2. Las páginas ?amp deben redirigir a .amp');
    console.log('3. El sitemap debe apuntar a URLs .amp (no ?amp)');
    console.log('4. Las páginas normales no deben tener contenido AMP');
    
    console.log('\n✅ Test completado!');
}

// Ejecutar test
runTests().catch(console.error);
