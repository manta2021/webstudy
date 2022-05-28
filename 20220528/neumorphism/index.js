let keyColor = {
    hue: Number,
    saturation: Number,
    light: Number,
    opacity: Number,
}
let lightShadow = {
    hue: Number,
    saturation: Number,
    light: Number,
    opacity: Number,
}
let darkShadow = {
    hue: Number,
    saturation: Number,
    light: Number,
    opacity: Number,
}
let intensity = {
    light: 10,
    dark: 10
}
const getColor = (PROPS) => {
    const keyColor_TEMP = getComputedStyle(document.documentElement).getPropertyValue('--keycolor');
    const args = keyColor_TEMP.toString().match(/(?<=\(|\,)(.*?)(?=\,|\)|\%)/g);

    PROPS.hue = parseInt(args[0]);
    PROPS.saturation = parseInt(args[1]);
    PROPS.light = parseInt(args[2]);
    PROPS.opacity = parseInt(args[3]);
};
const isLight = () => {
    return keyColor.light > 50;
};
const isDark = () => {
    return keyColor.light < 50;
}
const setShadows = () => {
    getColor(keyColor);
    getColor(lightShadow);
    getColor(darkShadow);
    // if (isLight()) {
    //     lightShadow.light = keyColor.light + intensity.light;
    //     darkShadow.light = keyColor.light - intensity.dark;
    // } else if (isDark()) {
    //     lightShadow.light = keyColor.light + 15;
    //     darkShadow.light = keyColor.light - 5;
    // } else {
    //     {
    //         lightShadow.light = keyColor.light + 10;
    //         darkShadow.light = keyColor.light - 10;
    //     }
    // }
    lightShadow.light = keyColor.light + intensity.light;
    darkShadow.light = keyColor.light - intensity.dark;

    document.documentElement.style.setProperty('--light-shadow', `hsla(${lightShadow.hue}, ${lightShadow.saturation}%, ${lightShadow.light}%, ${lightShadow.opacity})`);
    document.documentElement.style.setProperty('--dark-shadow', `hsla(${darkShadow.hue}, ${darkShadow.saturation}%, ${darkShadow.light}%, ${darkShadow.opacity})`);

}
const setFontColor = () => {
    if (isLight()) {
        document.documentElement.style.setProperty('--font-color', `black`);
    } else {
        document.documentElement.style.setProperty('--font-color', `white`);

    }
}
const save = () => {
    const DATA = {
        keyColor, lightShadow, darkShadow, intensity
    }
    let DATAS = JSON.parse(window.localStorage.getItem('data'));
    if (DATAS == undefined) {
        DATAS = [];
    }
    DATAS.push(DATA);
    window.localStorage.setItem('data', JSON.stringify(DATAS));
}
const load = (index) => {
    let DATAS = JSON.parse(window.localStorage.getItem('data'));
    const {KEY_COLOR, LIGHT_SHADOW, DARK_SHADOW, INTENSITY} = DATAS[index];

    keyColor = KEY_COLOR;
    lightShadow = LIGHT_SHADOW;
    darkShadow = DARK_SHADOW;
    intensity = INTENSITY;
    setKeyColor();
    setFontColor();
    setShadows();
}
const setKeyColor = () => {
    document.documentElement.style.setProperty('--keycolor', `hsla(${keyColor.hue}, ${keyColor.saturation}%, ${keyColor.light}%, ${keyColor.opacity})`);
}
const changeHue = (value) => {
    getColor(keyColor);

    keyColor.hue = value;
    setKeyColor();
    setShadows();
    setFontColor();
};
const changeSat = (value) => {
    getColor(keyColor);

    keyColor.saturation = value;
    setKeyColor();
    setShadows();
    setFontColor();
};

const changeLight = (value) => {
    getColor(keyColor);

    keyColor.light = value;
    setKeyColor();
    setShadows();
    setFontColor();
};
const changeIntensityLight = (value) => {
    intensity.light = value;
    setShadows();
}
const changeIntensityDark = (value) => {
    intensity.dark = value;
    setShadows();
}

function changeShadow(clickedElement, directionX, directionY){
    const nowBoxShadow = document.querySelector('.lighting.box-shadow');
    const nowActive = document.querySelector('.lighting-blur.active');
    const clickedShadow = clickedElement.querySelector('.inset-shadow');
    const clickedActive = clickedElement.querySelector('.lighting-blur');
    if(nowBoxShadow === clickedShadow || nowActive === clickedActive) return;
    //TODO 1. box-shdow class 제거 및 inset-shadow 추가
    nowBoxShadow.classList.add('inset-shadow');
    nowBoxShadow.classList.remove('box-shadow');

    //TODO 2. active class 제거
    nowActive.classList.remove('active');

    //TODO 3. 클릭한거 inset-shadow -> box-shadow로 변경
    clickedShadow.classList.remove('inset-shadow');
    clickedShadow.classList.add('box-shadow');

    //TODO 4. active class 추가
    clickedActive.classList.add('active');

    //TODO 5. css :root 변수 변경
    document.documentElement.style.setProperty('--direction-x', `${directionX}px`);
    document.documentElement.style.setProperty('--direction-y', `${directionY}px`);
    document.documentElement.style.setProperty('--direction-x-invert', `${directionX * -1}px`);
    document.documentElement.style.setProperty('--direction-y-invert', `${directionY * -1}px`);
    document.documentElement.style.setProperty('--text-direction-x', `${directionX/2}px`);
    document.documentElement.style.setProperty('--text-direction-y', `${directionY/2}px`);
    document.documentElement.style.setProperty('--text-direction-x-invert', `${directionX * -1 /2}px`);
    document.documentElement.style.setProperty('--text-direction-y-invert', `${directionY * -1 /2}px`);
}