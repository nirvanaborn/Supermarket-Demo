export function handleDate(date, num) {
    let flag = false;
    let y = parseInt(date.split("-")[0]);
    let m = parseInt(date.split("-")[1]);
    let d = parseInt(date.split("-")[2]);
    let nowDate = new Date();
    let year = parseInt(nowDate.getFullYear());
    let month = parseInt(nowDate.getMonth() + 1);
    let day = parseInt(nowDate.getDate());
    let n = parseInt(num);
    let unit = num.replace(n, "");
    if (unit == "years") {
        y = y + n;
    }
    if (unit == "months") {
        m = m + n;
        if (m > 12) {
            m = m - 12;
            y = y + 1;
        }
    }
    let feb = 28;
    if (unit == "days") {
        d = d + n;
        if (
            m == 1 ||
            m == 3 ||
            m == 5 ||
            m == 7 ||
            m == 8 ||
            m == 10 ||
            m == 12
        ) {
            let md = 31;
            if (d > md) {
                m = m + 1;
                d = d - md;
            }
        } else if (m != 2) {
            let md = 30;
            if (d > md) {
                m = m + 1;
                d = d - md;
            }
        }
        if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) {
            feb = 29;
            if (m == 2) {
                if (d > feb) {
                    m = m + 1;
                    d = d - feb;
                }
            }
        } else {
            feb = 28;
            if (m == 2) {
                if (d > feb) {
                    m = m + 1;
                    d = d - feb;
                }
            }
        }
    }
    if (y < year) {
        flag = false;
    } else if (y > year) {
        flag = !flag;
    } else {
        if (m < month) {
            flag = false;
        } else if (m > month) {
            flag = !flag;
        } else {
            if (d < day) {
                flag = false;
            } else if (d > day) {
                flag = !flag;
            } else {
                return "今天过期";
            }
        }
    }
    if (flag) {
        return "没过期";
    } else {
        return "已过期";
    }
}