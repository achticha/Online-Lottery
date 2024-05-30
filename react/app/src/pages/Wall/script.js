function Script() {
    let dubaiText = document.getElementById('dubaitext');
    let burjkhalifa = document.getElementById('burjkhalifa');
    let stars = document.getElementById('stars');

    window.addEventListener('scroll', () => {
        let value = window.scroll;

        dubaiText.style.left = value * -2 + 'px';
        burjkhalifa.style.top = value * 1 + 'px';
        stars.style.top = value * 1 + 'px';
    })
    return (
        <>
        </>
    )
}
export default Script;