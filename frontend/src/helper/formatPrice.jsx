const formatPrice = (num) => {
    const formatter = new Intl.NumberFormat('vi-VI',{
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    })

    return formatter.format(num)
}

export default formatPrice