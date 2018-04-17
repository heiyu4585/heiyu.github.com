async function output() {
    let result = await content().catch(err=>{
        console.log(err)
    });
    console.log('++', result);
}

function content() {
    let bool = false;
    return new Promise((resolve, reject) => {
        if (bool) {
            resolve(1)
        }
        else {
            reject(2);
        }


    });
}

output();