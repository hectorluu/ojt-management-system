export class DataGridSharedData {
    static websites = [".com", ".gov", ".edu", ".org"];
    static emails = ["gmail.com", "yahoo.com", "twitter.com"];
    static genders = ["male", "female"];
    static maleNames = ["Kyle", "Oscar", "Ralph", "Mike", "Bill", "Frank", "Howard", "Jack", "Larry", "Pete", "Steve", "Vince", "Mark", "Alex", "Max", "Brian", "Chris", "Andrew", "Martin", "Mike", "Steve", "Glenn", "Bruce"];
    static femaleNames = ["Gina", "Irene", "Katie", "Brenda", "Casey", "Fiona", "Holly", "Kate", "Liz", "Pamela", "Nelly", "Marisa", "Monica", "Anna", "Jessica", "Sofia", "Isabella", "Margo", "Jane", "Audrey", "Sally", "Melanie", "Greta", "Aurora", "Sally"];
    static lastNames = ["Adams", "Crowley", "Ellis", "Martinez", "Irvine", "Maxwell", "Clark", "Owens", "Rooney", "Lincoln", "Thomas", "Spacey", "MOrgan", "King", "Newton", "Fitzgerald", "Holmes", "Jefferson", "Landry", "Berry", "Perez", "Spencer", "Starr", "Carter", "Edwards", "Stark", "Johnson", "Fitz", "Chief", "Blanc", "Perry", "Stone", "Williams", "Lane", "Jobs", "Adams", "Power", "Tesla"];
    static countries = ["USA", "UK", "France", "Canada", "Poland"];
    static citiesUS = ["New York", "Los Angeles", "Miami", "San Francisco", "San Diego", "Las Vegas"];
    static citiesUK = ["London", "Liverpool", "Manchester"];
    static citiesFR = ["Paris", "Marseille", "Lyon"];
    static citiesCA = ["Toronto", "Vancouver", "Montreal"];
    static citiesPL = ["Krakow", "Warsaw", "Wroclaw", "Gdansk"];
    static citiesJP = ["Tokyo", "Osaka", "Kyoto", "Yokohama"];
    static citiesGR = ["Berlin", "Bonn", "Cologne", "Munich", "Hamburg"];
    static roadSuffixes = ["Road", "Street", "Way"];
    static roadNames = ["Main", "Garden", "Broad", "Oak", "Cedar", "Park", "Pine", "Elm", "Market", "Hill"];
    static getEmployees(count) {
        if (count === undefined) {
            count = 250;
        }

        const employees = [];
        let maleCount = 0;
        let femaleCount = 0;
        for (let i = 0; i < count; i++) {
            const age = Math.round(this.getRandomNumber(20, 40));
            const gender = this.getRandomGender();
            const firstName = this.getRandomNameFirst(gender);
            const lastName = this.getRandomNameLast();
            const street = this.getRandomStreet();
            const country = this.getRandomItem(this.countries);
            const city = this.getRandomCity(country);
            const generation = Math.floor(age / 10) * 10 + "s";
            const email = firstName.toLowerCase() + "@" + this.getRandomItem(this.emails);
            const website = firstName.toLowerCase() + "-" + this.getRandomItem(this.websites);
            let photoPath;

            if (gender === "male") {
                maleCount++;
                if (maleCount > 26) {
                    maleCount = 1;
                }
                photoPath = this.getPhotoMale(maleCount);
            } else {
                femaleCount++;
                if (femaleCount > 24) {
                    femaleCount = 1;
                }
                photoPath = this.getPhotoFemale(femaleCount);
            }

            let person = {};
            person.Address = street + "," + city;
            person.Age = age;
            person.Birthday = this.getBirthday(age);
            person.City = city;
            person.Country = country;
            person.CountryFlag = this.getCountryFlag(country);
            person.Email = email;
            person.FirstName = firstName;
            person.Gender = this.getGenderPhoto(gender);
            person.Generation = generation;
            person.ID = this.pad(i + 1, 5);
            person.LastName = lastName;
            person.Name = firstName + " " + lastName;
            person.Phone = this.getRandomPhone();
            person.Photo = photoPath;
            person.Street = street;
            person.Salary = this.getRandomNumber(40, 200) * 1000;
            person.Sales = this.getRandomNumber(200, 980) * 1000;
            person.Website = website;
            person.Productivity = this.getProductivity();

            if (person.Salary < 50000) {
                person.Income = "Low";
            } else if (person.Salary < 100000) {
                person.Income = "Average";
            } else {
                person.Income = "High";
            }

            employees.push(person);
        }
        return employees;
    }

    static getProductivity(weekCount) {
        if (weekCount === undefined) {
            weekCount = 52;
        }
        const productivity = [];
        for (let w = 0; w < weekCount; w++) {
            const value = this.getRandomNumber(-50, 50);
            productivity.push({ Value: value, Week: w });
        }
        return productivity;
    }

    static getSales(count) {
        if (count === undefined) {
            count = 250;
        }

        const names = [
            "Intel CPU", "AMD CPU",
            "Intel Motherboard", "AMD Motherboard", "NVIDIA Motherboard",
            "NVIDIA GPU", "GIGABYTE GPU", "Asus GPU", "AMD GPU", "MSI GPU",
            "Corsair Memory", "Patriot Memory", "Skill Memory",
            "Samsung HDD", "WD HDD", "Seagate HDD", "Intel HDD",
            "Samsung SSD", "WD SSD", "Seagate SSD", "Intel SSD",
            "Samsung Monitor", "Asus Monitor", "LG Monitor", "HP Monitor"
        ];
        const countries = ["USA", "UK", "France", "Canada", "Poland", "Japan", "Germany"];
        const status = ["Packing", "Shipped", "Delivered"];
        const sales = [];

        for (let i = 0; i < count; i++) {
            const price = this.getRandomNumber(100, 900);
            const items = this.getRandomNumber(10, 80);
            const value = price * items;
            const margin = this.getRandomNumber(3, 10);
            const profit = Math.round((price * margin / 100) * items);
            const country = this.getRandomItem(countries);
            sales.push({
                BundlePrice: price,
                ProductPrice: price,
                Margin: margin,
                OrderDate: this.getRandomDate(new Date(2012, 0, 1), new Date()),
                OrderItems: items,
                OrderValue: value, //  Math.round(value / 1000) + "," + Math.round(value % 1000),
                ProductID: 1001 + i,
                ProductName: this.getRandomItem(names),
                Profit: profit,
                Countries: country,
                CountryFlag: this.getCountryFlag(country),
                Status: this.getRandomItem(status)
            });
        }
        return sales;
    }

    static getHouses(count) {
        if (count === undefined) {
            count = 250;
        }

        const houses = [];
        const property = ["Townhouse", "Single", "Condo", "Villa"];
        const emails = ["estates.com", "remax.com", "zillow.com", "realtor.com", "coldwell.com"];
        const countries = ["USA", "UK", "France", "Canada", "Poland", "Japan", "Germany"];

        for (let i = 0; i < count; i++) {
            const year = this.getRandomNumber(1950, 2015);
            const age = 2020 - year;

            const gender = this.getRandomGender();
            const firstName = this.getRandomNameFirst(gender);
            const lastName = this.getRandomNameLast();
            const initials = firstName.substr(0, 1).toLowerCase();
            const email = initials + lastName.toLowerCase() + "@" + this.getRandomItem(emails);

            const street = this.getRandomStreet();
            const country = this.getRandomItem(countries);
            const city = this.getRandomCity(country);

            houses.push({
                Address: street + "," + city,
                Age: age,
                Agent: firstName + " " + lastName,
                Area: this.getRandomNumber(50, 300),
                Baths: this.getRandomNumber(1, 3),
                Built: year,
                City: city,
                Country: country,
                CountryFlag: this.getCountryFlag(country),
                Email: email,
                ID: this.pad(i + 1, 5),
                Phone: this.getRandomPhone(),
                Price: this.getRandomNumber(210, 900) * 1000,
                Property: this.getRandomItem(property),
                Rooms: this.getRandomNumber(2, 5),
                SaleDate: this.getRandomDate(new Date(2015, 0, 1), new Date()),
                Street: street,
            });
        }
        return houses;
    }

    static getRandomNumber(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }

    static getRandomItem(array) {
        const index = Math.round(this.getRandomNumber(0, array.length - 1));
        return array[index];
    }

    static getRandomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    static getRandomPhone() {
        const phoneCode = this.getRandomNumber(100, 900);
        const phoneNum1 = this.getRandomNumber(100, 900);
        const phoneNum2 = this.getRandomNumber(1000, 9000);
        const phone = phoneCode + "-" + phoneNum1 + "-" + phoneNum2;
        return phone;
    }

    static getRandomGender() {
        return this.getRandomItem(this.genders);
    }

    static getRandomNameLast() {
        return this.getRandomItem(this.lastNames);
    }

    static getRandomNameFirst(gender) {
        if (gender === "male") {
            return this.getRandomItem(this.maleNames);
        } else {
            return this.getRandomItem(this.femaleNames);
        }
    }

    static getRandomCity(country) {
        if (country === "Canada") {
            return this.getRandomItem(this.citiesCA);
        } else if (country === "France") {
            return this.getRandomItem(this.citiesFR);
        } else if (country === "Poland") {
            return this.getRandomItem(this.citiesPL);
        } else if (country === "USA") {
            return this.getRandomItem(this.citiesUS);
        } else if (country === "Japan") {
            return this.getRandomItem(this.citiesJP);
        } else if (country === "Germany") {
            return this.getRandomItem(this.citiesGR);
        } else { // if (country === "United Kingdom") {
            return this.getRandomItem(this.citiesUK);
        }
    }

    static getRandomStreet() {
        const num = Math.round(this.getRandomNumber(100, 300)).toString();
        const road = this.getRandomItem(this.roadNames);
        const suffix = this.getRandomItem(this.roadSuffixes);
        return num + " " + road + " " + suffix;
    }

    static getBirthday(age) {
        const today = new Date();
        const year = today.getFullYear() - age;
        const month = this.getRandomNumber(0, 8);
        const day = this.getRandomNumber(10, 27);
        return new Date(year, month, day);
    }

    static getPhotoMale(id) {
        return 'https://static.infragistics.com/xplatform/images/people//GUY' + this.pad(id, 2) + '.png';
    }

    static getPhotoFemale(id) {
        return 'https://static.infragistics.com/xplatform/images/people/GIRL' + this.pad(id, 2) + '.png';
    }

    static getGenderPhoto(gender) {
        return 'https://static.infragistics.com/xplatform/images/genders/' + gender + '.png';
    }

    static getCountryFlag(country) {
        return 'https://static.infragistics.com/xplatform/images/flags/' + country + '.png';
    }

    static pad(num, size) {
        let s = num + "";
        while (s.length < size) {
            s = "0" + s;
        }
        return s;
    }
}