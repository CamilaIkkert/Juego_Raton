function displayProgressOnProgressBar(percent){
    $("#roundProgress").css("width", `${percent}%`)
    .attr("aria-valuenow", percent)
    .text(`${percent}%`);
    changeProgressBarColor(percent)
}

function displayEndScreen(pointsHandler, totalSuccessfulHits, accuracy){
    $("#pointsSummary").text(pointsHandler.pointsNumber);
    $("#roundSummary").text(pointsHandler.level);
    $("#shotsSummary").text(totalSuccessfulHits);
    $("#accuracySummary").text(`${accuracy}%`);
    $("#overlay").show();
}

function disableLifeIcon(lifeNumber){
    $(`#life${lifeNumber}`).css("filter", "grayscale(100%)");
}