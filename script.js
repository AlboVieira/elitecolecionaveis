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
        elite.show('.pai');
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

    show: function (elemento) {
        //menu-lateral pai
        $j('li.level-top').each(function( index, element ) {

            var el = $j(element);

            if(el.children('ul').length >0){
                el.prepend("<i class='glyphicon glyphicon-menu-right' style='font-size: 10px'></i>");
            }


            el.click(function () {

                if(!el.hasClass('down')){
                    el.children('i').removeClass('glyphicon glyphicon-menu-right');
                    el.children('i').addClass('glyphicon glyphicon-menu-down');
                    el.find('ul').slideDown();
                    el.addClass('down');
                }else{
                    el.children('i').removeClass('glyphicon glyphicon-menu-down');
                    el.children('i').addClass('glyphicon glyphicon-menu-right');
                    el.find('ul').slideUp();
                    el.removeClass('down');
                }
            });
        });

    },

    // cria o menu lateral
    criaMenuLateral: function(){

        var cloneTopMenu  = $j('#nav');
        //$j('#nav').remove();
        var html = "<h4 class='title-categorias'>Menu</h4>";

        html += "<ul>";

        html += cloneTopMenu.html();

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
                    //$j('.slider-vitrine').fadeIn(3000);
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
            '<li id="menu-telefone" class="ocultar"> (31)3333-3333</li>' +
            '<li id="menu-email"> contato@elitecolecionaveis.com.br</li>' +
            '<a class="redes-face" target="_blank" href="https://www.facebook.com/elitecolecionaveis"></a>' +
            '<a class="redes-insta" target="_blank" href="https://instagram.com/elitecolecionaveis/"></a>' +
            '<a class="redes-youtube" target="_blank" href="https://www.youtube.com/channel/UCwMICbqIXbmXbVu5SskpIrQ/"></a>';

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
            if(ultVisualizacoes.length > 0){
                ultVisualizacoes.remove();
                $j('#tabs-3').html("<ul class='products-grid'>"+ultVisualizacoes.html()+"</ul>");
            }

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



        if($j('.product-options .input-box').length){
            elite.botoesTamanho();
        }

    },

    botoesTamanho: function () {
        var htmlTamanho =
            "<div class='container' style='margin-top: 10px'>" +

            "<span style='font-weight: bold'>Masculino</span>"+
            "<div class='row-fluid'>" +
            "<div data-toggle='tooltip' data-placement='top' title='Altura:63cm / Largura:47cm' class='tamanhos tamMP col-sm-1'> " +
            "<span>P</span>" +
            "</div>" +
            "<div data-toggle='tooltip' data-placement='top' title='Altura:64cm / Largura:51cm' class='tamanhos tamMPP col-sm-1'> " +
            "<span>PP</span>" +
            "</div>" +
            "<div data-toggle='tooltip' data-placement='top' title='Altura:66cm / Largura:52cm' class='tamanhos tamMM col-sm-1'> " +
            "<span>M</span>" +
            "</div>" +
            "<div data-toggle='tooltip' data-placement='top' title='Altura:69cm / Largura:56cm' class='tamanhos tamMG col-sm-1'> " +
            "<span>G</span>" +
            "</div>" +
            "<div data-toggle='tooltip' data-placement='top' title='Altura:69cm / Largura:58cm' class='tamanhos tamMGG col-sm-1'>" +
            "<span>GG</span>" +
            "</div>" +
            "<div data-toggle='tooltip' data-placement='top' title='Altura:71cm / Largura:62cm' class='tamanhos tamMGG col-sm-1'>" +
            "<span>XG</span>" +
            "</div>" +
            "</div><br><br>"+

            "<span style='font-weight: bold'>Feminino</span>"+
            "<div class='row-fluid'>" +
            "<div data-toggle='tooltip' data-placement='top' title='Altura:58cm / Largura:45cm' class='tamanhos tamFP col-sm-1'> " +
            "<span>P</span>" +
            "</div>" +
            "<div data-toggle='tooltip' data-placement='top' title='Altura:58cm / Largura:49cm' class='tamanhos tamFM col-sm-1'> " +
            "<span>M</span>" +
            "</div>" +
            "<div data-toggle='tooltip' data-placement='top' title='Altura:61cm / Largura:50cm' class='tamanhos tamFG col-sm-1'> " +
            "<span>G</span>" +
            "</div>" +
            "<div data-toggle='tooltip' data-placement='top' title='Altura:61cm / Largura:52cm' class='tamanhos tamFGG col-sm-1'>" +
            "<span>GG</span>" +
            "</div>" +
            "</div>" +

            "</div>"+
            "<br><a href='http://elitecolecionaveis.com.br/medidas-camisetas' title='Ver Mais'>Ver Medidas</a>";

        $j('.product-options .input-box').eq(1).append(htmlTamanho);
    }
};

$j(document).ready(function(){
    elite.aplicarEventos();
    elite.tab();

    $j('[data-toggle="tooltip"]').tooltip();

});

