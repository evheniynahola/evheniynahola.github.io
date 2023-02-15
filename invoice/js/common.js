document.addEventListener('DOMContentLoaded', function(){

	const choices = document.querySelectorAll('.documentData_select');
	const choicesCode = document.querySelectorAll('.documentData_selectCode');

	let checker = false;
	let checkerImport = false;

	choices.forEach(el => {
		const choice = new Choices(el, {
			itemSelectText: '',
			noResultsText: 'לא נמצאו תוצאות',
			searchEnabled: false
		})
	})

	choicesCode.forEach(el => {
		const choice = new Choices(el, {
			itemSelectText: '',
			noResultsText: 'לא נמצאו תוצאות',
			searchEnabled: false,
		})
	})

	$('.customSelect').on('click', function(){
		$(this).parent().siblings('.customSelect_list').addClass('active')
	})

	$('.customSelect_list li').on('click', function(){
		let val = $(this).attr('data-value');
		$(this).parent().siblings('.customSelect_label').find($('.customSelect')).val(val)
	})

	$(document).on('mouseup', function (e){
		var getSelect = $(".customSelect");
		if (!getSelect.is(e.target)
		    && getSelect.has(e.target).length === 0) {
				getSelect.parent().siblings('.customSelect_list').removeClass('active')
		}
     });

	$('.documentAdd_button_getMenu').each(function(){
		let ths = $(this);
		ths.on('click', function(){
			$('.documentAdd_list').not(ths.siblings('.documentAdd_list')).slideUp();
			ths.siblings('.documentAdd_list').toggleClass('active').slideToggle();
			ths.toggleClass('active')
		})
	})

	$(document).on('mouseup', function (e){
		var getMenu = $(".documentAdd_button_getMenu");
		if (!getMenu.is(e.target)
		    && getMenu.has(e.target).length === 0) {
				getMenu.siblings('.documentAdd_list').removeClass('active').slideUp()
				getMenu.removeClass('active')
		}
     });

	

	$('.dropDownWrapper').on('click', function(){
		$(this).toggleClass('active');
		$(this).find('.dropDownWrapper_list').slideToggle();
	})

	$('.documentAdd_cardCharge').on('click', function(){
		$('.modal_info').fadeIn().css('display', 'flex');
	})

	$('.documentButton_copy').on('click', function(){
		$('.documentsCopyList').fadeIn().css('display', 'flex');
	})

	$('.documentButton_import').on('click', function(){
		$('.documentsImportList').fadeIn().css('display', 'flex');
	})

	$('.modal_close').on('click',function(){
		$('.modal').fadeOut();
	})

	$(document).on('mouseup', function (e){
		var modal = $(".modal_body");
		if (!modal.is(e.target)
		    && modal.has(e.target).length === 0) { 
				$('.modal').fadeOut();
		}
     });

	$('.tableImportList .tableDocumentImports_checkbox input').on('change', function(){
		$(this).closest('tr').toggleClass('tableDocumentImports_activeItem')
	})

	$('.tableInvoiceList_checkbox_head input').on('change', function(){
		if (this.checked) {
			$('.tableInvoiceList_checkbox input').prop('checked', true);
		} else {
			$('.tableInvoiceList_checkbox input').prop('checked', false);
		}
	})

	$('.tableInvoiceList_checkbox input').on('change', function(){
		$('.tableInvoiceList_checkbox input').each(function(){
			if (this.checked) {
				checker = true;
				return false;
			} else {
				checker = false;
			}
		})

		if (checker == false) {
			$('.mainContent_interfaceList li').removeClass('active');
		} else {
			$('.mainContent_interfaceList li').addClass('active');
		}

	})

	$('.tableImportList .tableDocumentImports_checkbox input').on('change', function(){
		$('.tableImportList .tableDocumentImports_checkbox input').each(function(){
			if (this.checked) {
				checkerImport = true;
				return false;
			} else {
				checkerImport = false;
			}
		})

		if (checkerImport == false) {
			$('.documentsImport_description').removeClass('active');
			$('.documentsImport_buttonWrapper').removeClass('active');
		} else {
			$('.documentsImport_description').addClass('active');
			$('.documentsImport_buttonWrapper').addClass('active');
		}

	})

	$('.documentButton_addData').on('click', function(){
		$('#tableTemplates .orderData_tablePayment_tpl').clone(true).appendTo($('.orderData_tablePayment_container'));
	})

	$('.documentButton_addItem').on('click', function(e){
		e.preventDefault();
		$('#tableTemplates .orderData_table_rowTpl').clone(true).appendTo($('.orderData_table_container'));
		$('.orderData_table_container').addClass('orderData_table_container_expand')
	})

	$('.orderData_tablePayment_tpl_remove').on('click', function(){
		$(this).closest('tr').remove();
		if ($('.orderData_table_container tr').length <= 1) {
			$('.orderData_table_container').removeClass('orderData_table_container_expand')
		}
	})

	$('.orderData_panel input').on('focusin', function(){
		$('.orderData_panel input').each(function(){
			$(this).closest('.orderData_panel').addClass('orderData_panel_focus');
			$(this).closest('.orderData_panel').removeClass('orderData_panel_dataIn');
		})
	})

	$('.orderData_panel input').on('focusout', function(){
		$('.orderData_panel input').each(function(){
			let ths = $(this)
			if ( $(this).val().length != 0 ) {
				$(this).closest('.orderData_panel').addClass('orderData_panel_dataIn');
				$(this).closest('.orderData_panel').removeClass('orderData_panel_focus');
				$('.documentSidebar_checklistProp li').each(function(){
					if(ths.attr('data-type') == $(this).attr('data-type')) {
						$(this).addClass('documentData_active');
					}
				})
			} else {
				$(this).closest('.orderData_panel').removeClass('orderData_panel_dataIn');
				$(this).closest('.orderData_panel').removeClass('orderData_panel_focus');
				$('.documentSidebar_checklistProp li').each(function(){
					if(ths.attr('data-type') == $(this).attr('data-type')) {
						$(this).removeClass('documentData_active');
					}
				})
			}
			$(this).closest('.orderData_panel').removeClass('orderData_panel_focus')
		})
	})

	$('.orderData_panel_dateInput').on('change', function(){
		$('.orderData_panel_dateActive').text($(this).val())
	})

	$('input[data-type="dataPayment"]').on('focusin', function(){
		$(this).parents('tr').find($('input[data-type="dataPayment"]')).removeClass('dataIn');
	})

	$('input[data-type="dataPayment"]').on('focusout', function(){
		$('input[data-type="dataPayment"]').each(function(){
			if ( $(this).val().length != 0 ) {
			$(this).addClass('dataIn');
		} else {
			$(this).removeClass('dataIn');
		}
		})	
	})

	$('.mainSidebar_menuButton').on('click', function(){
		$('.sidebarMin').toggleClass('sidebarMin-col')
		$('.mainContent_sidebar').toggleClass('hidden');
	})

	$('.userNotifications_group').on('click', function(){
		$('.userNotifications_listWrapper').fadeToggle();
		$(this).toggleClass('is-open')
	})

	$(document).on('mouseup', function (e){
		var notify = $(".userNotifications_group");
		if (!notify.is(e.target)
		    && notify.has(e.target).length === 0) {
				$('.userNotifications_listWrapper').fadeOut();
				notify.removeClass('is-open');
		}
     });

	 $('.documentBlock_orderInfo_documentDate').on('focus', function(){
		$(this).val('');
	 })

	 $('.tableInvoiceList_seeMore').on('click', function(){
		$(this).toggleClass('seeMore_active');
		$(this).find('.toolTip').fadeToggle();
	 })

	 $(document).on('mouseup', function (e){
		var seeMore = $(".tableInvoiceList_seeMore");
		if (!seeMore.is(e.target)
		    && seeMore.has(e.target).length === 0) {
				seeMore.removeClass('seeMore_active');
				seeMore.find('.toolTip').fadeOut();
		}
     });

	  $('.mainContent_clientPage_tabList').each(function(i) {
		var storage = localStorage.getItem('tab' + i);
		if (storage) {
		  $(this).find('li').removeClass('active').eq(storage).addClass('active')

		  $(".mainContent_clientPage_tabBody").find(".mainContent_clientPage_tabItem").removeClass('active').eq(storage).addClass('active');
		}
	  });
   
	  $('.mainContent_clientPage_tabList').on('click', 'li:not(.active)', function() {
		$(this)
		.addClass('active').siblings().removeClass('active')

		$(".mainContent_clientPage_tabBody").find(".mainContent_clientPage_tabItem").removeClass('active').eq($(this).index()).addClass('active');
		var ulIndex = $('.mainContent_clientPage_tabList').index($(this).parents('.mainContent_clientPage_tabList'));
		localStorage.removeItem('tab' + ulIndex);
		localStorage.setItem('tab' + ulIndex, $(this).index());
	  });

	  
	  var animation = bodymovin.loadAnimation({
		container: document.querySelector('.dataPanel_lottie'), // Required
		path: './img/media/graph_edit.json', // Required
		renderer: 'svg', // Required
		loop: false, // Optional
		autoplay: true, // Optional
	  })

	  animation.addEventListener('complete', function(){
		$('.dataPanel_lottie').addClass('unactive')
		$('.dataPanel_lottieGraph').addClass('active')
	  })


	  //match height

	  let matchHeight = $('.dataPanel_lottieGraph').height();
	  

	  $('.dataPanel_tableWrapper').height(matchHeight);


	  $('.dataPanel_buttonAllDocuments').on('click', function(e){
		e.preventDefault();
		$(".mainContent_clientPage_tabBody").find(".mainContent_clientPage_tabItem").removeClass('active');
		$(".mainContent_clientPage_tabItem").eq(1).addClass('active');
		$('.mainContent_clientPage_tabList li').removeClass('active');
		$('.mainContent_clientPage_tabList li').eq(1).addClass('active');
	  })
	  
	
})
