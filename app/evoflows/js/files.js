let loadFile = true;
let selectedFile;
let isSelectedFileValid = false;


function verifyFile (file) {
    if (file != null) {
        return true;
    }
    return false;
}

//listener of the fileElem input
function handleFiles(files) {
    selectedFile = files[0];
    isSelectedFileValid = verifyFile(selectedFile);

    if (isSelectedFileValid) {
        console.log('AQUI CARGAR');
        var reader = new FileReader();
        // Read in the file as a DATA URL.
        reader.readAsDataURL(selectedFile);
        // Wait to reader.result finish 
        reader.onload = function(event) {
            load_d3(reader.result);
        }; 
    } else {
        alert("error");
    }
}       