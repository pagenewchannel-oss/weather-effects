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
