var $j = jQuery.noConflict();
const TEM_REGISTRO = 0;
var elite = {

    // aplica as funcoes na tela
    aplicarEventos: function () {
        elite.removeBlocksDesnecessarios();
        elite.correcaoCSS();
        elite.corrigeMenuTop();
        elite.criaMenuLateral();
        elite.slider();

    },

    // remove blocos desnecessarios
    removeBlocksDesnecessarios: function () {
        $j('.block-poll').remove();
        $j('.title').remove();
    },

    // aplica a opcao inicio ao menu
    corrigeMenuTop: function () {
        $j('#nav li:first-child').removeClass('first parent');
        $j('#nav').prepend('<li class="level10 nav-0 level-top first parent inicio"><a href="/"> Inicio</a></li>');
    },

    // cria o menu lateral
    criaMenuLateral: function(){

        var cloneTopMenu  = $j('#nav li');
        $j('#nav').remove();
        var html = "<h4 class='title-categorias'>Categorias</h4>";

        html += "<ul>";
        var ulSub= "<ul>";

        cloneTopMenu.each(function (index, element) {

           var conteudoLink = $j(element).children().first();

            if($j(element).hasClass('level1')) {
                html += "<li class='menu-lateral-sub '><a href='" + conteudoLink.attr('href') + "' >" +  conteudoLink.text() + "</a></li>";
            }
            else{
                var inicio = '';
                if(conteudoLink.text() == ' Inicio'){
                    inicio = 'inicio';
                }
                html += "<li class='menu-lateral pai'><a class='"+inicio + "' href='" + conteudoLink.attr('href') + "' >" +  conteudoLink.text() + "</a></li>";
            }

        });
        html += '</ul>';

        $j('.col-left.sidebar').css('box-shadow','0px 0px 3px rgb(140, 109, 52)');
        $j('.col-left.sidebar').append(html);
    },

    // carrega o submeno conforme passar do mouse na categoria principal
    carregaSubMenu: function () {

    },

    //carrega o slider slickjs
    slider: function () {
        if($j('.slider-vitrine').length){
            var slider = $j('.slider-vitrine')
                .on('init', function(slick) {
                   // console.log('fired!');
                    $j('.slider-vitrine').fadeIn(3000);
                })
                .slick({
                    dots: true,
                    infinite:true,
                    fade: true,
                    focusOnSelect: true,
                    lazyLoad: 'ondemand',
                    speed: 300,
                    autoplay: true,
                    autoplaySpeed: 2000
                });
            }
    },

    // aplica conf e estilo ao form pesquisar
    aplicaBotaoPesquisa: function () {
        //aplica botao de pesquisa
        var btnSearch = $j('.form-search button');
        btnSearch.removeClass('button').addClass('btn btn-warning');
        btnSearch.children('span').remove();
        btnSearch.html('<i class="glyphicon glyphicon-search"></i>');
        $j('#search').addClass('form-control');
    },

    //plota o menu no topo
    menuUserTopo: function () {
        $j('ul .top-link-checkout').parents('li').remove();
        var htmlDados =
            '<li id="menu-telefone"> (31)3333-3333</li>' +
            '<li id="menu-email"> elitecolecionaveis@elite.com.br</li>' +
            '<a class="redes-face" href="#"></a>' +
            '<a class="redes-youtube" href="#"></a>';

        //coloca menu do header  no topo
        var listaOpcoesUser = $j('.quick-access .links');
        $j('.wrapper').prepend("<div class='container-menu-top'><ul>"+ listaOpcoesUser.html() +"</ul><ul style='margin-left: 10px'>"+ htmlDados +"</ul></div>");


        //remove as primeiras opcoes
        $j('.quick-access .links li').eq(0).remove();
        $j('.quick-access .links li').eq(0).remove();

        //arruma icone carrinho
        $j('.quick-access .links li a').eq(0).addClass('icon-top carrinho-icon');
        //retira link de login dos botoes
        $j('.quick-access .links li').eq(1).remove();

        //arruma icone fale conosco
        $j('.quick-access .links').append('<li id="fale-conosco"><a class="icon-top fale-conosco-icon" href="http://elitecolecionaveis.com.br/contacts/">Fale Conosco</a></li>');

        //exibe os icones
        $j('.quick-access .links').css('display', 'block');
    },

    //correções css na tela de carrinho(checkout)
    carrinho: function () {
        //retira widget vazio organiza grid no carrinho de compras
        if($j('.cart-collaterals .col2-set').length > TEM_REGISTRO){
            var widgetsShopp = $j('.cart-collaterals .col2-set');
            widgetsShopp.find('.col-1').remove();
            widgetsShopp.removeClass('col2-set');
            widgetsShopp.find('.col-2').removeClass('col-2').addClass('col-sm-4');
            widgetsShopp = $j('.cart-collaterals');
            var shipping = widgetsShopp.find('.shipping');
            shipping.remove();
            widgetsShopp.append("<div class='col-sm-4 shipping-container'>"+ shipping.html() +"</div>");
            var totals = $j('.cart-collaterals').find('.totals');
            totals.remove();
            widgetsShopp.append("<div class='col-sm-4'>"+ totals.html() +"</div>");

            $j('#shopping-cart-totals-table td').removeClass('a-right').addClass('a-left');
        }
    },

    //aplica conf e estilização nas abas da pagina principal
    abasPrincipal: function () {
        //realoca os produtos nas abas
        var todosProdutos = $j('.category-products');
        //remove os itens na pagina principal para colocar nas tabs
        if(todosProdutos.find('.toolbar').length == TEM_REGISTRO) {

            //aplica à aba lançamento
            var novosProdutos = $j('.std').prevAll('.products-grid');
            novosProdutos.remove();

            if (novosProdutos.length > 0){
                var novos = '';
                // for decremental pois com o prev, ele monta as listas ao contrario
                for (var i = novosProdutos.length-1; i >= 0; i--) {
                    novos += "<ul class='products-grid novo'>" + novosProdutos.eq(i).html() + "</ul>";
                }
            }
            $j('#tabs-2').html(novos);
            todosProdutos.remove();
            $j('#tabs-1').html("<div>" +todosProdutos.html() + "</div>");

            //aplica a aba ultimas visualizações os itens
            var ultVisualizacoes = $j('.std').nextAll('.products-grid');
            ultVisualizacoes.remove();
            $j('#tabs-3').html("<ul class='products-grid'>"+ultVisualizacoes.html()+"</ul>");


            $j('.products-grid').show();
        }
    },

    tab: function () {
        if($j( "#tabs").length > TEM_REGISTRO){
            $j( "#tabs" ).tabs({
                collapsible: false
            });
        }
    },

    // centraliza as correções css
    correcaoCSS: function () {
        elite.aplicaBotaoPesquisa();
        //adidiciona classe para botao adicionar carrinho
        $j('.btn-cart').removeClass('button');

        $j('.footer .links').addClass('col-sm-12');
        $j('.form-subscribe-header').remove();
        $j('.block-content label').text('Fique por dentro das novidades de seus personagens favoritos:');

        //altera label do icone subscribe
        $j('#newsletter-validate-detail').find('span').children().text('Assinar');

        $j('block.block-tags').remove();

        elite.menuUserTopo();
        elite.abasPrincipal();
        //remove h3 acima da grid de produtos
        $j('.main .subtitle').remove();

        elite.carrinho();

        //retira info desncessaria sobre o produto
        $j('.product-pricing').remove();
        $j('.or').remove();

        //retira botao lista de desejo
        $j('.link-wishlist').remove();
        $j('.link-compare').remove();

        //retira a quantidade total de produtos do grid
        $j('.toolbar .pager .amount').addClass('ocultar');

        //acrescenta classe bootstrap para alinhar itens do filro de pesquisa(pagina da categoria)
        $j('.pager').addClass('col-sm-8');

    }

};

$j(document).ready(function(){
    elite.aplicarEventos();
    elite.tab();
});

