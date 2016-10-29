(function() {

    $$ = init();
    var category = ["Family", "Criminal Defense", "Business", "Personal Injury", "Bankruptcy & Finances, Products & Finances", "Employment", "Real Estate", "Imigration", "Wills, Trusts & Estates", "Government", "Intellectual Property"];
    var autoComplete = ['Nowheresville, XX,0000', 'Sample, XX,1200', 'Other, XX,1200']


    function init() {
        getCategories();
        autoComplete();
        clickReview();
        autoList();
        clickCantFind();
    }

    function getCategories() {
        $("#selectCategory").on("click", function() {
            $(".autoComplete").detach();
            $(".category-wrapper").detach();
            if ($(".category-wrapper").length == 0) {
                createElementDom("<div></div>", "category-wrapper", false, "", "#category", false);
                for (var i = category.length - 1; i >= 0; i--) {
                    createElementDom("<div></div>", "list", "ctgry" + i, "", ".category-wrapper", category[i]);
                };
                clickList();
            }
        });
        $('#selectCategory').on("keydown", function() {
            return false;
        });

    }

    function populateMany() {
        for (var i = 120; i >= 0; i--) {
            createElementDom("<a></a>", "", "ctgry" + i, "", "#populateMany", "<h6>Sample" + i + "</h6>");

            createElementDom("<a></a>", "", "ctgry" + i, "", "#populateMany2", "<h6>Sample" + i + i + "</h6>");
        }
    }

    function clickList() {
        $('.category-wrapper').on('click', '.list', function(e) {
            $('#selectCategory').val($(this).text());
            $("#myModal").modal('show');
            $("#title").html($(this).text());
            $(".category-wrapper").detach();
            $(".autoComplete").detach();
        });
    }

    function autoComplete() {
    	 $("#autoComplete").on("click", function() {
 			$(".category-wrapper").detach();
    	 });
        $("#autoComplete").on("keyup", function() {
            delayKeyUp(function() {
                var query = $("#autoComplete").val();
                var found = false;
                if ($(".autoComplete")) {
                    $(".autoComplete").detach();
                }
                $(".autoComplete").detach();
               
                createElementDom("<div></div>", "autoComplete", false, "", "#auto", false);
                for (var i = autoComplete.length - 1; i >= 0; i--) {
                    var str = autoComplete[i],
                        re = new RegExp(query, 'gi'),
                        res = str.match(re);
                    if (res != null && query != "") {
                        found = true;
                        for (var i = res.length - 1; i >= 0; i--) {
                            str = str.replace(res[i], "<span class='match'>" + res[i] + "</span>");
                            console.log(str);
                        }
                        createElementDom("<div></div>", "list", "qry" + i, "", ".autoComplete", "<span>" + str + "</span>");
                    }
                }
                if (!found) {
                    $(".autoComplete").detach();
                } else {
                    autoList();
                }
            }, 500);
        });
    }

    function clickReview() {

        $('#btn-full').on('click', function(e) {
            $("#clientModal").modal('show');
        });
    }

    function clickCantFind() {
        $('#cantfind').on('click', function(e) {
            $('#otherModal').modal('show');
            populateMany();
        });
    }

    function autoList() {
        $('.autoComplete').on('click', '.list span', function(e) {
            $('#autoComplete').val($(this).text());
            $(".autoComplete").detach();
            $(".category-wrapper").detach();
        });
    }

    // Utilities

    var delayKeyUp = (function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    function createElementDom(element, className, idName, dataObject, position, text) {
        var elem = $(element);
        if (className) elem.addClass(className);
        if (idName) elem.attr("id", idName);
        if (dataObject) {
            for (var key in dataObject) {
                elem.attr("data-" + key, dataObject[key]);
            }
        }
        if (text) {
            elem.html(text);
        }
        $(position).append(elem);
        return elem;
    }




})(window);