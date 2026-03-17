let eventSource, event_types;

jQuery(async () => {
    try {
        const scr = await import("../../../../script.js");
        eventSource = scr.eventSource;
        event_types = scr.event_types;
    } catch (e) { 
        alert("ОШИБКА ИМПОРТА: " + e.message);
        return; 
    }

    try {
        $("body").append(`<div id="weather-layer"></div>`);
        if (eventSource && event_types) {
            eventSource.on(event_types.MESSAGE_RECEIVED, checkWeather);
            alert("Код загрузился и ждет сообщений!");
        } else {
            alert("Скрипт загрузился, но eventSource не найден.");
        }
    } catch (e) {
        alert("ОШИБКА ВЫПОЛНЕНИЯ: " + e.message);
    }
});

function checkWeather(data) {
    if (!data || !data.mes) return;
    const text = data.mes.toLowerCase();
    const layer = $("#weather-layer");

    if (text.includes("комната") || text.includes("внутри") || text.includes("подвал")) {
        layer.removeClass().css("opacity", "0");
    } else if (text.includes("дождь") || text.includes("ливень")) {
        layer.removeClass().addClass("weather-rain");
    } else if (text.includes("снег") || text.includes("метель")) {
        layer.removeClass().addClass("weather-snow");
    } else if (text.includes("солнце") || text.includes("ясно")) {
        layer.removeClass().addClass("weather-sun");
    } else if (text.includes("туман") || text.includes("мгла")) {
        layer.removeClass().addClass("weather-fog");
    } else if (text.includes("лес") || text.includes("деревья")) {
        layer.removeClass().addClass("weather-forest");
    }
}
