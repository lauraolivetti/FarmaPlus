// Dados dos produtos (em um cenário real, viriam de uma API)
const produtos = [
    {
        id: 1,
        nome: "Paracetamol 750mg",
        descricao: "Analgésico e antitérmico para alívio de dores e febre.",
        preco: 12.90,
        imagem: "images/produto-paracetamol.jpg",
        categoria: "Medicamentos"
    },
    {
        id: 2,
        nome: "Vitamina C 1000mg",
        descricao: "Suplemento vitamínico para fortalecer o sistema imunológico.",
        preco: 29.90,
        imagem: "images/produto-vitamina-c.jpg",
        categoria: "Vitaminas"
    },
    {
        id: 3,
        nome: "Protetor Solar FPS 60",
        descricao: "Proteção avançada contra raios UVA e UVB para pele sensível.",
        preco: 45.90,
        imagem: "images/produto-protetor-solar.jpg",
        categoria: "Dermocosméticos"
    },
    {
        id: 4,
        nome: "Álcool em Gel 70%",
        descricao: "Antisséptico para higienização das mãos, frasco 500ml.",
        preco: 9.90,
        imagem: "images/produto-alcool-gel.jpg",
        categoria: "Higiene"
    }
];

// Carrinho de compras
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para carregar produtos na página inicial
function carregarProdutosDestaque() {
    const container = document.getElementById('produtos-destaque');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    // Mostrar apenas 4 produtos em destaque na página inicial
    const produtosDestaque = produtos.slice(0, 4);
    
    produtosDestaque.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-4';
        card.innerHTML = `
            <div class="card product-card h-100">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">${produto.descricao}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 mb-0 text-red">R$ ${produto.preco.toFixed(2)}</span>
                        <button class="btn btn-red btn-add-cart" data-id="${produto.id}">Comprar</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Adicionar event listeners aos botões
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            adicionarAoCarrinho(id);
        });
    });
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;
    
    const itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    
    alert(`${produto.nome} adicionado ao carrinho!`);
}

// Função para atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const contador = document.getElementById('cart-count');
    if (contador) {
        const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
        contador.textContent = totalItens;
    }
}

// Função para carregar carrinho na página do carrinho
function carregarCarrinho() {
    const container = document.getElementById('carrinho-itens');
    const totalContainer = document.getElementById('carrinho-total');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (carrinho.length === 0) {
        container.innerHTML = '<p class="text-center">Seu carrinho está vazio.</p>';
        totalContainer.innerHTML = '<h4>Total: R$ 0,00</h4>';
        return;
    }
    
    let total = 0;
    
    carrinho.forEach((item, index) => {
        const itemTotal = item.preco * item.quantidade;
        total += itemTotal;
        
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.imagem}" alt="${item.nome}" class="img-fluid">
                </div>
                <div class="col-md-4">
                    <h5>${item.nome}</h5>
                    <p class="text-muted">${item.categoria}</p>
                </div>
                <div class="col-md-2">
                    <p class="fw-bold">R$ ${item.preco.toFixed(2)}</p>
                </div>
                <div class="col-md-2">
                    <input type="number" min="1" value="${item.quantidade}" 
                           class="form-control form-control-sm item-quantity" 
                           data-index="${index}">
                </div>
                <div class="col-md-2">
                    <button class="btn btn-sm btn-outline-danger btn-remove-item" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
    
    totalContainer.innerHTML = `
        <h4>Total: R$ ${total.toFixed(2)}</h4>
        <button class="btn btn-red btn-lg w-100 mt-3" id="finalizar-compra">Finalizar Compra</button>
    `;
    
    // Adicionar event listeners
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const novaQuantidade = parseInt(e.target.value);
            
            if (novaQuantidade < 1) {
                e.target.value = 1;
                return;
            }
            
            carrinho[index].quantidade = novaQuantidade;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            carregarCarrinho();
        });
    });
    
    document.querySelectorAll('.btn-remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.closest('.btn-remove-item').getAttribute('data-index'));
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            carregarCarrinho();
            atualizarContadorCarrinho();
        });
    });
    
    document.getElementById('finalizar-compra').addEventListener('click', () => {
        alert('Compra finalizada com sucesso! Obrigado pela preferência.');
        carrinho = [];
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        carregarCarrinho();
        atualizarContadorCarrinho();
    });
}

// Função para lidar com o login
function configurarLogin() {
    const formLogin = document.getElementById('form-login');
    
    if (!formLogin) return;
    
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const lembrar = document.getElementById('lembrar').checked;
        
        // Simulação de autenticação
        if (email && senha) {
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
}

// Função para lidar com a newsletter
function configurarNewsletter() {
    const formNewsletter = document.getElementById('newsletter-form');
    
    if (!formNewsletter) return;
    
    formNewsletter.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = formNewsletter.querySelector('input[type="email"]').value;
        const checkbox = document.getElementById('newsletterCheck');
        
        if (email && checkbox.checked) {
            alert('Obrigado por assinar nossa newsletter!');
            formNewsletter.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutosDestaque();
    atualizarContadorCarrinho();
    
    // Verificar se estamos na página do carrinho
    if (window.location.pathname.includes('carrinho.html') || 
        window.location.hash === '#carrinho') {
        carregarCarrinho();
    }
    
    configurarLogin();
    configurarNewsletter();
});