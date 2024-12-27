export function calculateSleepTime(until: Date) {
    const targetHour = until.getHours();
    const targetMinute = 0;
    const targetSecond = 0;

    const now = new Date()
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    const targetTimeMs =
        targetHour * 3600000 + targetMinute * 60000 + targetSecond * 1000;
    const currentTimeMs =
        currentHour * 3600000 + currentMinute * 60000 + currentSecond * 1000;

    let difference = targetTimeMs - currentTimeMs;
    if (difference <= 0) {
        difference += 86400000
    }
    return difference;
}