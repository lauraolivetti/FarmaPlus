// Dados dos produtos
const produtos = [
    {
        id: 1,
        nome: "Paracetamol 750mg",
        descricao: "Analgésico e antitérmico para alívio de dores e febre.",
        preco: 12.90,
        imagem: "images/produto-paracetamol.jpg",
        categoria: "medicamentos"
    },
    {
        id: 2,
        nome: "Vitamina C 1000mg",
        descricao: "Suplemento vitamínico para fortalecer o sistema imunológico.",
        preco: 29.90,
        imagem: "images/produto-vitamina-c.jpg",
        categoria: "vitaminas"
    },
    {
        id: 3,
        nome: "Protetor Solar FPS 60",
        descricao: "Proteção avançada contra raios UVA e UVB para pele sensível.",
        preco: 45.90,
        imagem: "images/produto-protetor-solar.jpg",
        categoria: "cosmeticos"
    },
    {
        id: 4,
        nome: "Álcool em Gel 70%",
        descricao: "Antisséptico para higienização das mãos, frasco 500ml.",
        preco: 9.90,
        imagem: "images/produto-alcool-gel.jpg",
        categoria: "higiene"
    },
    {
        id: 5,
        nome: "Shampoo Infantil",
        descricao: "Shampoo suave para bebês e crianças, sem lágrimas.",
        preco: 18.50,
        imagem: "images/produto-shampoo-infantil.jpg",
        categoria: "infantil"
    },
    {
        id: 6,
        nome: "Creme Hidratante Corporal",
        descricao: "Hidratação intensiva para pele seca, 400ml.",
        preco: 32.90,
        imagem: "images/produto-creme-hidratante.jpg",
        categoria: "cosmeticos"
    },
    {
        id: 7,
        nome: "Ibuprofeno 400mg",
        descricao: "Anti-inflamatório para dores e inflamações.",
        preco: 15.75,
        imagem: "images/produto-ibuprofeno.jpg",
        categoria: "medicamentos"
    },
    {
        id: 8,
        nome: "Multivitamínico Adulto",
        descricao: "Complexo vitamínico completo para o dia a dia.",
        preco: 49.90,
        imagem: "images/produto-multivitaminico.jpg",
        categoria: "vitaminas"
    },
    {
        id: 9,
        nome: "Fraldas Descartáveis",
        descricao: "Fraldas super absorventes para bebês, pacote com 50 unidades.",
        preco: 54.90,
        imagem: "images/produto-fraldas.jpg",
        categoria: "infantil"
    },
    {
        id: 10,
        nome: "Sabonete Líquido",
        descricao: "Sabonete líquido bactericida, 300ml.",
        preco: 8.90,
        imagem: "images/produto-sabonete-liquido.jpg",
        categoria: "higiene"
    },
    {
        id: 11,
        nome: "Omeprazol 20mg",
        descricao: "Protetor gástrico para azia e má digestão.",
        preco: 19.90,
        imagem: "images/produto-omeprazol.jpg",
        categoria: "medicamentos"
    },
    {
        id: 12,
        nome: "Condicionador Repair",
        descricao: "Condicionador reconstrutor para cabelos danificados.",
        preco: 27.50,
        imagem: "images/produto-condicionador.jpg",
        categoria: "cosmeticos"
    }
];

// Carrinho de compras
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para carregar produtos
function carregarProdutos(categoria = 'todos') {
    const container = document.getElementById('produtos-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    let produtosFiltrados = produtos;
    
    if (categoria !== 'todos') {
        produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);
    }
    
    produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-4';
        card.innerHTML = `
            <div class="card product-card h-100">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <span class="badge bg-red mb-2">${formatarCategoria(produto.categoria)}</span>
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

// Função para formatar categoria para exibição
function formatarCategoria(categoria) {
    const categorias = {
        'medicamentos': 'Medicamentos',
        'cosmeticos': 'Cosméticos',
        'higiene': 'Higiene',
        'vitaminas': 'Vitaminas',
        'infantil': 'Infantil'
    };
    
    return categorias[categoria] || categoria;
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
    carregarProdutos();
    atualizarContadorCarrinho();
    configurarNewsletter();
    
    // Configurar filtros de categoria
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover classe active de todos os botões
            document.querySelectorAll('.categoria-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Adicionar classe active ao botão clicado
            btn.classList.add('active');
            
            // Carregar produtos da categoria selecionada
            const categoria = btn.getAttribute('data-categoria');
            carregarProdutos(categoria);
        });
    });
    
    // Configurar ordenação
    document.getElementById('ordenar-produtos').addEventListener('change', (e) => {
        // Lógica de ordenação seria implementada aqui
        console.log('Ordenar por:', e.target.value);
    });
});