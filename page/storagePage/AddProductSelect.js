function initializeSelect2() {
    $(".mul-select").select2({
    tags: true,
    tokenSeparators: ["/", ",", ";", " "]
    });
    }
    
    // Call the function when the document is ready
    $(document).ready(initializeSelect2);