const formMat = (date) => {
    const times = new Date(date)
    return (
        times.getFullYear() + '-' + (times.getMonth() + 1) + '-' + times.getDate() + ' ' + times.getHours() + ':' + times.getMinutes()
    )
}
export {formMat}