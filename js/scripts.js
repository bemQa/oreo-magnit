$(document).ready(function () {
    if(window.innerWidth > 1000) {
        $(window).on('scroll load', function () {
            var top = $(window).scrollTop();
            var href = $('.anchor').attr('href');
            if(top >= 250) {
                $('.menu-links').addClass('fixed');
            } else {
                $('.menu-links').removeClass('fixed');
            }
            $('.wrapper section').each(function() {
                var destination = $(this).offset().top-250;
                if(top >= destination) {
                    var id = $(this).attr('id');
                    $('.anchor[href^="#"]').removeClass('active');
                    $('.anchor[href^="#'+id+'"]').addClass('active');
                }
            });
        });
    }

	$('.burger').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.menu-links').toggleClass('active');
        $('body').on('click', function (e) {
            var div = $('.menu-links, .burger');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    });

    $('.anchor[href^="#"]').click(function () {
        if($(window).innerWidth() <= 1000) {
           $('.menu-links').removeClass('active'); 
           $('.burger').removeClass('active');
        }
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-50;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    $('.profile-link').click(function(e) {
        e.preventDefault();
        if($(window).innerWidth() > 1000) {
            $('.login-menu').fadeToggle('slow');
        } else {
            $('.login-menu').toggle();
        }
        $('body').on('click', function(e) {
            var div = $('.menu-links');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                if($(window).innerWidth() > 1000) {
                    $('.login-menu').fadeOut('slow');
                } else {
                    $('.login-menu').hide();
                }
            }
        });
    });

    function OpenPopup(popupId) {
        $('body').removeClass('no-scrolling');
        $('.popup').removeClass('js-popup-show');
        popupId = '#' + popupId;
        $(popupId).addClass('js-popup-show');
        $('body').addClass('no-scrolling');
    }
    $('.pop-op').click(function (e) {
        e.preventDefault();
        let data = $(this).data('popup');
        OpenPopup(data);
    });
    function closePopup() {
        $('.js-close-popup').on('click', function (e) {
            e.preventDefault();
            $('.popup').removeClass('js-popup-show');
            $('body').removeClass('no-scrolling');
        });
    }
    closePopup();
    function clickClosePopup(popupId) {
        popupId = '#' + popupId;
        $(popupId).removeClass('js-popup-show');
        $('body').removeClass('no-scrolling');
    }

    $('.table-wrapper').scrollbar();
    $('.faq-wrap').scrollbar();

    function maskInit() {
        $(".phone-mask").inputmask({
            mask:"+7(999)999-99-99",
            "clearIncomplete": true
        });

        $(".card-mask").inputmask({
            mask:"9999-9999-9999-9999",
            "clearIncomplete": true
        });
    }
    maskInit();

    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    message: {
                        required: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                } 
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    }
    checkValidate();

    function formatState(opt) {
        if (!opt.id) {
            return opt.text;
        }

        var optimage = $(opt.element).attr('data-image');

        if (!optimage) {
            return opt.text;
        } else {
            var $opt = $(
                '<span class="select2-image"><div class="select2-image__img"><img src="' + optimage + '"/></div> ' + opt.text + '</span>');

            return $opt;
        }
    }
    if($('.select').length > 1) {
        var parent = $('select').parents('.select');
        $('select').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
    } else {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
    }
    $('.image-select select').each(function() {
        $(this).select2({
            templateResult: formatState,
            templateSelection: formatState,
            dropdownParent: $(this).closest('.image-select')
        });

    });

    $('select').on('select2:open', function() {
        $('.select2-results__options').scrollbar();
    });



    // восстановление пароля
    $('#restore-password .btn').click(function(e){
        e.preventDefault();
        if($('#restore-password form').valid()) {
            $('#restore-password .btn').addClass('disabled');
            $('.clock-text, .after-send').show();
            $('.before-send').hide();
            let dt = new Date();
            let time = dt.getFullYear() + '/' + (dt.getMonth()+1) + '/' + dt.getDate() + ' ' + dt.getHours() + ":" + (dt.getMinutes()+1) + ":" + dt.getSeconds();
            $('.clock').parent().show();
            $('.clock').countdown(time)
            .on('update.countdown', function(event) {
                $(this).html(event.strftime('%M:%S'));
            })
            .on('finish.countdown', function(event) {
                $(this).parent().hide();
                $('.after-send').hide();
                $('.before-send').show();
                $('#restore-password .btn').removeClass('disabled');
            });
        }
    });

    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
          var $this = $(this);
          var $parent = $(this).parent();
          var content = $this.next();

          if (content.is(':visible')) {
            $this.removeClass('active');
            $parent.removeClass('active');
            content.slideUp('fast');
          } else {
            $this.addClass('active');
            $parent.addClass('active');
            content.slideDown('fast');
          }

        });
    }
    openAccordion();

    $('.prize-nav').click(function(e) {
        e.preventDefault();
        var data = $(this).data('nav');
        $('.mob-prizes').hide();
        $('.'+data).show();
    });
});