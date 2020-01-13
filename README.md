# Lahze

Lightweight package for formatting dates between jalali and gregorian. Supports both `node` and `browser` environments.
![npm](https://img.shields.io/npm/dw/lahze?label=Downloads)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/lahze)
[![install size](https://packagephobia.now.sh/badge?p=hod)](https://packagephobia.now.sh/result?p=lahze)


## Usage

### Basic usage

`lahze` can be initialized using 3 arguments: date, format of the date and locale.

After that `lahze` can manipulate and display date between locales easily.

```js
import lahze from 'lahze';

lahze('1398/10/10', 'YYYY/MM/DD', 'fa').format('YYYY/MM/DD', 'en'); // 2019/12/31
```

* Date can be on of the following items:
  1. Instance of `Date` object
  2. String with a specific format
  3. Timestamp

  **If date is not specified or null, it will be equal to today.**

* Format accepted types are as followed:
  * `YYYY`: full year (4 digits).
  * `YY`: short year (last 2 digits).
  * `MM`: full month (2 digits).
  * `M`: short month (1-2 digit).
  * `DD`: full day (2 digits).
  * `D`: short day (1-2 digits).
  * `HH`: full hours (2 digits).
  * `H`: short hours (1-2 digits).
  * `mm`: full minutes (2 digits).
  * `m`: short minutes (1-2 digits).
  * `ss`: full seconds (2 digits).
  * `s`: short seconds (1-2 digits).
  * Supported delimiters are `\`, `/`, `-`, `:`.

  **If format is not specified or null, it will be equal to whatever `Date` object accepts.**

* Locale can be either fa or en (defaults en).

After initializing `lahze` with the desired arguments, you can easily manupulate date and display it with a specific format at the end.

### Manipulating

#### Setters

##### setFullYear

This method accepts 4-digits year as the first argument and locale as it's second argument which specifies the locale of the first argument (defaults to initial locale which was specified by creating `lahze` instance).

```js
lahze('1398/10/10', 'YYYY/MM/DD', 'fa').setFullYear(1399, 'fa'); // 1399/10/10
```

##### setMonth

This method accepts month (value between 1 and 12) as the first argument and locale as it's second argument which specifies the locale of the first argument (defaults to initial locale which was specified by creating `lahze` instance).

```js
lahze('1398/10/10', 'YYYY/MM/DD', 'fa').setMonth(12, 'fa'); // 1398/12/10
```

##### setDay

This method accepts day of the month (value between 1 and 31) as the first argument and locale as it's second argument which specifies the locale of the first argument (defaults to initial locale which was specified by creating `lahze` instance).

```js
lahze('1398/10/10', 'YYYY/MM/DD', 'fa').setDay(5, 'fa'); // 1398/10/5
```

##### setHours

This method accepts hours (value between 0 and 23) as the first argument.

```js
lahze('1398/10/10 12:00:00', 'YYYY/MM/DD HH:mm:ss', 'fa').setHours(5); // 1398/10/10 5:00:00
```

##### setMinutes

This method accepts minutes (value between 0 and 59) as the first argument.

```js
lahze('1398/10/10 12:00:00', 'YYYY/MM/DD HH:mm:ss', 'fa').setHours(50); // 1398/10/10 12:50:00
```

##### setSeconds

This method accepts minutes (value between 0 and 59) as the first argument.

```js
lahze('1398/10/10 12:00:00', 'YYYY/MM/DD HH:mm:ss', 'fa').setHours(10); // 1398/10/10 12:00:10
```

#### Getters

##### getFullYear

This method returns full year (4-digits) of the `lahze` instance.

This method accepts locale as the first argument which specifies the locale of the returning value (defaults to initial locale which was specified by creating `lahze` instance).

```js
lahze('1398/10/10', 'YYYY/MM/DD', 'fa').getFullYear('en'); // 2019

lahze('1398/10/10', 'YYYY/MM/DD', 'fa').getFullYear('fa'); // 1398
```

##### getMonth

This method returns month number (1-12) of the `lahze` instance.

This method accepts locale as the first argument which specifies the locale of the returning value (defaults to initial locale which was specified by creating `lahze` instance).

```js
lahze('1398/10/10', 'YYYY/MM/DD', 'fa').getMonth('fa'); // 10

lahze('1398/10/10', 'YYYY/MM/DD', 'fa').getMonth('en'); // 12
```

##### getDay

This method returns day of the month of the `lahze` instance.

This method accepts locale as the first argument which specifies the locale of the returning value (defaults to initial locale which was specified by creating `lahze` instance).

```js
lahze('1398/10/10', 'YYYY/MM/DD', 'fa').getDay('fa'); // 10

lahze('1398/10/10', 'YYYY/MM/DD', 'fa').getDay('en'); // 31
```

##### getHours

This method returns hours of the month of the `lahze` instance.

```js
lahze('1398/10/10 12:00:00', 'YYYY/MM/DD HH:mm:ss', 'fa').getHours(); // 12
```

##### getMinutes

This method returns hours of the month of the `lahze` instance.

```js
lahze('1398/10/10 12:20:00', 'YYYY/MM/DD HH:mm:ss', 'fa').getMinutes(); // 20
```

##### getSeconds

This method returns hours of the month of the `lahze` instance.

```js
lahze('1398/10/10 12:00:50', 'YYYY/MM/DD HH:mm:ss', 'fa').getSeconds(); // 50
```

## Advanced manipulation

You can set the year, month or day in a locale and get it in the opposite locale:

```js
lahze('1398/10/10', 'YYYY/MM/DD', 'fa').setMonth(11, 'en').getMonth('fa'); // 8
```

### Display

`lahze` can return date in the given format with the desired locale:

```js
lahze('1398/10/10', 'YYYY/MM/DD', 'fa').format('YYYY/MM/DD', 'en'); // 2019/12/31
```

**Supported formats are listed above.**

## License
MIT