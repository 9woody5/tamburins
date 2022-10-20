$(function(){

    $('a[href="#"]').click(function(ignore){
        ignore.preventDefault(); });

    //헤더 영역

    let lastScroll = 0;

    $(window).scroll(function(){
        const currentScroll = $(this).scrollTop();

        $('.header-inner').addClass('background')
        if(currentScroll >= 100){
            if(currentScroll > lastScroll){
                $('.header-inner').addClass('hide')
            } else{
                $('.header-inner').removeClass('hide')
            } 
            lastScroll = currentScroll;
        } else{
            $('.header-inner').removeClass('background')
        }

    })


    //gnb 메뉴 열고 닫기
    $('.gnb-item a').mouseover(function(e){
        closeSub();

        target = $(this).data('hover');
        $(target).addClass('active').siblings().removeClass('active')
        utilMenuMotion.play();

        if($(target).hasClass('active')){
            $('.dimmed').css('display','block');
            $('.header .border').addClass('active');
            $('body').addClass('hide')

        } else{
            $('.dimmed').css('display','none');
            $('.header .border').removeClass('active');
            $('body').removeClass('hide')
        }
    })


    $('.group-sub').mouseleave(function(e){
        closeSub();
        $('.dimmed').css('display','none');
        utilMenuMotion.reverse();
    })



    //헤더 좌측 버튼 애니메이션
    utilMenuMotion = gsap.from('[data-effect]',{
        paused:true,
        x:100,
        opacity:0,
        stagger:0.2,
    })

    $('.util-area button').mouseover(function(e){
        e.preventDefault();
        closeSub();
        target = $(this).data('target');
        $(target).addClass('active').siblings('.hover-wrap').removeClass('active');
        $('body').addClass('hide');
        utilMenuMotion.play();

        if(target == '#hover01'){
            $('.btn-packaging').addClass('open');
            $('.dimmed').css('display','block');
        } else{
            $('.btn-packaging').removeClass('open');
        }
        
        if(target == '#hover02'){
            $('.btn-search').addClass('open');
            $('.dimmed').css('display','block');

        }else{
            $('.btn-search').removeClass('open');
        }
    }); 


    $('.btn-packaging').click(function(e){
        e.preventDefault();
        if($('.pack-area').hasClass('active')){
            $('.pack-area').removeClass('active')
            $('.dimmed').css('display','none')
            $(this).removeClass('open')
            closeSub();
        } else{
            $('.pack-area').addClass('active')
            $('.dimmed').css('display','block')
            $(this).addClass('open')
        }
    })

    $('.hover-wrap').mouseleave(function(e){
        e.preventDefault();
        closeSub();
        utilMenuMotion.reverse();
    });

    function closeSub(){
        $('.hover-wrap').removeClass('active')
        $('.btn-search').removeClass('open');
        $('.btn-packaging').removeClass('open');
        $('body').removeClass('hide')
        $('.group-sub').removeClass('active');
        $('.header .border').removeClass('active')
        $('.dimmed').css('display','none');
    }

    $('.util-area button').mouseover(function(e){
        e.preventDefault();

        target = $(this).data('target');

        if($(this).hasClass('open')){
            $('.header-inner').removeClass('background');
        } else{
            $('.header-inner').addClass('background');
        }
    })




    //메인 비주얼 영역
    gsap.to('.visual-wrap .front-cont',{
        scrollTrigger:{
            trigger: '.visual-wrap',
            start:"top top",
            end:"bottom top",
            // markers: true,
            scrub: 1,
            pin:true,
        },
        height:0
    })


    gsap.set(".main-txt span", {
        yPercent: 110,
        transformStyle: "preserve-3d",
        // opacity: 0,
        rotationX: 90,
        transformOrigin: "0% 80% -100%",
    });

    gsap.to(".main-txt span", 1,{
        delay:0.2,
        yPercent: 0,
        rotationX: 0,
    });





    //sc-about 영역
    gsap.from('[data-scale]', {
        scrollTrigger:{
            trigger: '.sc-about',
            start: "top 20%",
            // markers: true,
        },
        opacity: 0,
        scale: 0,
        stagger:0.2
    })




    //video 모달 팝업

    $('.group-video .btn-play').click(function(e){
        e.preventDefault();
        url = $(this).data('video');
        html = `<div class="video-modal">
                    <div class="dimmed1"></div>
                    <a href="" class="btn-close" role="button"><i class="bi bi-x"><span class="blind">닫기</span></i></a>
                    <div class="video-wrapper">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>`;

        $('.sc-expertise').append(html);
    })

    $(document).on('click','.btn-close, .dimmed1',function(e){
        e.preventDefault();
        $('.video-modal').remove();
    })




    //sc-approach 영역
    $('[data-fade]').each(function(i,l){

        gsap.from('.sc-approach .txt-wrap',{
            scrollTrigger:{
                trigger: l,
                start: "top 50%",
                end:"bottom 70%",
                // markers: true,
                scrub:1,
            },
            opacity:0,
            yPercent:20,
        })
    })

    gsap.from('[data-line]',1, {
        scrollTrigger:{
            trigger: '.sc-approach .txt-wrap',
            start: "top 50%",
            end:"bottom 60%",
            scrub:1,
            // markers: true,
        },
        // stagger:0.2,
        width:0
    })
    



  
    //텍스트 gsap
    
    $('[data-opacity]').each(function(i,l){

        gsap.from(l,{
            scrollTrigger:{
                trigger: l,
                start: "top 50%",
                end:"bottom 70%",
                // markers: true,
            },
            opacity:0,
            yPercent:20,
        })
    })




    //sc-brands 영역


    //텍스트 스크롤 영역
    const slideTxt = document.querySelectorAll('[data-x]')
    slideTxt.forEach(el => {
        
        xVal = el.dataset.x

        gsap.from(el,{
            scrollTrigger:{
                trigger: '.sc-approach .link-more',
                start:"bottom 100%",
                end:"+=200%",
                // markers: true,
                scrub: 1,
            },
            xPercent: xVal,
        })
    });


    //좌우 슬라이드

    $('.content-left .content-item').each(function(i,el){

        target = $('.content-right .content-item').eq(i);
        yVal  = (i == 3) ? 0 : -100;
        ScrollTrigger.create({
            trigger: el,
            start: "0% 30%",
            end:"bottom top",
            onUpdate : function(self){
                gsap.to('.sc-brands .content-left',{background:el.dataset.color})
            }  
        })



        gsap.to(target,1, {
            scrollTrigger:{
                trigger: el,
                start: "0% 0%",
                end:"bottom top",
                // markers: true,
                scrub:0,
            },
            ease:'none',
            yPercent:yVal
        })

    })




    // 네비게이션
    
    $('.content-right .nav-item a').click(function(e){
        e.preventDefault();

        target = $(this).attr('href');
        $(this).addClass('active');
        $('.nav-item a').removeClass('active');

        gsap.to(window, {duration: 0.5, scrollTo: target});
    })



    //스크롤 스파이 제작

    var link = $('#navbar a');

    $(window).on('scroll',function(){
        findPosition();
    });

    function findPosition(){
        $('.content-left .content-item').each(function(){
            if( ($(this).offset().top - $(window).scrollTop() ) < 20){
                link.removeClass('active');
                $('#navbar').find('[data-target="'+ $(this).attr('id') +'"]').addClass('active');
            }
        });
    }

    findPosition();

    
    

    ScrollTrigger.refresh();
});
