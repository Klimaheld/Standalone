var KlimaHeld = function () {

    function updateTooltipsFor_Info_Tags(qTipFlipped) {
        $('info[data-info]').each(function (element) {
            //console.log("infotip wird gefÃ¼llt");
            var e = $(this);
            var info = e.attr('data-info');
            //console.log("info: " + info);

            e.qtip({
                position: {
                    my: qTipFlipped ? 'top center' : 'bottom center', // Position my top left...
                    at: qTipFlipped ? 'bottom center' : 'top center', // at the bottom right of...
                    target: element, // my target
                    adjust: {
                        screen: true
                    },
                    viewport: $(window)
                },
                style: {
                    classes: 'qtip-tipsy',
                    tip: {
                        width: 1,
                        height: 1
                    }
                },
                content: {
                    text: info
                },
                hide: {
                    fixed: true
                }
            });
        });
    }

    // Javascript-File that handles the frontend calculation of the 'Gesamtbetriebskosten' page which uses the cars-total-cost-of-ownership.php template
    // It uses values that are created through the _fuel-comparison.php tempalte which is loaded before this script.
    // The loaded values are: electricCars (JSON), fossilCars(JSON), defaultDisplayCars(JSON), carLinks(JSON)  and   translations[newCar, purchase, year, years]

    //Change URL depending on current user selection =================================================================

    // takes a json string and converts it into an uri-valid string
    function encode_json(json_string) {
        return encodeURIComponent(
            json_string.replace(/[()'~_!*]/g, function (c) {
                // Replace ()'~_!* with \u0000 escape sequences
                return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
            })
                .replace(/\{/g, '(')    //    { -> (
                .replace(/\}/g, ')')    //    } -> )
                .replace(/"/g, "'")    //    " -> '
                .replace(/\:/g, '~')    //    : -> ~
                .replace(/,/g, '_')    //    , -> _
                .replace(/\[/g, '!')    //    [ -> !
                .replace(/\]/g, '*')    //    ] -> *
        );
    }

    // creates a json string from an uri-valid string representation
    function decode_json(encoded_object) {
        return decodeURIComponent(encoded_object)
            .replace(/\(/g, '{')    //    ( -> {
            .replace(/\)/g, '}')    //    ) -> }
            .replace(/'/g, '"')    //    ' -> "
            .replace(/~/g, ':')    //    ~ -> :
            .replace(/_/g, ',')    //    _ -> ,
            .replace(/\!/g, '[')    //    ! -> [
            .replace(/\*/g, ']');    //    * -> ]
    }

    // gets url-segment after the hashtag
    function get_route() {
        var route = window.location.hash.slice(1);
        return route;
    }
    // clones a javascript object (by converting it to json and back)
    function get_copy(state) {
        return JSON.parse(JSON.stringify(state));
    }
    // searches for a key=value pair in an url route, and returns the value
    function get_route_parameter(route, name) {
        var parameters = route.split('&');
        for (var i = 0; i < parameters.length; i++) {
            var pos = parameters[i].indexOf('=');
            if (pos > 0) {
                var key = parameters[i].substring(0, pos);
                if (key === name) {
                    return parameters[i].substring(pos + 1);
                }
            }
        }
        return null;
    }

    /// state management library
    ///

    // saves state into url by comparing state to default_state, and storing the difference
    // name is an optional parameter-name for the url to be more readable
    function set_state(name, state, default_state) {
        var parameter_name = (name + '') || '';

        var diff = dffptch.diff(default_state, state);
        if (Object.keys(diff).length > 0) {
            var diff_stringified = JSON.stringify(diff);
            var diff_encoded = encode_json(diff_stringified);

            var route = parameter_name !== '' ? parameter_name + '=' + diff_encoded : diff_encoded;
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + route;
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#';
        }
    }

    // loads state changes from url, and applies them to the default_state
    // name is an optional parameter-name for the url to be more readable (has to be the same for set_state and get_state)
    function get_state(name, default_state) {
        var parameter_name = (name + '') || '';
        var route = get_route();
        var encoded = null;
        if (parameter_name !== '') {
            encoded = get_route_parameter(route, name);
        } else {
            encoded = route;
        }
        if (encoded !== null) {
            var patched = get_copy(default_state);
            dffptch.patch(patched, JSON.parse(decode_json(encoded)));
            return patched;
        } else {
            return get_copy(default_state);
        }
    }

    var default_state = {
        chargingLoss: 15,
        chargingPercentage: 95,
        distance: 17000,
        electricityPriceAway: 40,
        electricityPriceHome: 12.5,
        fuelPrice: 1.65,
        moreOptions: false,
        selectedCanton: "BL",
        years: 10,
        cars: []
    };
    var current_state = {};

    //console.log('default state', default_state);


    //=============================================================================================================================================

    /// <summary>Starts knowckout.js und chart.js to compare cars</summary>
    /// <param name="electricCars" type="Object">Array of all fossil Cars the user can choose from</param>
    /// <param name="fossilCars" type="Object">Array of all fossil Cars the user can choose from</param>
    /// <param name="favoriteCarIds" type="Object">Array of the current favorite Car Ids</param>
    /// <param name="defaultCars" type="Object">Array of cars the user sees when he first loads the page</param>
    /// <param name="translations" type="Object">Array of translated terms, depending on the current language</param>
    function initialize_fuel_comparison(electricCars, fossilCars, favoriteCarIds, defaultCars, availableCantons, carLinks, translations) {
        console.log("initialize_fuel_comparison() called");


        //Reduktion der defaultCars properties damit die URL kÃ¼rzer wir din der Adressleiste
        defaultCars = defaultCars.map(function (car) {
            return {
                id: car.id,
                carName: car.carName,
                maker: car.maker,
                //picture: car.picture,
                isEditable: car.isEditable,
                //isFavorite: car.isFavorite,
                //carLink: car.carLink,
                //carColorIndex: car.carColorIndex,
                leasingCost: car.leasingCost,
                buyingCost: car.buyingCost,
                deposit: car.deposit,
                paymentType: car.paymentType,
                propulsion: car.propulsion,
                fuelConsumption: car.fuelConsumption,
                engineDisplacement: car.engineDisplacement,
                energyConsumption: car.energyConsumption,
                usesWltp: car.usesWltp,
                motorPowerAverage: car.motorPowerAverage,
                motorPowerMaximum: car.motorPowerMaximum,
                //isCalcMotorPowerAverage: car.isCalcMotorPowerAverage,
                co2Emission: car.co2Emission,
                efficiencyCategory: car.efficiencyCategory,
                weightFull: car.weightFull,
                weightEmpty: car.weightEmpty,
                //vehicleTax: car.vehicleTax,
                serviceCost: car.serviceCost,
                repairCost: car.repairCost,
                insuranceCost: car.insuranceCost
            };
        });

        default_state.cars = get_copy(defaultCars);
        current_state = get_state('configuration', default_state);

        defaultCars = get_copy(current_state.cars);

        //console.log('configuration loaded', current_state);



        //Arrays of Colors for the different lines in the graph
        var colorsElectric = [
            '#2bdcfc',
            '#005fd5',
            '#00c709',
            '#00db97',
            '#94e959',
            '#9055c4',
            '#c44292',
        ];
        var colorsFossil = [
            '#bfa25b',
            '#EDEA5F',
            '#d85656',
            'rgb(188, 108, 40)',
            'rgb(92, 57, 21)',
            '#949473'
        ];

        //CONSTRUCTOR-FUNCTION =============================================================================================================
        function Car(a) {

            var me = this;
            me.myModel = a.myModel;
            //console.log(a);

            //General Data
            me.id = ko.observable(a.id);
            me.carName = ko.observable(a.hasOwnProperty('carName') ? a.carName : translations.newCar);
            me.maker = ko.observable(a.hasOwnProperty('maker') ? a.maker : "");
            //me.picture = ko.observable(a.hasOwnProperty('picture') ? a.picture : "/klimaheld15/site/assets/files/1176/placeholder_carb.svg");

            me.picture = ko.computed(function () { return carLinks[me.id()]['urls']['picture']; });
            me.isEditable = ko.observable(a.hasOwnProperty('isEditable') ? a.isEditable : true);
            me.isFavorite = ko.computed(function () { return me.myModel.favorites().includes(me.id()); });
            me.favoriteStar = ko.computed(function () { return me.isFavorite() ? '&#9733;' : '&#9734;'; });
            me.favoriteClass = ko.computed(function () { return me.isFavorite() ? 'is_favorite' : 'not_favorite'; });
            //me.carLink = ko.observable(a.hasOwnProperty('carLink') ? a.carLink : "");
            me.carLink = ko.computed(function () { return carLinks[me.id()]['urls']['carLink']; });
            me.fullName = ko.computed(function () { return me.maker() + " " + me.carName(); });

            me.carColorIndex = ko.observable(a.hasOwnProperty('carColorIndex') ? a.carColorIndex : 0);
            me.leasingCost = ko.observable(a.hasOwnProperty('leasingCost') ? a.leasingCost : 0);
            me.buyingCost = ko.observable(a.hasOwnProperty('buyingCost') ? a.buyingCost : 0);
            me.deposit = ko.observable(a.hasOwnProperty('deposit') ? a.deposit : 0);
            me.paymentType = ko.observable(a.paymentType === 'buy' ? a.paymentType = 'buy' : a.paymentType = 'lease');

            //is Variablen fÃ¼r propulsion die 0 oder 1 sein kÃ¶nnen, jenachdem welcher radio button ausgewÃ¤hlt ist. So kann bei der Berechnung der Total Kosten einfach mit dem is wert des entsprechenden Teils multipliziert werden und nicht gwÃ¤hlte teil wird 0.  JS fiddlevorlage: http://jsfiddle.net/p8nSe/298/
            me.propulsion = ko.observable(a.propulsion === 'ecar' ? a.propulsion = 'ecar' : a.propulsion = 'fcar');
            me.fuelConsumption = ko.observable(a.hasOwnProperty('fuelConsumption') ? a.fuelConsumption : 0);
            me.engineDisplacement = ko.observable(a.hasOwnProperty('engineDisplacement') ? a.engineDisplacement : 0);
            me.energyConsumption = ko.observable(a.hasOwnProperty('energyConsumption') ? a.energyConsumption : 0);
            me.usesWltp = ko.observable(a.hasOwnProperty('usesWltp') ? a.usesWltp : false);
            me.motorPowerAverage = ko.observable(a.motorPowerAverage);
            me.motorPowerMaximum = ko.observable(a.hasOwnProperty('motorPowerMaximum') ? a.motorPowerMaximum : 0);
            me.isCalcMotorPowerAverage = a.hasOwnProperty('isCalcMotorPowerAverage') ? true : false;

            //Data to calculate the vehicleTax
            me.co2Emission = ko.observable(a.hasOwnProperty('co2Emission') ? a.co2Emission : 125);
            me.efficiencyCategory = ko.observable(a.hasOwnProperty('efficiencyCategory') ? a.efficiencyCategory : "Z");
            me.weightFull = ko.observable(a.hasOwnProperty('weightFull') ? a.weightFull : 0);
            me.weightEmpty = ko.observable(a.hasOwnProperty('weightEmpty') ? a.weightEmpty : 0);

            me.vehicleTax = ko.observable(a.hasOwnProperty('vehicleTax') ? a.vehicleTax : 0);
            me.serviceCost = ko.observable(a.hasOwnProperty('serviceCost') ? a.serviceCost : 0);
            me.repairCost = ko.observable(a.hasOwnProperty('repairCost') ? a.repairCost : 0);
            me.insuranceCost = ko.observable(a.hasOwnProperty('insuranceCost') ? a.insuranceCost : 0);


            me.toJSObject = function () {
                return {
                    id: me.id(),
                    carName: me.carName(),
                    maker: me.maker(),
                    //picture: me.picture(),
                    isEditable: me.isEditable(),
                    //carLink: me.carLink(),
                    //carColorIndex: me.carColorIndex(),
                    leasingCost: me.leasingCost(),
                    buyingCost: me.buyingCost(),
                    deposit: me.deposit(),
                    paymentType: me.paymentType(),
                    propulsion: me.propulsion(),
                    fuelConsumption: me.fuelConsumption(),
                    engineDisplacement: me.engineDisplacement(),
                    energyConsumption: me.energyConsumption(),
                    usesWltp: me.usesWltp(),
                    motorPowerAverage: me.motorPowerAverage(),
                    motorPowerMaximum: me.motorPowerMaximum(),
                    //isCalcMotorPowerAverage: me.isCalcMotorPowerAverage,
                    co2Emission: me.co2Emission(),
                    efficiencyCategory: me.efficiencyCategory(),
                    weightFull: me.weightFull(),
                    weightEmpty: me.weightEmpty(),
                    //vehicleTax: me.vehicleTax(),
                    serviceCost: me.serviceCost(),
                    repairCost: me.repairCost(),
                    insuranceCost: me.insuranceCost()
                };
            };



            //Set propulsion depending on what the user selects
            me.isElectric = ko.computed(function () {
                return me.propulsion() === "ecar";
            });
            me.isFossil = ko.computed(function () {
                return me.propulsion() === "fcar";
            });

            //choose a color from the color-array based on the index of the car
            me.carColor = ko.computed(function () {
                var colors = me.isElectric() ? colorsElectric : colorsFossil;

                return colors[me.carColorIndex() % colors.length];
            });


            //What payment will be used for the car
            me.isLease = ko.computed(function () {
                return me.paymentType() == "lease";
            });
            me.isBuy = ko.computed(function () {
                return me.paymentType() == "buy";
            });

            //Temp values for shorter calculations
            me.energyDistance = ko.computed(function () { return me.energyConsumption() * a.myModel.distance() / 100; });
            me.priceHomeChf = ko.computed(function () { return a.myModel.electricityPriceHome() / 100; });
            me.priceAwayChf = ko.computed(function () { return a.myModel.electricityPriceAway() / 100; });
            me.lossModificator = ko.computed(function () { return a.myModel.chargingLoss() / 100 + 1; });

            // Electricity price at home, in Rp/kWh
            me.chargingCostHome = ko.computed(function () { return me.energyDistance() * me.priceHomeChf() * me.lossModificator() * (a.myModel.chargingPercentage() / 100); });

            // Electricity price at quick charging stations (average), in Rp/kWh
            me.chargingCostAway = ko.computed(function () { return me.energyDistance() * me.priceAwayChf() * me.lossModificator() * ((100 - a.myModel.chargingPercentage()) / 100); });



            me.adjustAmount = ko.observable(0); //absolute amount per year
            me.adjustAmountPercentage = ko.observable(1);  //relative. value between 0 and 1. How much discount to you get
            me.adjustDuration = ko.observable(0); //how long are the bonus/maluces applicable? bonuses for 4 years and maluses forever

            //Function that computes the vehicleTax based on the selected canton
            ko.computed(function () {
                //console.log("vehicleTax vor computed: " + me.vehicleTax());
                //console.log("canton vor computed: " + a.myModel.selectedCanton());

                me.adjustAmount(0); //absolute amount per year
                me.adjustAmountPercentage(0);  //relative. value between 0 and 1. How much discount to you get
                me.adjustDuration(0); //how long are the bonus/maluces applicable? bonuses for 4 years and maluses forever
                var minVehicleTax = 0;  //minimum amount you have to pay. Even if it would be lower with the discount
                var taxBaseElectric = 0;
                var taxBaseFossil = 0;
                var tempTax = 0;
                var maxYears = 4;

                //Which Canton is it?
                switch (a.myModel.selectedCanton()) {


                    // ARGAU ======================================================
                    case "AG":
                        console.log("computed case AG");

                        me.adjustDuration(0);
                        taxBaseFossil = 5.093 / 1000;
                        taxBaseElectric = 0.1;
                        var taxHp = 0;   //taxable horse powers
                        var taxStepIncrease = 24; //CHF
                        minVehicleTax = 180; //everything up to 5ph costs 180CHF per years, after that it increases 24CHF with every Hp

                        if (me.isElectric()) {
                            //console.log("motorpoweraverage " + me.motorPowerAverage());
                            taxHp = Math.round(me.motorPowerAverage() * taxBaseElectric);
                            //console.log("taxhp: " + taxHp);
                        }
                        if (me.isFossil()) {
                            taxHp = Math.round(me.engineDisplacement() * taxBaseFossil);
                        }

                        tempTax = minVehicleTax + Math.max(taxHp - 5, 0) * taxStepIncrease;

                        me.vehicleTax(Math.round(tempTax));
                        break;


                    // BERN ======================================================
                    case "BE":
                        //console.log("computed case BE");

                        //Here we calculate the vehicleTax value based on the canton BE https://www.pom.be.ch/pom/de/index/strassenverkehr-schifffahrt/fahrzeuge/steuerrechner1.html
                        var percentageReduction = 0.14;  //Reduction of percent of tax per tonne
                        maxYears = 4;

                        if (me.isElectric()) {
                            me.adjustAmountPercentage(0.6);
                        }
                        else if (me.efficiencyCategory() == "A") {
                            me.adjustAmountPercentage(0.4);
                        }
                        else if (me.efficiencyCategory() == "B") {
                            me.adjustAmountPercentage(0.2);
                        }

                        var weight = me.weightFull();
                        var tax = 0;
                        var taxAmount = me.isFossil() ? 240 : 120;

                        while (weight > 1000) {
                            tax += taxAmount;
                            taxAmount *= (1 - percentageReduction);
                            weight -= 1000;
                        }
                        tax += taxAmount * (weight / 1000);

                        tempTax = tax;

                        set_adjustment_duration(maxYears);

                        me.vehicleTax(Math.round(tempTax));
                        break;


                    // BASELLAND ======================================================
                    case "BL":
                        //console.log("computed case BL");

                        //Here we calculate the vehicleTax value based on the canton BL
                        var taxBase = 0.277154;   //0.277154; //CHF per kg car weight
                        maxYears = 4;
                        tempTax = me.weightFull() * taxBase;


                        //Adjustments for the canton Baselland https://www.baselland.ch/politik-und-behorden/direktionen/sicherheitsdirektion/motorfahrzeugkontrolle/Motorfahrzeugsteuern/steuer/variable-motorfahrzeugsteuern
                        if (me.isFossil()) {
                            if (me.co2Emission() >= 160) me.adjustAmount(300);
                            if (me.co2Emission() < 160) me.adjustAmount(150);
                            if (me.co2Emission() < 145) me.adjustAmount(75);
                            if (me.co2Emission() < 130) me.adjustAmount(0);
                            if (me.co2Emission() < 110) {
                                me.adjustAmount(-150);

                                set_adjustment_duration(maxYears);
                            }
                        }

                        if (me.isElectric() || me.co2Emission() < 95) {
                            me.adjustAmount(-300);

                            set_adjustment_duration(maxYears);
                        }

                        //Check to make sure that the tax cannot be negative, if it is we set it to tempTax() so it cancels itself out when calculated further down in me.totalCost()
                        if (tempTax < -me.adjustAmount()) {
                            me.adjustAmount(-tempTax);
                        }

                        me.vehicleTax(Math.round(tempTax));
                        break;


                    // BASELSTADT ======================================================
                    case "BS":
                        //console.log("computed case BL");

                        //Here we calculate the vehicleTax value based on the canton BS, weightEmpty() * co2Emission()
                        var taxBaseWeight = 0.125;   //1.25 CHF per 10kg weighteEmpty()
                        var taxBaseCo2 = 1.6;  // 1.6 CHF per Gramm CO2
                        maxYears = 10;

                        if (me.isElectric()) {
                            me.adjustAmountPercentage(0.5);
                        }



                        //Rules for the canton Baselstadt http://www.polizei.bs.ch/verkehr/motorfahrzeugkontrolle/fahrzeuge/steuern/steuerrechner-2018.html
                        tempTax = me.weightEmpty() * taxBaseWeight + me.co2Emission() * taxBaseCo2;

                        set_adjustment_duration(maxYears);

                        me.vehicleTax(Math.round(tempTax));
                        break;




                    // SOLOTHURN ======================================================
                    case "SO":
                        //console.log("computed case SO");

                        me.adjustDuration(0);
                        taxBaseFossil = 5.093 / 1000;
                        taxBaseElectric = 0.1;
                        var taxIncrease = 17;

                        tempTax = 0;


                        // https://www.so.ch/fileadmin/internet/bjd/bjd-mfk/dokumente/pdf/diverse/Motorfahrzeugsteuer_im_Detail.pdf

                        //var tempVehiclesTaxTable = [
                        //    { engDispl: 600, fn: function () { return 198.5; } },
                        //    // etc.
                        //    { engDispl: 1500, fn: function () { return ko.observable(334 + Math.floor((me.engineDisplacement() - 1500) / 100) * taxIncrease); } }
                        //];

                        //const engDispl = me.engineDisplacement();
                        //var tempMax = 0; // Set lowest temp max if under 600
                        //for (var i = tempVehiclesTaxTable.length - 1; i >= 0; i--) {
                        //    if (engDispl >= tempVehiclesTaxTable[i].engDispl)
                        //        tempMax = tempVehiclesTaxTable[i].fn();
                        //}

                        var vehicleTaxTable = [
                            { key: 600, value: 198.5 },
                            { key: 699, value: 212 },
                            { key: 799, value: 224.5 },
                            { key: 899, value: 238 },
                            { key: 999, value: 251.5 },
                            { key: 1099, value: 265 },
                            { key: 1199, value: 277.5 },
                            { key: 1299, value: 291 },
                            { key: 1399, value: 304.5 },
                            { key: 1499, value: 317 }
                        ];

                        if (me.isFossil()) {

                            if (me.engineDisplacement() < 1500) {

                                tempTax = get_highest_match_in_table(vehicleTaxTable, me.engineDisplacement());
                            }
                            else {
                                //if the engineDisplacement is bigger than 1500 the taxIncrease is now linear
                                tempTax = 334 + Math.floor((me.engineDisplacement() - 1500) / 100) * taxIncrease;
                            }
                        }

                        me.vehicleTax(Math.round(tempTax));
                        break;


                    // ZÃœRICH ======================================================
                    case "ZH":
                        //console.log("computed case ZH");
                        //electric cars will not be taxed
                        tempTax = 0;
                        maxYears = 4;

                        if (me.isFossil()) {

                            //In ZÃ¼rich, 50% of the vehicleTax is based on the engineDisplacement and 50% on the totalWeight
                            var taxEngineDisplacement = 0;
                            var taxTotalWeight = 0;

                            var tableEngineDisplacement = [
                                { key: 1200, value: 69 },
                                { key: 1400, value: 88 },
                                { key: 1600, value: 108 },
                                { key: 1800, value: 128 },
                                { key: 2000, value: 148 },
                                { key: 2500, value: 208 },
                                { key: 3000, value: 358 },
                                { key: 3500, value: 508 },
                                { key: 4000, value: 958 },
                                { key: 4500, value: 808 },
                                { key: 5000, value: 958 },
                                { key: 5500, value: 1108 },
                                { key: 6000, value: 1258 },
                                { key: 7000, value: 1558 },
                                { key: 8000, value: 1858 },
                                { key: 9000, value: 2158 }
                            ];

                            var tableTotalWeight = [
                                { key: 1200, value: 50 },
                                { key: 1400, value: 70 },
                                { key: 1600, value: 100 },
                                { key: 1800, value: 130 },
                                { key: 2000, value: 160 },
                                { key: 2200, value: 190 },
                                { key: 2400, value: 310 },
                                { key: 2600, value: 430 },
                                { key: 2800, value: 550 },
                                { key: 3000, value: 670 },
                                { key: 3200, value: 790 },
                                { key: 3500, value: 930 }
                            ];

                            taxEngineDisplacement = get_highest_match_in_table(tableEngineDisplacement, me.engineDisplacement());
                            taxTotalWeight = get_highest_match_in_table(tableTotalWeight, me.weightFull());
                            //console.log("### " + me.carName());
                            //console.log('hubraum tax: ' + taxEngineDisplacement);
                            //console.log('gewicht tax:' + taxTotalWeight);

                            if (me.efficiencyCategory() == "B") // gets a 50% tax reduction in ZH for 4 years
                            {
                                //console.log("efficentyCategory: " + me.efficiencyCategory());
                                me.adjustAmountPercentage(0.5);  //relative. value between 0 and 1. How much discount you get
                                me.adjustAmount(0);
                                set_adjustment_duration(4);
                            }
                            else if (me.efficiencyCategory() == "A") // gets a 80% tax reduction in ZH for 4 years
                            {
                                me.adjustAmountPercentage(0.8);
                                me.adjustAmount(0);
                                set_adjustment_duration(4);
                            }

                            tempTax = taxEngineDisplacement + taxTotalWeight;
                        }


                        me.vehicleTax(Math.round(tempTax)); //adjustAmountPercentage will be used in the totalCost calculation
                        break;


                    // DEFAULT ======================================================
                    default:
                        //console.log("computed case default");
                        me.vehicleTax(8888);
                        console.log(me.vehicleTax());
                        break;
                }
            });



            function set_adjustment_duration(maxYears) {
                /// <summary>Sets variable adjustmentDuration to the maximum numbers of years the tax discount is applicable.</summary>
                /// <param name="maxYears" type="Object">Maximum number of years</param>
                if (a.myModel.years() > maxYears) {
                    me.adjustDuration(maxYears);
                } else {
                    me.adjustDuration(a.myModel.years());
                }
            }



            function get_highest_match_in_table(table, value) {
                /// <summary>Find highest value match in a table object, used for calculations of diffrent vehicleTaxes</summary>
                /// <param name="table" type="Object">Table of key value pairs</param>
                /// <param name="value" type="Number">The input value</param>

                console.log('searching', value);

                for (var i = 0; i < table.length; i++) {
                    if (table[i].key >= value) {
                        //console.log('found', table[i]);
                        return table[i].value;
                    }
                }

                console.log('not found, returning', table[table.length - 1]);
                return table[table.length - 1].value;
            }


            me.moreOptionsCost = ko.computed(function () { return parseInt(me.insuranceCost()) + parseInt(me.vehicleTax()) + parseInt(me.serviceCost()) + parseInt(me.repairCost()); }); //cost of all options fields combined


            //Totals
            me.fuelCost = ko.computed(function () { return a.myModel.distance() / 100 * me.fuelConsumption() * a.myModel.fuelPrice(); });
            me.chargingCost = ko.computed(function () { return (me.chargingCostHome() + me.chargingCostAway()); });

            me.costPerYear = ko.computed(function () {
                return (
                    (me.leasingCost() * 12 * me.isLease()) +
                    (me.chargingCost() * me.isElectric()) +
                    (me.fuelCost() * me.isFossil()) +
                    (me.moreOptionsCost())
                )
            }); // the last line used to be: ( a.myModel.moreOptions() * me.moreOptionsCost() )    so that the more OptionsCost were only taken into account then the checkbox was checked



            me.totalCost = ko.computed(function () {
                return (
                    (me.costPerYear() * a.myModel.years()) +

                    me.buyingCost() * me.isBuy() +

                    me.deposit() * me.isLease())

                    - me.vehicleTax() * me.adjustAmountPercentage() * me.adjustDuration()

                    + ((me.vehicleTax() < -me.adjustAmount() ? -me.vehicleTax() : me.adjustAmount()) * me.adjustDuration())
            });

            me.totalCostPerMonth = ko.computed(function () { return me.totalCost() / a.myModel.years() / 12 });

            //Copy of totalCost for the chart that calculates the total for a given number of years
            me.totalCostInYears = function (years) {
                return (
                    (me.costPerYear() * years) +

                    me.buyingCost() * me.isBuy() +

                    me.deposit() * me.isLease())

                    - me.vehicleTax() * me.adjustAmountPercentage() * Math.min(me.adjustDuration(), years)

                    + ((me.vehicleTax() < -me.adjustAmount() ? -me.vehicleTax() : me.adjustAmount()) * Math.min(me.adjustDuration(), years))
            };

            me.selectedCar = ko.observable();

            //bei auswahl eines fahrzeuges im drodown werden alle werte des bestehenden autos mit den werten des neu zu ladenen autos Ã¼berschrieben
            ko.computed(function () {
                var next = me.selectedCar();
                if (next) {
                    me.id(next.id());
                    me.carName(next.carName());
                    me.maker(next.maker());
                    //me.picture(next.picture());
                    //me.carLink(next.carLink());
                    me.leasingCost(next.leasingCost());
                    me.buyingCost(next.buyingCost());
                    me.deposit(next.deposit());
                    me.propulsion(next.propulsion());
                    me.paymentType(next.paymentType());
                    me.fuelConsumption(next.fuelConsumption());
                    me.co2Emission(next.co2Emission());
                    me.efficiencyCategory(next.efficiencyCategory());
                    me.motorPowerMaximum(next.motorPowerMaximum());
                    me.motorPowerAverage(next.motorPowerAverage());
                    me.weightFull(next.weightFull());
                    me.weightEmpty(next.weightEmpty());
                    me.energyConsumption(next.energyConsumption());
                    me.usesWltp(next.usesWltp());
                    me.insuranceCost(next.insuranceCost());
                    me.vehicleTax(next.vehicleTax());
                    me.serviceCost(next.serviceCost());
                    me.repairCost(next.repairCost());
                    me.engineDisplacement(next.engineDisplacement());

                    var image = $(".cover_image img");
                    //console.log("var vor polyfill:");
                    //console.log(image);
                    objectFitImages(image);
                    updateTooltipsFor_Info_Tags();
                }
            });


            //console.log("--XX--");
        }






        // VIEW MODEL ======================================================================================================================================================
        var ViewModel = function (initial_state) {
            var me = this;

            //General Variables
            me.moreOptions = ko.observable(initial_state.moreOptions);		    // Show more inputfields for calculations, Checkbox
            me.distance = ko.observable(initial_state.distance);	            // distance driven, in km/year
            me.years = ko.observable(initial_state.years);		            // Number of years the car will be owned/leased, in years
            me.electricityPriceHome = ko.observable(initial_state.electricityPriceHome);	// Electricity price at home in Rp/kWh
            me.electricityPriceAway = ko.observable(initial_state.electricityPriceAway);	// Average charging price when using public charging stations in Rp/kWh
            me.chargingPercentage = ko.observable(initial_state.chargingPercentage);		// How much of the charging is done at home, in percent
            me.chargingLoss = ko.observable(initial_state.chargingLoss);		    // How much of the electricity is lost during conversion (heat loss), in percent
            me.fuelPrice = ko.observable(initial_state.fuelPrice);		        // Fuel price in CHF/litre
            me.newCarCounter = 1;						    // Counter for Number of new Cars

            // Constructor for an canton-object with two properties
            var Canton = function (name, shortcut) {
                this.cantonName = name;
                this.cantonShortcut = shortcut;
            };
            me.availableCantons = availableCantons;
            me.selectedCanton = ko.observable(initial_state.selectedCanton);            //which canton should be used for computation of bonuses on the vehicleTax

            me.toJSObject = function () {
                return {
                    moreOptions: me.moreOptions(),
                    distance: me.distance(),
                    years: me.years(),
                    electricityPriceHome: me.electricityPriceHome(),
                    electricityPriceAway: me.electricityPriceAway(),
                    chargingPercentage: me.chargingPercentage(),
                    chargingLoss: me.chargingLoss(),
                    fuelPrice: me.fuelPrice(),
                    selectedCanton: me.selectedCanton(),
                    cars: me.displayCars().map(function (car) { return car.toJSObject(); })
                };
            };

            me.favorites = ko.observableArray(favoriteCarIds);

            me.toggleFavorite = function (car) {
                sessionUpdate2(car.id())
                    .done(function (newFavorites) {
                        me.favorites.removeAll();
                        newFavorites.map(function (favorite) { me.favorites.push(favorite); });
                    });
            };



            var allCars = electricCars.concat(fossilCars);

            //console.log('default cars', defaultCars);

            //Array of all Cars that can be selected from the dropdown
            me.allCars = ko.observableArray(allCars.map(function (jsonCar) {
                jsonCar.myModel = me;
                return new Car(jsonCar);
            }));
            //console.log("JS-File default cars:");
            //console.log(me.defaultCars());

            //console.log('display cars', defaultDisplayCars);


            //Array of Cars that are being displayed when the page first loads. map-function let's us add "myModel" to the object and turn it into a ko-obervable using new Car()
            //console.log("defaultDisplayCars", defaultCars);
            me.displayCars = ko.observableArray(defaultCars.filter(function (jsonCar) {
                return jsonCar !== null;
            }).map(function (jsonCar) {
                jsonCar.myModel = me;
                return new Car(jsonCar);
            }));



            //set color-indexposition for a car (it's outside the constructor, so we can call it whenever a new car is added or deleted)
            ko.computed(function () {
                me.displayCars().forEach(function (car, index) {
                    car.carColorIndex(index);
                });
            });


            //Add new car when button is clicked
            me.addCar = function () {

                me.displayCars.push(new Car({
                    carName: translations.newCar + " " + me.newCarCounter,
                    id: 0,
                    myModel: me
                })
                );

                me.newCarCounter++;

                updateTooltipsFor_Info_Tags();
            };


            //Remove Car
            me.removeCar = function (car) { me.displayCars.remove(car); };

            // find all that are not currently displayed, and replace existing cars with them, or add them
            var favoritesToAdd = favoriteCarIds.filter(function (carId) {
                var alreadyVisible = false;
                me.displayCars().forEach(function (car) {
                    if (car.id() === carId) {
                        alreadyVisible = true;
                    }
                });
                return alreadyVisible === false;
            });

            favoritesToAdd.forEach(function (favoriteId) {
                var foundCars = me.allCars().filter(function (car) { return car.id() === favoriteId; });

                if (foundCars.length > 0) {
                    var nonFavoriteDisplayCars = me.displayCars().filter(function (car) { return car.isFavorite() === false; });
                    if (nonFavoriteDisplayCars.length > 0) {
                        me.displayCars.replace(nonFavoriteDisplayCars[0], foundCars[0]);
                    } else {
                        me.displayCars.push(foundCars[0]);
                    }
                }
            });





            // Custom Knockout binding (fadeVisible) that makes elements shown/hidden via jQuery's fadeIn()/fadeOut() methods
            ko.bindingHandlers.fadeVisible = {
                init: function (element, valueAccessor) {
                    // Initially set the element to be instantly visible/hidden depending on the value
                    var value = valueAccessor();
                    $(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
                },
                update: function (element, valueAccessor) {
                    // Whenever the value subsequently changes, slowly fade the element in or out
                    var value = valueAccessor();
                    ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut();
                }
            };
        };

        var myModel = new ViewModel(current_state);

        document.myModel = myModel;

        //CHART.JS
        //==================================================================================================================================
        var ctx_element = document.getElementById('chart');
        if (ctx_element !== null) {
            var ctx = ctx_element.getContext('2d');
            Chart.defaults.global.defaultFontFamily = "'LFT_Etica', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

            //Draw white rectangle before the actual chart-canvas so the background is white, when saving the canvas as a png
            Chart.plugins.register({
                beforeDraw: function (chartInstance) {
                    var ctx = chartInstance.chart.ctx;
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
                }
            });

            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',
                // Configuration options go here
                options: {}
            });
        }



        ko.computed(function () {
            if (chart !== undefined) {
                chart.data.labels = [translations.purchase];
                for (i = 1; i <= myModel.years(); i++) {
                    chart.data.labels.push(i + ' ' + (i == 1 ? translations.year : translations.years));
                }

                //Generate chart-data for each car in the knockout view-model "myModel"
                chart.data.datasets = [];

                //forEach-function returns automatically single car as first value and it's index as second
                myModel.displayCars().forEach(function (car, index) {
                    var costData = [];
                    for (i = 0; i <= myModel.years(); i++) {
                        costData.push(Math.round(car.totalCostInYears(i)));
                    }


                    //choose a color from the array based on the position of the car
                    var colors = car.isElectric() ? colorsElectric : colorsFossil;

                    chart.data.datasets[index] = {
                        label: car.carName(),
                        borderColor: colors[index % colors.length],
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        lineTension: 0,
                        data: costData
                    };

                    //me.carColor() = colors[index % colors.length];
                });
                chart.update();
            }
            //console.log('amount of cars', myModel.cars().length);
        });


        //actually start Knockout using the viewmodel "myModel" that we defined above
        //=====================================================================0
        ko.applyBindings(myModel);




        $(document).ready(function () {

            //Number of Electric Cars in the Dropdownlist, so we can add a horizontal line between them and combustion cars via jquery
            var numberOfElectricCars = electricCars.length + 2;      // +2 for the "wÃ¤hle" option adn ---Elektroautos

            $(".car_container option:nth-child(1)").after("<option class='hyphen'>---Elektroautos:</option>");
            $(".car_container option:nth-child(" + numberOfElectricCars + ")").after("<option class='hyphen'>---Verbrennerautos---</option>");

            //console.log("test 1" );
            //console.log("test" + myModel.displayCars());
            //set_state("configuration", ko.toJS(myModel.displayCars()), defaultDisplayCars);

            ko.computed(function () {
                //console.log('default display state: ', default_state);
                //console.log('current display state: ', myModel.toJSObject());
                set_state("configuration", myModel.toJSObject(), default_state);
            });


            //console.log('default display state: ', default_state);
            //console.log('current display state: ', myModel.toJSObject());


            //Run again if user adds a new car
            $('#add_car').on('click', function () {
                $(".car_container:last-child option:nth-child(1)").after("<option class='hyphen'>---Elektroautos---</option>");
                $(".car_container:last-child option:nth-child(" + numberOfElectricCars + ")").after("<option class='hyphen'>---Verbrennerautos---</option>");
            });
        });


        updateTooltipsFor_Info_Tags();
    }
    var image = $(".cover_image img");
    objectFitImages(image);

    $(document).ready(function () {
        var content = $('#tooltip-template').html();
        $('a[data-tooltip]').each(function (element) {
            //console.log("datatooltip wird gefüllt");
            var e = $(this);
            var tooltip = e.attr('data-tooltip');
            var tooltipImage = e.attr('data-tooltip-image');
            //console.log("tooltip: " + tooltip);
            //console.log("toolimage: " + tooltipImage);

            e.qtip({
                position: {
                    my: 'bottom center',  // Position my top left...
                    at: 'top center', // at the bottom right of...
                    target: element // my target
                },
                style: {
                    classes: 'qtip_styles',
                    tip: {
                        width: 1,
                        height: 1
                    }
                },
                content: Mustache.render(content, {
                    tooltip: tooltip,
                    image: tooltipImage
                }),
            });
        });
    });


    async function init(options) {
        var html_content = await (await fetch('KlimaHeld/template.html')).text();

        options.target.innerHTML = html_content;

        Object.keys(options.settings).forEach(key => {
            var visible = options.settings[key];
            if (visible === false) {
                document.querySelector("[data-section=" + key + "]").outerHTML = '';
            }
        });


        var electricCars = await (await fetch('KlimaHeld/electricCars.json')).json();
        var fossilCars = await (await fetch('KlimaHeld/fossilCars.json')).json();
        var defaultCars = await (await fetch('KlimaHeld/defaultCars.json')).json();
        var favoriteCarIds = [];
        var availableCantons = [{ "cantonName": "Aargau", "cantonShortcut": "AG" }, { "cantonName": "Basel-Landschaft", "cantonShortcut": "BL" }, { "cantonName": "Basel-Stadt", "cantonShortcut": "BS" }, { "cantonName": "Bern", "cantonShortcut": "BE" }, { "cantonName": "Solothurn", "cantonShortcut": "SO" }, { "cantonName": "Z\u00fcrich", "cantonShortcut": "ZH" }];
        var carLinks = await (await fetch('KlimaHeld/carLinks.json')).json();


        // create translation object
        var translations = {
            newCar: 'Neues Auto',
            purchase: 'Kauf',
            year: 'Jahr',
            years: 'Jahre'
        };

        initialize_fuel_comparison(electricCars, fossilCars, favoriteCarIds, defaultCars, availableCantons, carLinks, translations);
    }

    return {
        createGraph: init
    }
}();