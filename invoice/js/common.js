document.addEventListener('DOMContentLoaded', function(){

	const choices = document.querySelectorAll('.documentData_select');

	choices.forEach(el => {
		const choice = new Choices(el, {
			itemSelectText: 'לחץ כדי לבחור',
			noResultsText: 'לא נמצאו תוצאות',
			searchEnabled: false
		})
	})

	$('.documentAdd_button_getMenu').click(function(){
		$('.documentAdd_list').slideToggle()
	})

	$('.dropDownWrapper').click(function(){
		$(this).toggleClass('active')
		$(this).find('.dropDownWrapper_list').slideToggle()
	})

	$('.documentAdd_button_main').click(function(){
		$('.modal').fadeIn().css('display', 'flex')
	})

	$('.modal_close').click(function(){
		$('.modal').fadeOut()
	})

	$('.tableInvoiceList_checkbox_head input').change(function(){
		if (this.checked) {
			$('.tableInvoiceList_checkbox input').prop('checked', true)
		} else {
			$('.tableInvoiceList_checkbox input').prop('checked', false)
		}
	})
	
})
