$('document').ready(function(){
    counter();
});


async function counter()
{
    const counter = $('#counter');
    while(counter.html() > 0)
    {
        await sleep(2000);
        counter.text(counter.html() - 1);
    }
}