export {getError}

function getError(error) {
    console.log(error);
    return error.message;
}