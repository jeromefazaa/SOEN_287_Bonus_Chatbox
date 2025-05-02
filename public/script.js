const input = document.getElementById('input');
const output = document.getElementById('output');
const submit = document.getElementById('submit');
const apiURL = API_URL;

window.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey && input.value){
        e.preventDefault();
        submit.click();
    }
})

submit.onclick = async () => {
    const inp = input.value;
    output.textContent = 'LOADING...'
    const response = await fetch(`${apiURL}/question`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: inp
        })
    });
    const data = await response.json();
    const out = data.output_text;
    output.textContent = out;

}