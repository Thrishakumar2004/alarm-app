let alarmTime = null;
let snoozeTimeout = null;

const alarmAudio = document.getElementById('alarm-audio');

const displayCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('current-time').innerText = `${hours}:${minutes}:${seconds}`;

    if (alarmTime && `${hours}:${minutes}` === alarmTime) {
        showAlarmButtons();
        playAlarm();
    }
};

const setAlarm = () => {
    const alarmInput = document.getElementById('alarm-time').value;
    if (alarmInput) {
        alarmTime = alarmInput;
        document.getElementById('set-alarm').innerText = 'Alarm Set';
        document.getElementById('set-alarm').disabled = true;
        document.getElementById('clear-alarm').style.display = 'inline-block';
        console.log(`Alarm set for ${alarmTime}`);
    } else {
        console.log('No alarm time set');
    }
};

const clearAlarm = () => {
    alarmTime = null;
    clearTimeout(snoozeTimeout);
    document.getElementById('alarm-time').value = '';
    document.getElementById('set-alarm').innerText = 'Set Alarm';
    document.getElementById('set-alarm').disabled = false;
    document.getElementById('clear-alarm').style.display = 'none';
    hideAlarmButtons();
    stopAlarm();
    console.log('Alarm cleared');
};

const snoozeAlarm = () => {
    hideAlarmButtons();
    stopAlarm();
    snoozeTimeout = setTimeout(() => {
        showAlarmButtons();
        playAlarm();
    }, 300000); // 5 minutes snooze
    console.log('Alarm snoozed for 5 minutes');
};

const dismissAlarm = () => {
    hideAlarmButtons();
    stopAlarm();
    clearAlarm();
    console.log('Alarm dismissed');
};

const playAlarm = () => {
    alarmAudio.currentTime = 0;
    alarmAudio.play();
    console.log('Alarm playing');
};

const stopAlarm = () => {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    console.log('Alarm stopped');
};

const showAlarmButtons = () => {
    document.getElementById('snooze').style.display = 'inline-block';
    document.getElementById('dismiss').style.display = 'inline-block';
};

const hideAlarmButtons = () => {
    document.getElementById('snooze').style.display = 'none';
    document.getElementById('dismiss').style.display = 'none';
};

const showHomeScreen = () => {
    document.getElementById('home-screen').style.display = 'block';
    document.getElementById('settings-screen').style.display = 'none';
    console.log('Switched to home screen');
};

const showSettingsScreen = () => {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('settings-screen').style.display = 'block';
    console.log('Switched to settings screen');
};

document.getElementById('set-alarm').addEventListener('click', setAlarm);
document.getElementById('clear-alarm').addEventListener('click', clearAlarm);
document.getElementById('snooze').addEventListener('click', snoozeAlarm);
document.getElementById('dismiss').addEventListener('click', dismissAlarm);
document.getElementById('home').addEventListener('click', showHomeScreen);
document.getElementById('settings').addEventListener('click', showSettingsScreen);

setInterval(displayCurrentTime, 1000);
