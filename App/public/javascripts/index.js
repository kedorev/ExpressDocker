$('document').ready(function(){

    $(document).on('click', '#counterBtn', function(){
        $(this).prop("disabled", true);
        counter();
    });
});


async function counter()
{
    const counter = $('#counter');
    counter.css('display','flex');
    while(counter.html() > 0)
    {
        await sleep(1000);
        counter.text(counter.html() - 1);
    }
    counter.hide();
}