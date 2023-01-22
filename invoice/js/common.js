document.addEventListener('DOMContentLoaded', function(){

	const choices = document.querySelectorAll('.documentData_select');

	let checker = false;
	let checkerImport = false;

	choices.forEach(el => {
		const choice = new Choices(el, {
			itemSelectText: '',
			noResultsText: 'לא נמצאו תוצאות',
			searchEnabled: false
		})
	})

	$('.documentAdd_button_getMenu').each(function(){
		let ths = $(this);
		
		ths.on('click', function(){
			$('.documentAdd_list').not(ths.siblings('.documentAdd_list')).slideUp();
			ths.siblings('.documentAdd_list').toggleClass('active').slideToggle();
		})
		
	})

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
		$(this).closest('.orderData_panel').addClass('orderData_panel_focus');
		$(this).closest('.orderData_panel').removeClass('orderData_panel_dataIn');
	})

	$('.orderData_panel input').on('focusout', function(){
		if ( $(this).val().length != 0 ) {
			$(this).closest('.orderData_panel').addClass('orderData_panel_dataIn');
			$(this).closest('.orderData_panel').removeClass('orderData_panel_focus');
		} else {
			$(this).closest('.orderData_panel').removeClass('orderData_panel_dataIn');
			$(this).closest('.orderData_panel').removeClass('orderData_panel_focus');
		}
		$(this).closest('.orderData_panel').removeClass('orderData_panel_focus')
	})

	$('input[data-type="dataPayment"]').on('focusin', function(){
			$(this).removeClass('dataIn');
	})

	$('input[data-type="dataPayment"]').on('focusout', function(){
		if ( $(this).val().length != 0 ) {
			$(this).addClass('dataIn');
		} else {
			$(this).removeClass('dataIn');
		}
	})

	$('.mainSidebar_menuButton').on('click', function(){
		$('.sidebarMin').toggleClass('sidebarMin-col')
		$('.mainContent_sidebar').toggleClass('hidden');
	})

	$('.userNotifications_group').on('click', function(){
		$('.userNotifications_listWrapper').fadeToggle();
	})
	
})
