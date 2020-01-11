# Lahze

Lightweight package for formatting dates between jalali and gregorian.

## Usage

```javascript
import lahze from 'lahze';

lahze('1398/10/10', 'YYYY/MM/DD', 'fa').format('YYYY/MM/DD', 'en'); // 2019/12/31
```

```javascript
import lahze from 'lahze';

const l = lahze('1398/10/10', 'YYYY/MM/DD', 'fa');
l.setMonth(l.date.getMonth() + 1);
l.format('YYYY/MM/DD', 'en'); // 2020/01/31
```