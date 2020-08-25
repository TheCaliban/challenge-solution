$('#tax-input-income, #tax-input-status, #tax-input-child').on('input', function () {
    let taxStep = {
        45: {
            max: null,
            min: 157807
        },
        41: {
            max: 157806,
            min: 73370
        },
        30: {
            max: 73369,
            min: 25660
        },
        11: {
            max: 25659,
            min: 10065
        }
    }
    let status = (!$('#tax-input-status').prop('checked')) ? 1 : 2;
    let nbChild = ($('#tax-input-child').val() != '') ? parseInt($('#tax-input-child').val()) : 0;

    let quotientFam = status + nbChild;

    let brutIncome = parseInt($('#tax-input-income').val());
    let qfBrutIncome = brutIncome / quotientFam;
    let netIncome = 0;
    let incrementTax = 0;


    $.each(taxStep, (pourcent, limit) => {
        if (qfBrutIncome > limit.min) {
            if (qfBrutIncome > limit.max) {
                incrementTax += (limit.max - limit.min) * (pourcent / 100);
            }
            else {
                incrementTax += (qfBrutIncome - limit.min) * (pourcent / 100);
            }
        }
    });


    netIncome = qfBrutIncome - incrementTax;

    $('#tax-span-amount').html(incrementTax);
    $('#tax-span-rest').html(netIncome);


});