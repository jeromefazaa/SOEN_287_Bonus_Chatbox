const input = document.getElementById('input');
const output = document.getElementById('output');
const submit = document.getElementById('submit');
const apiURL = 'http://localhost:3000';


submit.onclick = async () => {
    const inp = input.value;
    output.textContent = 'LOADING...'
    console.log('sending request');
    const response = await fetch(`${apiURL}/question`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: inp
        })
    });
    console.log('request received on script');
    const data = await response.json();
    console.log(data);
    const out = data.output_text;
    console.log(out);
    output.textContent = out;

}