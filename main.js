(function () {

    const localTime = document.getElementById('local-time');
    const clSec = localTime.getElementsByTagName('circle')[0];
    const clMin = localTime.getElementsByTagName('circle')[1];
    const clHr = localTime.getElementsByTagName('circle')[2];

    const handSec = localTime.getElementsByTagName('line')[0];
    const handMin = localTime.getElementsByTagName('line')[1];
    const handHr = localTime.getElementsByTagName('line')[2];

    const DATE = localTime.getElementsByTagName('text')[0];
    const DAY = localTime.getElementsByTagName('text')[1];

    setInterval(drawClock, 1000);
    fillArc(clSec, clMin, clHr);

    function drawClock() {
        let date = new Date();
        let sc = date.getSeconds();
        let mn = date.getMinutes();
        let hr = date.getHours();
        hr = hr % 12;

        let today = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let day = date.getDay();

        drawArc(sc, mn, hr, clSec, clMin, clHr);
        drawNodes(sc, mn, hr, handSec, handMin, handHr);
        dayAndDate(today, month, year, day, DATE, DAY);
    }

    function dayAndDate(today, month, year, day, longDate, fullDay) {
        switch (day) {
            case 0:
                day = 'Sunday';
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday"
                break;
            case 4:
                day = "Thursday"
                break;
            case 5:
                day = "Friday"
                break;
            case 6:
                day = "Saturday"
                break;
        }

        switch (month) {
            case 0:
                month = 'January';
                break;
            case 1:
                month = 'February';
                break;
            case 2:
                month = 'March';
                break;
            case 3:
                month = 'April';
                break;
            case 4:
                month = 'May';
                break;
            case 5:
                month = 'june';
                break;
            case 6:
                month = 'Jully';
                break;
            case 7:
                month = 'Augest';
                break;
            case 8:
                month = 'September';
                break;
            case 9:
                month = 'october';
                break;
            case 10:
                month = 'November';
                break;
            case 11:
                month = 'December';
                break;
        }
        longDate.innerHTML = `${today} ${month} ${year}`;
        fullDay.innerHTML = `${day}`;
    }

    function fillArc(sec, min, hr) {
        const secRadius = sec.getAttributeNode('r').value;
        const minRadius = min.getAttributeNode('r').value;
        const hrRadius = hr.getAttributeNode('r').value;

        const secStrokeDashArray = 2 * Math.PI * secRadius;
        const minStrokeDashArray = 2 * Math.PI * minRadius;
        const hrStrokeDashArray = 2 * Math.PI * hrRadius;

        sec.setAttribute('stroke-dasharray', secStrokeDashArray);
        min.setAttribute('stroke-dasharray', minStrokeDashArray);
        hr.setAttribute('stroke-dasharray', hrStrokeDashArray);
    }

    function drawArc(sc, mn, hr, secArc, minArc, hrArc) {
        let secDashVal = secArc.getAttributeNode('stroke-dasharray');
        let minDashVal = minArc.getAttributeNode('stroke-dasharray');
        let hrDashVal = hrArc.getAttributeNode('stroke-dasharray');

        let setSecDash = secDashVal.value / 60;
        let newSecDashVal = secDashVal.value - setSecDash * sc;

        let setMinDash = minDashVal.value / 60;
        let newMinDashVal = minDashVal.value - setMinDash * mn;

        let setHrDash = hrDashVal.value / 12;
        let newHrDashVal = hrDashVal.value - setHrDash * (hr + mn / 60);

        secArc.setAttribute('stroke-dashoffset', newSecDashVal);
        minArc.setAttribute('stroke-dashoffset', newMinDashVal);
        hrArc.setAttribute('stroke-dashoffset', newHrDashVal);
    }

    function drawNodes(sc, mn, hr, secLine, minLine, hrLine) {
        const ang = 360 / 60;
        const hrAng = 360 / 12;

        let secondAngle = ang * sc;
        let minutAngle = ang * mn;
        let hourAngle = hrAng * (hr + mn / 60);

        secLine.setAttribute('transform', `rotate(${secondAngle}, 200, 200)`);
        minLine.setAttribute('transform', `rotate(${minutAngle}, 200, 200)`);
        hrLine.setAttribute('transform', `rotate(${hourAngle}, 200, 200)`);
    }

})();