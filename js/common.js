$(function(){
	
	var context = $(document).find('section');

	$('.menu-trigger').on('click', function(){
		$('.navbar').toggleClass('show-menu');

		var icon = $(this).find('i');
		if($('.navbar').hasClass('show-menu')){
			icon.removeClass('fa-navicon').addClass('fa-close');
		}
		else {
			icon.removeClass('fa-close').addClass('fa-navicon');
		}
	});

	setCarouselImageHeight(context);

	var sendEmail = function (e) {
		e.preventDefault();
		var form = $('#sendEmailForm');
		var formData = form.serialize();

		$.ajax({
			type: 'POST',
			url: 'mailer.php',
			data: formData
		})
		.done(function(response) {
			var status = {
				message: response,
				code: "success"
			};
			form.find('input,textarea').val('');
			showStatusMessageBox(status);
		})
		.fail(function(error) {
			error.code = "error";
			var status = error;
			showStatusMessageBox(status);
		});

		function showStatusMessageBox(status) {
			var messageBox = form.find('.alert');

			if(status.code === 'success') {
				messageBox.removeClass('alert-danger').addClass('alert-success').show();
				messageBox.find('span').html(status.message);
			}
			else {
				messageBox.removeClass('alert-success').addClass('alert-danger').show();
				messageBox.find('span').html(status.responseText);
			}
			messageBox.find('.fa-close').on('click', function(){
				messageBox.hide();
			});
		}
	}

	$('#sendEmailBtn').on('click', sendEmail);

	$(window).on('resize', setCarouselImageHeight);

	if($(window).width() < 768){
		$('.navbar-header').addClass('hidden');
		$('.menu-trigger').on('click', function(){
			$('.navbar-toggle').trigger('click');
		});
	}

	if($(window).width() > 768){
		$('.navbar').addClass('show-menu');
		$('.menu-trigger').find('i').removeClass('fa-navicon').addClass('fa-close');
		// Hide Header on on scroll down
		var didScroll;
		var lastScrollTop = 0;
		var delta = 5;
		var navbarHeight = $('.navbar').outerHeight();

		$(window).scroll(function(event){
		    didScroll = true;
		});

		setInterval(function() {
		    if (didScroll) {
		        hasScrolled();
		        didScroll = false;
		    }
		}, 250);

		function hasScrolled() {
		    var st = $(this).scrollTop();
		    
		    // Make sure they scroll more than delta
		    if(Math.abs(lastScrollTop - st) <= delta)
		        return;
		    
		    // If they scrolled down and are past the navbar, add class .nav-up.
		    // This is necessary so you never see what is "behind" the navbar.
			var icon = $('.menu-trigger').find('i');
		    if (st > lastScrollTop && st > navbarHeight){
		        // Scroll Down
		        $('.navbar').removeClass('show-menu');
				icon.removeClass('fa-close').addClass('fa-navicon');
		    } else {
		        // Scroll Up
		        if(st + $(window).height() < $(document).height()) {
		            $('.navbar').addClass('show-menu');
					icon.removeClass('fa-navicon').addClass('fa-close');
		        }
		    }
		    
		    lastScrollTop = st;
		}
	}

});

function setCarouselImageHeight(context) {
	$('.full-slider').css({'height': $(window).height(), 'width':'100%'});
}


