// 'use strict'; // FF error with use strict on ==> SyntaxError: in strict mode code, functions may be declared only at top level or immediately within another function
var win = window;
win.methods_js = {
    // args here are the substrings passed in
    'build': {
        // insert the provided substring at the provided index
        'insert': function(string, args) {
            var substr = args[1],
                index = args[2];
            return (string.substr(0, index) + substr + string.substr(index));
        },
        // join the provided substrings with the current string
        'join': function(string, args) {
            for (var i = 1, l = args.length; i < l; i++) string += args[i];
            return string;
        },
        // at the provided substrings to the start of the current string
        'prepend': function(string, args) {
            for (var i = 1, l = args.length; i < l; i++) string = args[i] + string;
            return string;
        },
        // wrap the current string with the provided left and/or right substrings
        'wrap': function(string, args) {
            // wraps the string with a left and/or right string
            return (args[1] || '') + string + (args[2] || '');
        }
    },

    'clear': {
        'html': function(string) {
            // a = string.str_trim_left(a);
            // a = string.str_trim_right(a);
            return string.trim().replace(/\>[\s\xa0]+\</g, '><').replace(/[\s\xa0]+\>/g, '>') // <div id='main'  > => <div id='mane'>
                .replace(/\<[\s\xa0]+/g, '<') // <     div id='main'> => <div id='mane'>
                .replace(/\<\/[\s\xa0]+/g, '</'); // dfsdfsd</   div>' => dfsdfsd</div>'
        },
        'space': function(string) {
            // http://stringjs.com
            // http://www.javascripter.net/faq/regularexpressionsyntax.htm
            return string.replace(/[\s\xa0]+/g, ' ').trim(); //.replace(/^\s+|\s+$/g, '')
        }
    },
    'convert': {
        'num::range': function(string) {

            var parts = string.split('::'),
                start = +parts[0],
                end = +parts[1],
                range = '';
            for (var i = start, l = end + 1; i < l; i++) range = range + i + ',';
            return range.str_chomp('!right', ',');
        },
        // *binary:2
        // octal:8
        // *decimal:10
        // hexadecimal:16
        'bin::oct': function(string) {
            // given 'number' must be a string.. just make sure
            string += '';
            // must only contain 1 and 0s and/or a single dot
            if (!string.str_is('!binary')) return NaN;
            // get the number pars
            var parts = string.str_split('!num', true),
                number = parts[0] || '0',
                decimal = parts[1] || '0',
                is_negative = parts[2];
            var f = function(num, pad_dir, is_number, dec, is_neg) {
                // make sure the string is a multiple of three
                // http://stackoverflow.com/questions/3254047/round-number-up-to-the-nearest-multiple-of-3
                // seprate into groups of three
                var len = num.length;
                if (len % 3 !== 0) {
                    // we need to padd the num
                    var pad_count = (Math.ceil(len / 3.0) * 3) - len;
                    num = num.str_pad(pad_dir, pad_count, '0');
                }
                // chop the num into chunks of 3 chars
                var groups = num.str_split('!chunk', 3);
                // loop through each finding its octal equivalent
                var octal_equivalents = ["000", "001", "010", "011", "100", "101", "110", "111"],
                    final_oct = [];
                for (var i = 0, l = groups.length; i < l; i++) {
                    // https://www.youtube.com/watch?v=W_NpD248CdE
                    final_oct.push('' + octal_equivalents.indexOf(groups[i]));
                }
                if (!is_number) { // the decimal
                    var decimal_part = final_oct.join('');
                    return (decimal_part.str_replace('!all', {
                        '0': ''
                    }) === '') ? '0' : decimal_part.str_replace('!right', '0', '');
                } else { // for the decimal; is_number===true
                    var number_part = final_oct.join('').str_replace('!left', '0', ''),
                        sign = (((number_part === '' && dec !== '0') || is_neg) ? '-' : ''),
                        seperator = (dec === '0' ? '' : '.');

                    var final_num = sign.str_build('!join', (number_part === '' ? '0' : number_part), seperator, (dec === '0' ? '' : dec));
                    return ((final_num === '' || final_num === '-0') ? '0' : final_num);
                }
            };
            return number = f(number, '!left', true, decimal = f(decimal, '!right', false) /*the decimal*/ , is_negative);
        },
        'bin::dec': function(string) {
            // given 'number' must be a string.. just make sure
            string += '';
            // must only contain 1 and 0s and/or a single dot
            if (!string.str_is('!binary')) return NaN;
            // get the number parts
            var parts = string.str_split('!num', true),
                number = parts[0],
                decimal = parts[1],
                is_negative = parts[2];
            var f = function(num, is_number, dec, is_neg) {
                num = num.split('');
                var sum = 0;
                if (is_number) {
                    var pow = num.length - 1;
                    for (var i = 0, l = num.length; i < l; i++) {
                        // starts from the right at 0, goes to the left
                        if (num[i] === '1') sum += Math.pow(2, pow);
                        pow--;
                    }
                    num = sum + '';
                } else { // the decimal
                    var pow = 1;
                    for (var i = 0, l = num.length; i < l; i++) {
                        if (num[i] === '1') {
                            // starting from the left with -1, goes to the right
                            // https://www.youtube.com/watch?v=cQD3KRPOKNI
                            sum += Math.pow(2, -pow);
                        }
                        pow++;
                    }
                    // remove the leading 0
                    num = ((sum + '').str_chomp('!left', '0.'));
                }
                if (!is_number) { // the decimal
                    var decimal_part = num;
                    return (decimal_part.str_replace('!all', {
                        '0': ''
                    }) === '') ? '0' : decimal_part.str_replace('!right', '0', '');
                } else { // for the decimal; is_number===true
                    var number_part = num.str_replace('!left', '0', ''),
                        sign = (((number_part === '' && dec !== '0') || is_neg) ? '-' : ''),
                        seperator = (dec === '0' ? '' : '.');

                    var final_num = sign.str_build('!join', (number_part === '' ? '0' : number_part), seperator, (dec === '0' ? '' : dec));
                    return ((final_num === '' || final_num === '-0') ? '0' : final_num);
                }
            };
            return number = f(number, true, decimal = f(decimal, false) /*the decimal*/ , is_negative);
        },
        'bin::hex': function(string) {
            // given 'number' must be a string.. just make sure
            string += '';
            // must only contain 1 and 0s and/or a single dot
            if (!string.str_is('!binary')) return NaN;
            // get the number pars
            var parts = string.str_split('!num', true),
                number = parts[0],
                decimal = parts[1],
                is_negative = parts[2];
            var f = function(num, pad_dir, is_number, dec, is_neg) {
                // make sure the string is a multiple of three
                // http://stackoverflow.com/questions/3254047/round-number-up-to-the-nearest-multiple-of-3
                // seprate into groups of three
                var len = num.length;
                if (len % 4 !== 0) {
                    // we need to padd the num
                    var pad_count = (Math.ceil(len / 4.0) * 4) - len;
                    num = num.str_pad(pad_dir, pad_count, '0');
                }
                // chop the num into chunks of 3 chars
                var groups = num.str_split('!chunk', 4);
                // loop through each finding its octal equivalent
                var hex_list = '0123456789ABCDEF',
                    final_hex = [];
                for (var i = 0, l = groups.length; i < l; i++) {
                    // https://www.youtube.com/watch?v=W_NpD248CdE
                    var sum_inner = 0,
                        pow_inner = 3,
                        c = groups[i];
                    for (var j = 0; j < 4; j++) {
                        if (c[j] === '1') {
                            sum_inner += Math.pow(2, pow_inner);
                        }
                        pow_inner--;
                    }
                    final_hex.push(hex_list.charAt(sum_inner));
                }
                if (!is_number) { // the decimal
                    var decimal_part = final_hex.join('');
                    return (decimal_part.str_replace('!all', {
                        '0': ''
                    }) === '') ? '0' : decimal_part.str_replace('!right', '0', '');
                } else { // for the decimal; is_number===true
                    var number_part = final_hex.join('').str_replace('!left', '0', ''),
                        sign = (((number_part === '' && dec !== '0') || is_neg) ? '-' : ''),
                        seperator = (dec === '0' ? '' : '.');

                    var final_num = sign.str_build('!join', (number_part === '' ? '0' : number_part), seperator, (dec === '0' ? '' : dec));
                    return ((final_num === '' || final_num === '-0') ? '0' : final_num);
                }
            };
            return number = f(number, '!left', true, decimal = f(decimal, '!right', false) /*the decimal*/ , is_negative);
        },
        'dec::bin': function(string, args) {
            var error_limit = args[1],
                base_of = args[2] || 2;
            // given 'number' must be a string.. just make sure
            string += '';
            // must only contain 1 and 0s and/or a single dot
            if (!string.str_is('!digit')) return NaN;
            // get the number pars
            var parts = string.str_split('!num', true),
                number = parts[0],
                decimal = parts[1],
                is_negative = parts[2];
            var f = function(num, is_number, dec, is_neg) {
                if (is_number) {
                    // ex. 40.25 => 50.2
                    // find the max placevalue
                    var list = [];
                    for (var i = 0;; i++) {
                        var pow = Math.pow(base_of, i);
                        list.push(pow);
                        if (num <= pow) break;
                    }
                    var octal_array = [],
                        c;
                    for (var i = list.length - 1; i > -1; i--) {
                        c = list[i];
                        octal_array.push((Math.floor(num / c)) + '');
                        num = num % c;
                    }
                    if (base_of !== 16) num = octal_array.join('').str_replace('!left', '0', '');
                    else {
                        // loop through and replace A-F
                        var hex_list = '0123456789ABCDEF',
                            hex_array = []
                        for (var i = 0, l = octal_array.length; i < l; i++) {
                            hex_array.push(hex_list.charAt(octal_array[i]));
                        }
                        num = hex_array.join('').replace(/^0+/g, '');
                    }
                } else {
                    num = +('0.' + (num + ''));
                    var dec_list = [],
                        dec;
                    // get the decimal
                    // http://stackoverflow.com/questions/22759609/javascript-more-accurate-value-of-pi
                    // javascript has a 15 length limit for decimals
                    // but because this is our model we can go as far as the use wants...
                    // the number will, however, be cut back to 10-15 when converted to a number
                    for (var limit = (error_limit || 15); limit > 0; limit--) {
                        // formula (decimal * b).str_split('!num', true);
                        dec = ('' + (num * base_of)).str_split('!num', true);
                        num = +('0.' + dec[1]);
                        dec_list.push(dec[0] + '');
                    }
                    if (base_of !== 16) num = dec_list.join('');
                    else {
                        // proof of validation; PI example works
                        // http://stackoverflow.com/questions/20650954/how-to-convert-decimal-fractions-to-hexadecimal-fractions
                        // loop through and replace A-F
                        var hex_list = '0123456789ABCDEF';
                        var hex_array = []
                        for (var i = 0, l = dec_list.length; i < l; i++) {
                            hex_array.push(hex_list.charAt(dec_list[i]));
                        }
                        num = hex_array.join('');
                    }
                    // remove the traling 0's
                    num = num.str_replace('!right', '0', '');
                }
                if (!is_number) { // the decimal
                    var decimal_part = num;
                    return (decimal_part.str_replace('!all', {
                        '0': ''
                    }) === '') ? '0' : decimal_part.str_replace('!right', '0', '');
                } else { // for the decimal; is_number===true
                    var number_part = num.str_replace('!left', '0', ''),
                        sign = (((number_part === '' && dec !== '0') || is_neg) ? '-' : ''),
                        seperator = (dec === '0' ? '' : '.');

                    var final_num = sign.str_build('!join', (number_part === '' ? '0' : number_part), seperator, (dec === '0' ? '' : dec));
                    return ((final_num === '' || final_num === '-0') ? '0' : final_num);
                }
            };
            return number = f(number, true, decimal = f(decimal, false) /*the decimal*/ , is_negative);
        },
        'dec::oct': function(string, args) {
            return string.str_convert('!dec::bin', args[1] /*error_limit*/ , 8);
        },
        'dec::hex': function(string, args) {
            return string.str_convert('!dec::bin', args[1] /*error_limit*/ , 16);
        },
        'oct::bin': function(string) {
            // given 'number' must be a string.. just make sure
            string += '';
            // must only contain numbers 0-7 and/or a single dot
            if (!string.str_is('!octal')) return NaN;
            // get the number pars
            var parts = string.str_split('!num', true),
                number = parts[0],
                decimal = parts[1],
                is_negative = parts[2];
            var f = function(num, is_number, dec, is_neg) {
                var groups = num.split('');
                // loop through each finding its octal equivalent
                var octal_equivalents = ["000", "001", "010", "011", "100", "101", "110", "111"],
                    final_oct = [];
                for (var i = 0, l = groups.length; i < l; i++) {
                    // https://www.youtube.com/watch?v=9jho2TkH6AU

                    final_oct.push(octal_equivalents[groups[i]]);
                }
                if (!is_number) { // the decimal
                    var decimal_part = final_oct.join('');
                    return (decimal_part.str_replace('!all', {
                        '0': ''
                    }) === '') ? '0' : decimal_part.str_replace('!right', '0', '');
                } else { // for the decimal; is_number===true
                    var number_part = final_oct.join('').str_replace('!left', '0', ''),
                        sign = (((number_part === '' && dec !== '0') || is_neg) ? '-' : ''),
                        seperator = (dec === '0' ? '' : '.');

                    var final_num = sign.str_build('!join', (number_part === '' ? '0' : number_part), seperator, (dec === '0' ? '' : dec));
                    return ((final_num === '' || final_num === '-0') ? '0' : final_num);
                }
            };
            return number = f(number, true, decimal = f(decimal, false) /*the decimal*/ , is_negative);
        },
        'oct::dec': function(string) {
            // given 'number' must be a string.. just make sure
            string += '';
            // must only contain numbers 0-7 and/or a single dot
            if (!string.str_is('!octal')) return NaN;
            // get the number pars
            var parts = string.str_split('!num', true),
                number = parts[0],
                decimal = parts[1],
                is_negative = parts[2];

            var f = function(num, is_number, dec, is_neg) {
                if (is_number) {
                    num = num.split('');
                    // loop through each finding its octal equivalent
                    var final_number = 0,
                        pow = num.length - 1;
                    for (var i = 0, l = num.length; i < l; i++) {
                        // https://www.youtube.com/watch?v=9jho2TkH6AU
                        final_number += (+num[i]) * Math.pow(8, pow);
                        pow--;
                    }
                    num = final_number + '';
                } else { // the decimal
                    // now we find the decimal
                    // decimal = (decimal+'').split('.')[1];
                    var final_number = 0,
                        pow = 1;
                    for (var i = 0, l = num.length; i < l; i++) {
                        // https://www.youtube.com/watch?v=QIkfAkcfy0w
                        // formula (n * b^-counter )
                        final_number += (+num[i]) * Math.pow(8, -pow);
                        pow++;
                    }
                    // remove the leading 0
                    num = (final_number + '').str_chomp('!left', '0.');
                    // num = (final_number+'').str_split('!num')[1];
                }

                if (!is_number) { // the decimal
                    var decimal_part = num;
                    return (decimal_part.str_replace('!all', {
                        '0': ''
                    }) === '') ? '0' : decimal_part.str_replace('!right', '0', '');
                } else { // for the decimal; is_number===true
                    var number_part = num.str_replace('!left', '0', ''),
                        sign = (((number_part === '' && dec !== '0') || is_neg) ? '-' : ''),
                        seperator = (dec === '0' ? '' : '.');

                    var final_num = sign.str_build('!join', (number_part === '' ? '0' : number_part), seperator, (dec === '0' ? '' : dec));
                    return ((final_num === '' || final_num === '-0') ? '0' : final_num);
                }
            };
            return number = f(number, true, decimal = f(decimal, false) /*the decimal*/ , is_negative);
        },
        'oct::hex': function(string, args) {
            var error_limit = args[1];
            // turn to binary then from binary to hex
            return string.str_convert('!oct::bin', error_limit).str_convert('!bin::hex', error_limit);
        },
        'hex::bin': function(string) {
            // given 'number' must be a string.. just make sure
            string += '';
            // must only contain 1 and 0s and/or a single dot
            if (!string.str_is('!hex')) return NaN;
            // get the number pars
            var parts = string.str_split('!num', true),
                number = parts[0],
                decimal = parts[1],
                is_negative = parts[2];
            // check if number starts with a negative
            if (is_negative) string = string.str_chomp('!left', 1);
            var f = function(num, is_number, dec, is_neg) {
                var list = num.toUpperCase().split('');
                // loop through each finding its octal equivalent
                var hex_list = '0123456789ABCDEF',
                    final_hex = [];
                for (var i = 0, l = list.length; i < l; i++) {
                    // https://www.youtube.com/watch?v=W_NpD248CdE
                    var sum_inner = '',
                        pow_inner = 3,
                        c = hex_list.indexOf(list[i]);
                    for (var j = 0; j < 4; j++) {
                        var x = Math.floor(c / Math.pow(2, pow_inner));
                        if (x === 1) {
                            sum_inner += '1';
                            c -= Math.pow(2, pow_inner);
                        } else {
                            sum_inner += '0';
                        }
                        pow_inner--;
                    }
                    final_hex.push(sum_inner);
                }
                if (!is_number) { // the decimal
                    var decimal_part = final_hex.join('');
                    return (decimal_part.str_replace('!all', {
                        '0': ''
                    }) === '') ? '0' : decimal_part.str_replace('!right', '0', '');
                } else { // for the decimal; is_number===true
                    var number_part = final_hex.join('').str_replace('!left', '0', ''),
                        sign = (((number_part === '' && dec !== '0') || is_neg) ? '-' : ''),
                        seperator = (dec === '0' ? '' : '.');

                    var final_num = sign.str_build('!join', (number_part === '' ? '0' : number_part), seperator, (dec === '0' ? '' : dec));
                    return ((final_num === '' || final_num === '-0') ? '0' : final_num);
                }
            };
            return number = f(number, true, decimal = f(decimal, false) /*the decimal*/ , is_negative);
        },
        'hex::oct': function(string, args) {
            var error_limit = args[1];
            // convert to binary then from binary to octal
            return string.str_convert('!hex::bin', error_limit).str_convert('!bin::oct', error_limit);
        },
        'hex::dec': function(string, args) {

            var error_limit = args[1];
            // convert to binary then from binary to dec

            return string.str_convert('!hex::bin', error_limit).str_convert('!bin::dec', error_limit);
        },
        // str.str_(\w+)_2_(\w+) = function\(
        'hex::six': function(string) {
            return '#'.str_build('!join', string[1], string[1], string[2], string[2], string[3], string[3]);
        },
        // http://rland.me.uk/cross-browser-alpha-transparent-background-10-2011/
        // http://beijingyoung.com/articles/rgba-argb-converter/
        'rgba::argb': function(string, args) {
            // check wether a string or an array is supplied
            var type = Object.prototype.toString.call(string);
            if (type.str_is('!in', 'String')) {
                // parse the string into rgb parts
                var rgb = string.str_parse('!rgb');
                if (!rgb) return NaN; // could not parse the supplied rgb string
            } else if (type.str_is('!in', 'Array')) {
                var rgb = string;
            }
            var r = rgb[0],
                g = rgb[1],
                b = rgb[2],
                a = rgb[3];
            // the alpha must be multiplied by 255 then converte to hex
            return (((args[1] /*add_hash*/ ) ? '#' : '') + (('' + (~~(a * 255))).str_convert('!dec::hex')) + ((r.str_convert('!dec::hex') || '00') + (g.str_convert('!dec::hex') || '00') + (b.str_convert('!dec::hex') || '00'))).replace(/\./g, '');
        },
        'argb::rgba': function(string) {
            // check that the strig supplied is in the #AARRGGBB format
            if (!string.str_is('!hexcolor8')) return false;
            // remove the #
            string = string.str_chomp('!left', '#');
            // split the string into groups of 2
            var groups = string.str_split('!chunk', 2);
            var a = groups[0],
                r = groups[1],
                g = groups[2],
                b = groups[3];
            // the alpha must be multiplied by 255 then converte to hex
            return 'rgba('.str_build('!join', (r.str_convert('!hex::dec') || '0'), ',', (g.str_convert('!hex::dec') || '0'), ',', (b.str_convert('!hex::dec') || '0'), ',', ~~((a.str_convert('!hex::dec') * 1) / 255), ')');
        },
        'rgb::hex': function(string, args) {

            // check wether a string or an array is supplied
            var type = Object.prototype.toString.call(string);
            if (type.str_is('!in', 'String')) {
                // parse the string into rgb parts
                var rgb = string.str_parse('!rgb');

                if (!rgb) return NaN; // could not parse the supplied rgb string
            } else if (type.str_is('!in', 'Array')) {
                var rgb = string;
            }

            var r = rgb[0].str_convert('!dec::hex'),
                g = rgb[1].str_convert('!dec::hex'),
                b = rgb[2].str_convert('!dec::hex');
            if (r && r.length === 1) r = '0' + r;
            if (g && g.length === 1) g = '0' + g;
            if (b && b.length === 1) b = '0' + b;

            return ((args[1] /*add_hash*/ ) ? '#' : '').str_build('!join', (r || '00'), (g || '00'), (b || '00')); //.replace(/\./g, ''); BUG HERE
        },
        // take the rgb value e.g. 221 and divide by 16 => (221/16)
        // (221/16) and round down => Math.floor(221/16);
        // lookup the value in the list, in this case 13 => D
        // to get th second value we take find the remainder
        // for example, 221 - ((221/16) * 16)
        // then use the remainder to find the second value in the list
        'hex::rgb': function(string) {

            string = string.str_chomp('!left', '#');

            // hex string must be either 3 or 6 chars in length
            if (!string.str_length('!exact', 6)) {
                // must be 3 then
                if (!string.str_length('!exact', 3)) return NaN;
            }
            // format the string if length is 3
            if (string.str_length('!exact', 3)) string = string.str_convert('!hex::six');
            // chop into groups of 2

            var groups = string.str_split('!chunk', 2);
            // var groups = string.toString().str_split('!chunk', 2);

            return ('rgba('.str_build('!join', groups[0].str_convert('!hex::dec'), ',', groups[1].str_convert('!hex::dec'), ',', groups[2].str_convert('!hex::dec'), ',1)'));
        },
        // // http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
        // rgb_2_hsl = function() {
        //     // check wether a string or an array is supplied
        //     var type = Object.prototype.toString.call(string);
        //     if (type.str_is('!in', 'String')) {
        //         // parse the string into rgb parts
        //         var rgb = string.str_parse('!rgb');
        //         if (!rgb) return NaN; // could not parse the supplied rgb string
        //     } else if (type.str_is('!in', 'Array')) {
        //         var rgb = string;
        //     }
        //     var hue, saturation, luminace;
        //     // #1 Convert the RGB values to the range 0-1, this can be done by dividing the value by 255 for 8-bit color depth
        //     var r = (+rgb[0])/255,
        //         g = (+rgb[1])/255,
        //         b = (+rgb[2])/255;
        //     // #2 Find the minimum and maximum values of R, G and B.
        //     var min = Math.min(r, g, b),
        //         max = Math.max(r, g, b);
        //     // #3 Now calculate the Luminace value by adding the max and min values and divide by 2.
        //     luminace = (max + min)/2;
        //     // #4 The next step is to find the Saturation.
        //     // If the min and max value are the same, it means that there is no saturation.
        //     // If all RGB values are equal you have a shade of grey.
        //     // Depending on how bright it’s somewhere between black and white.
        //     // If there is no Saturation, we don’t need to calculate the Hue. So we set it to 0 degrees.
        //     if ( min === max ) {
        //         // no saturation or hue stop here and return
        //         hue = saturation = 0;
        //     }else {
        //     // #5 Now we know that there is Saturation we need to do check the level of the Luminance in order to select the correct formula.
        //     // If Luminance is smaller then 0.5, then Saturation = (max-min)/(max+min)
        //     // If Luminance is bigger then 0.5. then Saturation = ( max-min)/(2.0-max-min)
        //         saturation = ( luminace < 0.5 ) ? (max-min)/(max+min) : (max-min)/(2.0-max-min);
        //     // #6 Two done, one to go. We still need to calculate the Hue.
        //     // The Hue formula is depending on what RGB color channel is the max value. The three different formulas are:
        //     // If Red is max, then Hue = (G-B)/(max-min)
        //     // If Green is max, then Hue = 2.0 + (B-R)/(max-min)
        //     // If Blue is max, then Hue = 4.0 + (R-G)/(max-min)
        //     // The Hue value you get needs to be multiplied by 60 to convert it to degrees on the color circle
        //     // If Hue becomes negative you need to add 360 to, because a circle has 360 degrees.
        //     }
        //     return [hue, saturation, luminace];
        // }
        // http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
        // mirror: http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
        // https://github.com/mjackson/mjijackson.github.com/blob/master/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript.txt
        // ---
        // title: RGB to HSL and RGB to HSV Color Model Conversion Algorithms in JavaScript
        // author: Michael J. I. Jackson
        // published: 2008-02-10 16:01
        // updated: 2009-01-03 00:52
        // tags: [color, javascript]
        // ---
        // Here is a set of additive color model conversion algorithms that I found published on [Wikipedia][wp] and have implemented in JavaScript. It was surprisingly difficult to find these actually implemented anywhere in compact, efficient, and bug-free code, so I wrote my own. These should be easily portable to other programming languages if desired.
        // [wp]: http://en.wikipedia.org/wiki/HSL_color_space "HSL color space"
        /**
         * Converts an RGB color value to HSL. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes r, g, and b are contained in the set [0, 255] and
         * returns h, s, and l in the set [0, 1].
         *
         * @param   Number  r       The red color value
         * @param   Number  g       The green color value
         * @param   Number  b       The blue color value
         * @return  Array           The HSL representation
         */
        'rgb::hsl': function(string) {
            // check wether a string or an array is supplied
            var type = Object.prototype.toString.call(string);
            if (type.str_is('!in', 'String')) {
                // parse the string into rgb parts
                var rgb = string.str_parse('!rgb');
                if (!rgb) return NaN; // could not parse the supplied rgb string
            } else if (type.str_is('!in', 'Array')) {
                var rgb = string;
            }
            var r = (+rgb[0]) / 255,
                g = (+rgb[1]) / 255,
                b = (+rgb[2]) / 255;
            // r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b),
                min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;
            if (max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            // hue must be multiplied by 360 => The hue is the proportion of the distance around the edge of the hexagon which passes through the projected point, originally measured on the range [0, 1] but now typically measured in degrees [0°, 360°].
            // Saturation and Luminance are measured in percentages so simply multiply by 100

            return 'hsl('.str_build('!join', (h * 360), ',', (s * 100), '%,', (l * 100), '%)');
        },
        /**
         * Converts an HSL color value to RGB. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes h, s, and l are contained in the set [0, 1] and
         * returns r, g, and b in the set [0, 255].
         *
         * @param   Number  h       The hue
         * @param   Number  s       The saturation
         * @param   Number  l       The lightness
         * @return  Array           The RGB representation
         */
        'hsl::rgb': function(string) {
            // check wether a string or an array is supplied
            var type = Object.prototype.toString.call(string);

            if (type.str_is('!in', 'String')) {
                // parse the string into rgb parts
                var hsl = string.str_parse('!hsl');
                if (!hsl) return NaN; // could not parse the supplied rgb string
            } else if (type.str_is('!in', 'Array')) {
                var hsl = string;
            }
            var h = (+hsl[0]) / 360,
                s = (+hsl[1]) / 100,
                l = (+hsl[2]) / 100;

            var r, g, b;
            if (s == 0) {
                r = g = b = l; // achromatic
            } else {
                function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                }
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return 'rgba('.str_build('!join', ~~(r * 255), ',', ~~(g * 255), ',', ~~(b * 255), ',1)');
            // return [r * 255, g * 255, b * 255];
        },
        // online calc reference http://www.rapidtables.com/convert/color/rgb-to-hsv.htm
        /**
         * Converts an RGB color value to HSV. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
         * Assumes r, g, and b are contained in the set [0, 255] and
         * returns h, s, and v in the set [0, 1].
         *
         * @param   Number  r       The red color value
         * @param   Number  g       The green color value
         * @param   Number  b       The blue color value
         * @return  Array           The HSV representation
         */
        'rgb::hsv': function(string) {
            // check wether a string or an array is supplied
            var type = Object.prototype.toString.call(string);
            if (type.str_is('!in', 'String')) {
                // parse the string into rgb parts
                var rgb = string.str_parse('!rgb');
                if (!rgb) return NaN; // could not parse the supplied rgb string
            } else if (type.str_is('!in', 'Array')) {
                var rgb = string;
            }
            var r = (+rgb[0]) / 255,
                g = (+rgb[1]) / 255,
                b = (+rgb[2]) / 255;
            // r = r/255, g = g/255, b = b/255;
            var max = Math.max(r, g, b),
                min = Math.min(r, g, b);
            var h, s, v = max;
            var d = max - min;
            s = max == 0 ? 0 : d / max;
            if (max == min) {
                h = 0; // achromatic
            } else {
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            // hue must be multiplied by 360 => The hue is the proportion of the distance around the edge of the hexagon which passes through the projected point, originally measured on the range [0, 1] but now typically measured in degrees [0°, 360°].
            // Saturation and Luminance are measured in percentages so simply multiply by 100

            return 'hsv('.str_build('!join', (h * 360), ',', (s * 100), '%,', (v * 100), '%)');
        },
        /**
         * Converts an HSV color value to RGB. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
         * Assumes h, s, and v are contained in the set [0, 1] and
         * returns r, g, and b in the set [0, 255].
         *
         * @param   Number  h       The hue
         * @param   Number  s       The saturation
         * @param   Number  v       The value
         * @return  Array           The RGB representation
         */
        'hsv::rgb': function(string) {
            // check wether a string or an array is supplied
            var type = Object.prototype.toString.call(string);

            if (type.str_is('!in', 'String')) {
                // parse the string into rgb parts
                var hsv = string.str_parse('!hsv');
                if (!hsv) return NaN; // could not parse the supplied rgb string
            } else if (type.str_is('!in', 'Array')) {
                var hsv = string;
            }
            var h = (+hsv[0]) / 360,
                s = (+hsv[1]) / 100,
                v = (+hsv[2]) / 100;

            var r, g, b;
            var i = Math.floor(h * 6);
            var f = h * 6 - i;
            var p = v * (1 - s);
            var q = v * (1 - f * s);
            var t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0:
                    r = v, g = t, b = p;
                    break;
                case 1:
                    r = q, g = v, b = p;
                    break;
                case 2:
                    r = p, g = v, b = t;
                    break;
                case 3:
                    r = p, g = q, b = v;
                    break;
                case 4:
                    r = t, g = p, b = v;
                    break;
                case 5:
                    r = v, g = p, b = q;
                    break;
            }
            return 'rgba('.str_build('!join', ~~(r * 255), ',', ~~(g * 255), ',', ~~(b * 255), ',1)');
            // return [r * 255, g * 255, b * 255];
        },
        'hex::lighten': function(string, args) {

            var to_rgb = args[2] || false,
                percent_amount = (args[1] || 0);
            // turn into rgb
            // if (!to_rgb) string = string.str_convert('!hex::rgb');
            string = string.str_convert('!hex::rgb');

            // turn rgb into hsl
            string = string.str_convert('!rgb::hsl');

            // parse the hsl

            string = string.str_parse('!hsl');
            // turn back to rgb
            var new_percent = (string[2] * 1 + percent_amount);

            string = 'hsl('.str_build('!join', string[0], ',', string[1], '%,', (new_percent > 100 ? 100 : new_percent), '%)').str_convert('!hsl::rgb');
            // if (to_rgb) return string;
            // finally turn back to hex
            return (to_rgb ? '#' : '') + string.str_convert('!rgb::hex');
        },
        'hex::darken': function(string, args) {

            var to_rgb = args[2],
                percent_amount = (args[1] || 0);

            // turn into rgb
            // if (!to_rgb) string = string.str_convert('!hex::rgb'); // console.log(222, string);
            string = string.str_convert('!hex::rgb'); // console.log(222, string);

            // turn rgb into hsl
            string = string.str_convert('!rgb::hsl'); // console.log(333, string);

            // parse the hsl
            string = string.str_parse('!hsl'); // console.log(444, string);

            // turn back to rgb

            var new_percent = (string[2] * 1 - percent_amount);

            string = 'hsl('.str_build('!join', string[0], ',', string[1], '%,', (new_percent < 0 ? 0 : new_percent), '%)').str_convert('!hsl::rgb'); // console.log(555, string);

            // if (to_rgb) return string;
            // finally turn back to hex

            return (to_rgb ? '#' : '') + string.str_convert('!rgb::hex');
        },
        'rgb::lighten': function(string, args) {

            return string.str_convert('!rgb::hex').str_convert('!hex::lighten', args[1] /*percent_amount*/ ).str_convert('!hex::rgb');
        },
        'rgb::darken': function(string, args) {

            return string.str_convert('!rgb::hex').str_convert('!hex::darken', args[1] /*percent_amount*/ ).str_convert('!hex::rgb');
        },
        // https://en.wikipedia.org/wiki/HWB_color_model
        // http://fettblog.eu/hwb-colors/
        'hsv::hwb': function(string) {
            // parse to get the parts
            var parts = string.str_parse('!hsv');
            var h = parts[0],
                s = parts[1] / 100,
                v = parts[2] / 100;
            return [h, Math.abs((1 - s) * v) * 100, Math.abs(1 - v) * 100];
        },
        'rgb::hwb': function(string) {
            // convert to hsv
            string = string.str_convert('!rgb::hsv');
            // then convert to hwm from hsv
            return string.str_convert('!hsv::hwb');
        },
        'hwb::hsv': function(string) {
            // parse to get the parts
            var parts = string.str_parse('!hwb');
            var h = parts[0],
                w = parts[1] / 100,
                b = parts[2] / 100;
            return [h, Math.abs(1 - ((w) / (1 - b))) * 100, Math.abs(1 - b) * 100];
        },
        '::camel': function(string) {
            // var string = this;
            var new_string = '',
                seperators = ['_', '-'];
            for (var i = 0, l = string.length; i < l; i++) {
                // if the current char is a _ or -
                if (seperators.indexOf(string[i]) !== -1) {
                    if (string[i + 1]) {
                        new_string += string[i + 1].toUpperCase();
                        i++;
                    }
                    // regular char
                } else new_string += string[i];
            }
            return new_string;
        },
        '::cap': function(string) {
            // upperCase the first char
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        '::decap': function(string) {
            // lowerCase the first char
            return string.charAt(0).toLowerCase() + string.slice(1);
        },
        '::class': function(string) {
            // var string = this;
            // split at anyting but text chars...basically punctuation
            var parts = string.split(/[\`\~\!\@\#\$\%\^\&\*\(\)\_\-\+\=\[\]\{\}\\\|\;\:\'\"\,\.\<\>\/\?|\s\xa0]+/),
                new_string = [];
            for (var i = 0, l = parts.length; i < l; i++) {
                new_string.push(parts[i].str_convert('!::cap'));
            }
            return new_string.join('');
        },
        '::dash': function(string) {
            // var string = this;
            var new_string = '';
            for (var i = 0, l = string.length; i < l; i++) {
                // if the current char is a _ or -
                if (string[i] === string[i].toUpperCase()) {
                    if (string[i + 1]) {
                        new_string += ('-' + string[i].toLowerCase());
                    }
                    // regular char
                } else new_string += string[i];
            }
            return new_string;
        },
        '::num': function(string, args) {
            return parseInt(string, (args[1] || 10));
        },
        '::swap': function(string) {
            // var string = this;
            var new_string_parts = [],
                c;
            for (var i = 0, l = string.length; i < l; i++) {
                c = string[i];
                if (c === c.toLowerCase()) new_string_parts.push(c.toUpperCase());
                else new_string_parts.push(c.toLowerCase());
            }
            return new_string_parts.join('');
        },
        '::slug': function(string) {
            // var string = this;
            // return string.toLowerCase.replace
            return string.str_strip('!accents').toLowerCase().trim().replace(/[\s\xa0]+/g, '-');
        },
        '::title': function(string) {
            //var string = this;
            var new_string = [];
            string = string.split(' ');
            for (var i = 0, l = string.length; i < l; i++) {
                new_string.push(string[i].str_convert('!::cap'));
            }
            return new_string.join(' ');
        },
        '::under': function(string) {
                // var string = this;
                var new_string = '';
                for (var i = 0, l = string.length; i < l; i++) {
                    // if the current char is a _ or -
                    if (string[i] === string[i].toUpperCase()) {
                        if (string[i + 1]) {
                            new_string += ('_' + string[i].toLowerCase());
                        }
                        // regular char
                    } else new_string += string[i];
                }
                return new_string;
            }
            // rgb2hsv(hwb2rgb(args));
            // hwb_rgb = function() {
            //     // first convert to hsv
            //     string = string.str_parse_hwb(string);
            //     // then convert to hsv
            //     string = string.str_(  );
            //     // first convert to hsv
            //     string = string.str_rgb_2_hsv(string);
            //     // then parse hsv
            //     var parts = string.str_parse_hsv(string);
            //     var h = parts[0],
            //         s = parts[1]/100,
            //         v = parts[2]/100;
            //     return [ h, Math.abs((1-s)*v)*100, Math.abs(1-v)*100 ];
            // },
            // https://github.com/MoOx/color-convert/blob/master/conversions.js
            // https://github.com/MoOx/color-convert
            // function cmyk2rgb(cmyk) {
            //   var c = cmyk[0] / 100,
            //       m = cmyk[1] / 100,
            //       y = cmyk[2] / 100,
            //       k = cmyk[3] / 100,
            //       r, g, b;
            //   r = 1 - Math.min(1, c * (1 - k) + k);
            //   g = 1 - Math.min(1, m * (1 - k) + k);
            //   b = 1 - Math.min(1, y * (1 - k) + k);
            //   return [r * 255, g * 255, b * 255];
            // }
            // function rgb2cmyk(rgb) {
            //   var r = rgb[0] / 255,
            //       g = rgb[1] / 255,
            //       b = rgb[2] / 255,
            //       c, m, y, k;
            //   k = Math.min(1 - r, 1 - g, 1 - b);
            //   c = (1 - r - k) / (1 - k) || 0;
            //   m = (1 - g - k) / (1 - k) || 0;
            //   y = (1 - b - k) / (1 - k) || 0;
            //   return [c * 100, m * 100, y * 100, k * 100];
            // }
            // rgb_lighten = function(percent) {
            //     var rgb = string.str_parse('!rgb'),
            //         r_ = (~~(rgb[0] * 1 + (255 - rgb[0] * 1) * (percent / 100))),
            //         g_ = (~~(rgb[1] * 1 + (255 - rgb[1] * 1) * (percent / 100))),
            //         b_ = (~~(rgb[2] * 1 + (255 - rgb[2] * 1) * (percent / 100)));
            //     return string.str_build('!join', 'rgb(', ((r_ > 255) ? '255' : r_), ',', ((g_ > 255) ? '255' : g_), ',', ((b_ > 255) ? '255' : b_), ')');
            // },
            // rgb_darken = function(percent) {
            //     var rgb = string.str_parse('!rgb'),
            //         r_ = (~~(rgb[0] * 1 - (255 - rgb[0] * 1) * (percent / 100))),
            //         g_ = (~~(rgb[1] * 1 - (255 - rgb[1] * 1) * (percent / 100))),
            //         b_ = (~~(rgb[2] * 1 - (255 - rgb[2] * 1) * (percent / 100)));
            //     return string.str_build('!join', 'rgb(', ((r_ < 0) ? '0' : r_), ',', ((g_ < 0) ? '0' : g_), ',', ((b_ < 0) ? '0' : b_), ')');
            // },
            // hex_lighten = function(percent) {},
            //3F83A3
    },
    'count': {
        '/': function(string, args) { // needle) {

            return string.split(args[1]).length - 1;
        }
    },
    'decode': {
        'html': function(string) {
            var entities = {
                '&lt;': '<',
                '&gt;': '>',
                '&quot;': '"',
                "&#39;": "'",
                '&amp;': '&'
            };
            return string.replace(/&lt;|&gt;|&quot;|&#39;|&amp;/g, function(entity) {
                return entities[entity];
            });
        },
        'json': function(string) {
            var string = this;
            try {
                return JSON.parse(string);
            } catch (e) {
                return ("json " + e);
            }
        },
        /**
         *
         *  Base64 encode / decode :: encode_utf8 function
         *  http://www.webtoolkit.info/
         *
         *  Code has been modified to fix bugs found by stackoverflow users
         *  http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
         *
         **/
        'utf8': function(utftext) {
            var string = this;
            var string = "",
                i = 0,
                c = 0,
                c1 = 0,
                c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c1 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
                    i += 2;
                } else {
                    c1 = utftext.charCodeAt(i + 1);
                    c2 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
                    i += 3;
                }
            }
            return string;
        },
        /**
         *
         *  Base64 encode / decode
         *  http://www.webtoolkit.info/
         *
         *  Code has been modified to fix bugs found by stackoverflow users
         *  http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
         *
         **/
        'base64': function(input, args) { // use_native) {
            // use the native base64 encode; supported only in IE 10+ and moder browsers (chrome, ff...)
            if (args[1]) return win.atob(input);
            var output = "",
                chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0,
                _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            return output.str_decode('!utf8');
        }
    },
    'encode': {
        'json': function(string) {
            try {
                return JSON.stringify(string);
            } catch (e) {
                return ("json " + e);
            }
        },
        /**
         *
         *  Base64 encode / decode :: encode_utf8 function
         *  http://www.webtoolkit.info/
         *
         *  Code has been modified to fix bugs found by stackoverflow users
         *  http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
         *
         **/
        'utf8': function(string) {
            //string = string.replace(/\r\n/g,"\n"); // comment out to allow for safe binary encodings/decodings
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        /**
         *
         *  Base64 encode / decode
         *  http://www.webtoolkit.info/
         *
         *  Code has been modified to fix bugs found by stackoverflow users
         *  http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
         *
         **/
        'base64': function(string, args) { // use_native) {
            // use the native base64 encode; supported only in IE 10+ and moder browsers (chrome, ff...)
            if (args[1]) return win.btoa(string);
            var output = "",
                chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0,
                _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            string = string.str_encode('!utf8');
            while (i < string.length) {
                chr1 = string.charCodeAt(i++);
                chr2 = string.charCodeAt(i++);
                chr3 = string.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        },
        'html': function(string) {
            var entities = {
                '<': 'lt',
                '>': 'gt',
                '"': 'quot',
                "'": '#39',
                '&': 'amp'
            };
            return string.replace(/[<>"'&]/g, function(entity) {
                return '&' + entities[entity] + ';';
            });
        }
    },
    'reverse': {
        '/': function(string) {
            var new_string = '';
            for (var i = 0, l = string.length; i < l; i++) {
                new_string = string[i] + new_string;
            }
            // var new_string = '';
            // for (var i = string.length; i > -1; i--) {
            //     new_string += string[i];
            // }
            return new_string;
        }
    },
    'split': {
        'chars': function(string) {
            return string.split('');
        },
        'chunk': function(string, args) { // chunk_size) {
            // splits string into the specified chunk size
            return string.match(new RegExp(('.' + '.?'.str_repeat('!text', Math.abs(args[1]) - 1)), 'g'));
        },
        'lines': function(string) {
            return string.split(/\r\n|\n\r|\r|\n/);
        },
        'num': function(string, args) { //fill_in) { //internal method ???
            // if (string.str_is('!decimal') && string.str_is('!numeric')) {
            if (string.str_is('!numeric')) {
                var parts = string.split('.'),
                    fill_in = args[1];
                // check if negative
                return [(parts[0].str_chomp('!left', '-') || (fill_in ? '0' : '0')), (parts[1] || (fill_in ? '0' : '0')), (parts[0].charAt(0) === '-') ? true : false];
            }
            return NaN;
            // if (string.str_is('!decimal')) {
            //     return [ (string.split('.')[0] || (fill_in ? '0' : '')), ( (string.split('.')[1].str_grab('!between', 0, (n || -1))) || (fill_in ? '0' : '') )];
            // } else {
            //     return [string, '0'];
            // }
        },
        'words': function(string, args) {
            return string.trim().split(args[1] || (/[\s\xa0]+/));
        }
    },
    'chomp': {
        'left': function(string, args) { //prefix) {
            // if the prefix is a number we just chomp back those x chars
            // else if string we remove that prefix fromt the string
            var prefix = args[1];
            return (dtype(prefix, 'string') && string.indexOf(prefix) === 0) ? string.slice(prefix.length) : (dtype(prefix, 'number') ? string.slice(Math.abs(prefix)) : string);
        },
        'right': function(string, args) { //suffix) {

            // if the prefix is a number we just chomp back those x chars
            // else if string we remove that prefix fromt the string
            var suffix = args[1];
            return (dtype(suffix, 'string') && string.str_grab('!right', suffix.length) === suffix) ? string.str_grab('!between', 0, string.length - suffix.length) : (dtype(suffix, 'number') ? string.substr(0, string.length - Math.abs(suffix)) : string);
        }
    },
    'ff': {
        '/': function(string, args) { //list) {
            var list = args[1];
            for (var i = 0, l = list.length; i < l; i++) {
                if (string.indexOf(list[i]) !== -1) return list[i];
            }
            return null;
        }
    },
    'ensure': {
        'left': function(string, args) {
            var prefix = args[1];
            return (string.str_grab('!left', prefix.length) === prefix) ? string : prefix + string;
        },
        'right': function(string, args) {
            var suffix = args[1];
            return (string.str_grab('!right', suffix.length) === suffix) ? string : string + suffix;
        }
    },
    'format': {
        // allow string formating either way => {0:'anthony'} or {'name':'anthony'}
        'string': function(string, args) {
            var format_map = args[1];
            return string.replace(/{(\d+)}/g, function(match, index) {
                return format_map[index];
            });
        },
        'number': function(string, args) {
            // var decimals = ,
            // decimal_seperator = args[2],
            // order_seperator = args[3];
            // var string = this;
            var deci = '00',
                check = string.indexOf('.');
            decimals = Math.abs(args[1]) || 2;
            if (check !== -1) {
                deci = string.substring(check + 1, string.length);
                string = string.substring(0, check);
            }
            // if decimals is provided add it
            if (decimals) {
                // if the deci is longer than the decimals wanted we
                // cut it down
                if (deci.length > decimals) deci = deci.str_grab('!between', 0, decimals);
                else {
                    // we need to pad the decimal with traling 0's
                    var repeat = decimals - deci.length;
                    // alert('asdas');
                    deci = deci.str_pad('!right', repeat, '0');
                }
            }
            var new_string = '',
                counter = 0,
                order_seperator = args[3] || ',',
                decimal_seperator = args[2] || '.';
            for (var i = string.length - 1; i >= 0; i--) {
                if (counter === 3) {
                    new_string += (order_seperator + string[i]);
                    counter = 0;
                } else new_string += string[i];
                counter++;
            }
            return new_string.split('').reverse().join('') + decimal_seperator + deci;
        }
    },
    'freq': {
        'letters': function(string) {
            var hz_map = {};
            for (var i = 0, l = string.length; i < l; i++) {
                if (!hz_map[string[i]]) {
                    // this is the first of its type
                    hz_map[string[i]] = 1;
                } else {
                    hz_map[string[i]] = hz_map[string[i]] + 1;
                }
            }
            return hz_map;
        },
        // edge case 'this is pretty cool mane haha. like it really is mane haha'.str_freq('!words');
        // remove punctuation?
        'words': function(string) {
            // var string = this;
            var hz_map = {};
            string = string.split(' ');
            for (var i = 0, l = string.length; i < l; i++) {
                if (!hz_map[string[i]]) {
                    // this is the first of its type
                    hz_map[string[i]] = 1;
                } else {
                    hz_map[string[i]] = hz_map[string[i]] + 1;
                }
            }
            return hz_map;
        }
    },
    'grab': {
        'between': function(string, args) { // string, left, right, recurs_string) {
            var left = args[1],
                right = args[2];

            if (typeof left === 'string' && typeof right === 'string') {
                var string = args[3] || string;
                // get the left position
                var left_pos = (left === '') ? 0 : ((left) ? string.indexOf(left) : -1);
                // get the right position
                var right_pos = (right === '') ? (string.length) : ((right) ? string.indexOf(right) : -1);
                // return empty string if the left or right bounds are not found
                if (left_pos === -1 || right_pos === -1) return '';
                // if the right position is smaller than the left recurs...
                if (right_pos < left_pos) {
                    return (string.substring(right_pos + 1)).str_grab('!between', left, right, string.substring(right_pos + 1));
                }
                // add the left_pos to the lenght of the length of the
                // left bound ... stop at the right_pos index
                return string.substring(left_pos + left.length, right_pos);
            } else {
                var start = left,
                    end = right;
                // index positions
                // if the start is negative alias right()
                if (start < 0) return string.str_grab('!right', (!end) ? string.length + start : Math.abs(end));
                // if (start === -1) return string.str_right(string, ((!end) ? string.length : Math.abs(end)));
                return string.substring(start, ((end === -1 || !end /*get to the end of the string*/ ) ? string.length : end))
            }
        },
        'left': function(string, args) { // , n) {
            var n = args[1];

            return (n > 0) ? string.substr(0, n) : string.str_grab('!left', -n);
        },
        'right': function(string, args) { // n) {
            var n = args[1];
            return (n > 0) ? string.slice(-n) : string.str_grab('!right', -n);
        }
    },
    'index': {
        'left': function(string, args) { // needle, all_indices) {

            if (!args[2]) return string.indexOf(args[1]);
            var indices = [],
                i = -1;
            // http://stackoverflow.com/questions/10710345/finding-all-indexes-of-a-specified-character-within-a-string
            while ((i = string.indexOf(args[1], i + 1)) >= 0) {
                indices.push(i);
            }
            // if the indices array is empty here, it was not found within the string
            return indices;
        },
        'right': function(string, args) { // needle, all_indices) {
            if (!args[2]) return string.lastIndexOf(args[1]); // - string.length; --> get the actual position from the right?
            // find them all from the left then simply reverse the array
            return string.str_index('!left', args[1], true).reverse();
        }
    },
    'is': {
        'in': function(string, args) {
            return (string.indexOf(args[1]) === -1) ? false : true;
        },
        'ewith': function(string, args) {
            var list = args[1];
            // loop through each suffix and check if the string ends with it
            for (var i = 0, l = list.length; i < l; i++) {
                if (string.str_grab('!right', list[i].length) === list[i]) return true;
            }
            return false;
        },
        'sewith': function(string, args) {
            /*allow emoty needle???*/
            var needle = args[1];
            if (!needle) return false;
            var starts = string.str_is('!swith', needle),
                ends = string.str_is('!ewith', needle);
            if (starts) return 1; //return '^' + starts;
            if (ends) return 2; //return ends + '$';
            return false;
        },
        'swith': function(string, args) {
            var list = args[1];
            // loop through each prefix and check if the string starts with it
            for (var i = 0, l = list.length; i < l; i++) {
                if (string.str_grab('!left', list[i].length) === list[i]) return true;
            }
            return false;
        },
        'alpha': function(string) {
            return (dtype(string, 'string') && string.trim().replace(/[a-z]/gi, '') === '') ? true : false;
        },
        'alphanum': function(string) {
            return (dtype(string, 'string') && string.trim().replace(/[a-z0-9]/gi, '') === '') ? true : false;
        },
        'array': function(object) {
            return (dtype(object, 'array')) ? true : false;
        },
        'arguments': function(object) {
            return (dtype(object, 'arguments')) ? true : false;
        },
        // http://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
        'base64_string': function(string) {
            // can have padding; 1 or 2 == at the end of string
            if (!string || string.str_count('/', '!=') > 2) return false;
            // first remove the padding and check chars to be A-Za-z0-9+/
            if ((/[^a-zA-Z0-9\+\/]/).test(string.str_replace('!right', '=', ''))) return false;
            return true;
        },
        // valid formats
        // https://en.wikipedia.org/wiki/Date_and_time_representation_by_country#Date
        // it will account for leap years
        'bday': function(date) {
            var year = date[0],
                month = date[1],
                day = date[2];
            // // var string = this;
            if (!year || !month || !day) return false;
            // check if all strings are numeric
            if (!year.str_is('!numeric') || !month.str_is('!numeric') || !day.str_is('!numeric')) return 1;
            // check the lengths
            if ((year.str_to('!num') + '').length !== 4 || month.length > 2 || day.length > 2) return 2;
            // reset vars from string to numbers
            year = year * 1;
            month = month * 1;
            day = day * 1;
            // check that the month is between 1 and 12
            if (month < 1 || month > 12) return 3;
            // check that the day is possible in that month; February-leap-year-29-days
            // http://www.timeanddate.com/calendar/months/
            var month_max_days = [
                [1, 31],
                [2, 28],
                [3, 31],
                [4, 30],
                [5, 31],
                [6, 30],
                [7, 31],
                [8, 31],
                [9, 30],
                [10, 31],
                [11, 30],
                [12, 31]
            ];
            // gran the max day count for that month
            var check = month_max_days[month - 1][1];
            // if the year is a leay year and the month is February
            // we add an extra day
            if (month === 2 && year.str_is('!leap_yr')) check += 1;
            // now we check the day is allowed
            if (day < 1 || day > check) return 4;
            // everything passed and we can
            return true;
        },
        'boolean': function(object) {
            return (dtype(object, 'boolean')) ? true : false;
        },
        'date': function(object) {
            return (dtype(object, 'date')) ? true : false;
        },
        'decimal': function(string) {
            return (string.str_is('!numeric') && string.str_is('!in', '.')) ? true : false;
            // return (string.str_is('!numeric') /*&& string * 1 % 1 !== 0*/) ? true : false;
        },
        'domain': function(string) {

            // a legal domain cannot contain `~!@#$%^&*()_+=[]{}|\;:'",.<>/?
            // cannot start or end with a hyphen/dash but it can contain inner hyphens/dashes
            return (string && string.str_grab('!left', 1) !== '-' && string.str_grab('!right', 1) !== '-' && !string.str_is('!special_string', ['-'])) ? true : false;
        },
        'email': function(string) {
            /*
Your email address can contain only letters,
numbers, periods (.), hyphens (-),
and underscores (_). It can't contain special
characters, accented letters, or letters
outside the Latin alphabet.
*/
            // string must be over 4 chars in length
            // http://stackoverflow.com/questions/2049502/what-characters-are-allowed-in-email-address
            // cannot have spaces...consecutive periods or start/end with a period
            if (string.length <= 4 || (/\s\xa0/g).test(string) || (/\.\.+/g).test(string) || string.str_is('!sewith', ['.'])) return false;
            // must have a valid tld and tld must be the at the end of the string
            var tld = string.substring(string.lastIndexOf('.'), string.length);

            // check if the tld is indeed valid
            if (win.suffix_list[tld.charAt(1).toLowerCase()].indexOf(tld) === -1) return false; // invalid tld
            // split the string at the @
            var parts = string.split('@'),
                username = parts[0],
                servername = parts[1].split('.');

            // there must only be two parts, else there are more than one '@'
            // and each part cannot be empty
            if (!username.length || !servername.length || parts.length !== 2) return false;
            // remove the last one as it is the valid tld
            servername.pop();
            // check the subdomains
            for (var i = 0, l = servername.length; i < l; i++) {
                if (!servername[i].str_is('!domain')) return false;
            }
            // now we check the username...must not contain any illegals chars...
            // only special chars allowed are ._-
            if (username.str_is('!special_string', ['.', '_', '-'])) return false;
            // everything else looks good
            return true;
        },
        'empty': function(string) {
            // should it account for spaces???? '   ';false vs '';true
            return (string === undefined || string === null || string.replace(/[\s\xa0]+/g, '') === '') ? true : false;
        },
        'binary': function(string) {
            // only have 0-1 and/ or a radix(dot)
            return (!(/[^0-1\.-]/g).test(string) && (/^(-)?([0-1]+)?(\.[0-1]+)?$/).test(string) && string !== '-') ? true : false;
            // return (!(/[^0-1\.]/g).test(string) && string.str_count('/', '.') < 2) ? true : false;
        },
        'digit': function(string) {
            // only have 0-9 and/ or a radix(dot)
            return (!(/[^0-9\.-]/g).test(string) && (/^(-)?([0-9]+)?(\.[0-9]+)?$/).test(string) && string !== '-') ? true : false;
        },
        'octal': function(string) {
            // only have 0-7 and/ or a radix(dot)
            return (!(/[^0-7\.-]/g).test(string) && (/^(-)?([0-7]+)?(\.[0-7]+)?$/).test(string) && string !== '-') ? true : false;
        },
        'hex': function(string) {
            // only have 0-9 and/ or a radix(dot)
            return (!(/[^a-f0-9\.x-]/gi).test(string) && (/^(-)?((0x)?(#)?[0-9a-f]+)?(\.[0-9a-f]+)?$/i).test(string) && string !== '-') ? true : false;
        },
        'hexcolor': function(string) {
            return ((/^(#)?([a-f0-9]{3,6})$/i).test(string) && (string.str_chomp('!left', '#').str_length('!exact', 3) || string.str_chomp('!left', '#').str_length('!exact', 6))) ? true : false;
            // return ((/^#?([a-f0-9]{3}|[a-f0-9]{6})$/gi).test(string)) ? true : false;
        },
        'hexcolor8': function(string) {
            return ((/^(#)?([a-f0-9]{8})$/i).test(string)) ? true : false;
        },
        'rgb': function(string) {
            return ((typeof string.str_parse('!rgb')) === 'boolean') ? false : true;
        },
        'ip': function(string) {
            // replace any illegal chars
            string = string.str_chomp('!left', '://');
            string = string.str_chomp('!left', '@');
            string = string.str_chomp('!left', '[');
            // turns 1::1:123.1.12.1: => 1::1:123.1.12.1
            if ((/\d:$/).test(string)) string = string.str_chomp('!right', ':');
            string = string.str_chomp('!right', ']:');
            string = string.str_chomp('!right', '/');
            // check if v4 or v6
            if (string.indexOf(':') > -1) {
                var ip6 = string;
                // if we have something like '1:1:1:::::122.1.1.1 it is invalid
                if ((/:{3,}/g).test(string)) return false;
                // v6
                // check for ipv4
                if (string.indexOf('.') > -1) {
                    // get the last colon index
                    var last_colon_index = string.lastIndexOf(':');
                    // separate at the last colon index
                    var ip6 = string.substring(0, last_colon_index + 1);
                    // reset the ip6; remove the traling : if there is only one, e.g. 1::1: => 1::1, 1:: => 1::
                    if (ip6.str_grab('!right', 1) === ':' && ip6.str_grab('!right', 2) !== '::') ip6 = ip6.str_chomp('!right', ':');
                    var ip4 = string.substring(last_colon_index + 1, string.length);
                    // check that the ip4 is in valid format

                    if (!ip4.str_is('!ip')) return false; //'invalid ip4';
                }
                // now we check the ip6
                // check for :: compression

                var compression_count = ip6.str_count('/', '!::');
                if (compression_count > 1) return false; //too much compression
                // if compression exists we check for length, there should be only 8
                if (compression_count === 1) {
                    var repeat = 0;
                    if (ip6.str_grab('!left', 2) === '::') {
                        // remove the :: from the left and split by :
                        var parts = ip6.str_chomp('!left', '::').split(':'),
                            l = parts.length;
                    } else if (ip6.str_grab('!grab', 2) === '::') {
                        // remove the :: from the left and split by :
                        var parts = ip6.str_chomp('!right', '::').split(':'),
                            l = parts.length;
                    } else {
                        // remove the :: from the left and split by :
                        var parts = ip6.split('::'),
                            p_1 = parts[0].split(':'),
                            p_2 = parts[1].split(':'),
                            l = (p_1.length + p_2.length);
                        parts = p_1.concat(p_2);
                    }
                    if (l >= 9) return false;
                } else {
                    // just split at every :
                    var parts = ip6.split(':'),
                        l = parts.length;
                    // this case must be 8 in length
                    if (l !== 8) return false;
                }
                // now we check that each part has valid chars

                for (var i = 0; i < l; i++) {
                    // check if they are a-f0-9 only

                    if (parts[i].length >= 5 || (/[^a-f0-9]+/gi).test(parts[i])) {
                        return false; // illegal char found
                    }
                }
                // everything has passed mane

                return true;
            } else {
                // v4
                // split into parts
                string = string.split('.');

                if (string.length !== 4) return false; // need to have 4 parts
                // check if they are all numbers
                if (!string.join('').str_is('!numeric')) return false; // all parts need to be numbers
                // no we check if they are all between a range
                var one = string[0] * 1,
                    two = string[1] * 1,
                    three = string[2] * 1,
                    four = string[3] * 1;
                if (((one <= -1 || one >= 256) || (two <= -1 || two >= 256) || (three <= -1 || three >= 256) || (four <= -1 || four >= 256))) {
                    return false; // invalid number
                }
                return true;
            }
        },
        // http://semplicewebsites.com/removing-accents-javascript
        'latin': function(string) {
            var latin_map = win.latin_map;
            for (var i = 0, l = string.length; i < l; i++) {
                if (latin_map[string[i]]) return true;
            }
            return false;
        },
        // http://www.timeanddate.com/date/leapyear.html
        'leap_yr': function(string) {
            // mus be divisible by 4
            if (((string * 1) % 4)) return false;
            // if the number is a century number(%100) it must be divisible by %400
            if (!((string * 1) % 100) && ((string * 1) % 400)) return false;
            return true;
        },
        'lower': function(string) {
            return string.replace(/[a-z]/g, '') === '';
        },
        'special_string': function(string, args) { // allowed, no_numbers) {
            var special_chars = ('`~!@#$%^&*()-_=+[]{}\\|;:\'\",.<>/? ' + ((args[2]) ? '0123456789' : '')).split('');
            allowed = args[1] || [];
            for (var i = 0, l = allowed.length; i < l; i++) {
                var remove_index = special_chars.indexOf(allowed[i]);
                if (remove_index > -1) special_chars.splice(remove_index, 1);
            }
            // now check if the string has any special chars
            for (var i = 0, l = special_chars.length; i < l; i++) {
                if (string.indexOf(special_chars[i]) > -1) return true;
            }
            return false;
        },
        'nan': function(string) {
            if (dtype(string, 'number') && string + '' === 'NaN') {
                return true;
            }
            return false;
        },
        'null': function(string) {
            return string === null;
        },
        'number': function(string) {
            if (string + '' !== 'Infinity' && dtype(string * 1, 'number') && parseFloat(string) >= 0) return true;
            return false;
        },
        'number_space': function(string) {
            // var string = this;
            return !((/[^0-9 ]/).test(string));
        },
        'numeric': function(string) {
            // var string = this;
            return (dtype(string, 'string') && (string.str_is('!binary') || string.str_is('!digit') || string.str_is('!octal') || string.str_is('!hex')) && string !== 'Infinity') ? true : false;
        },
        'upper': function(string) {
            // var string = this;
            return string.replace(/[A-Z]/g, '') === '';
        },
        'url': function(string) {
            // var string = this;
            var test = string.str_parse('!url');
            return (test.length === 1 && test[0].valid === true) ? true : false;
        },
        'falsy': function(string) {
            // var string = this;
            return (['', false, null, undefined, 0].indexOf(string) >= 0 || dtype(string, 'number') && (a + '' === 'NaN')) ? true : false;
        },
        'finite': function(string) {
            // var string = this;
            //if (Number.isFinite) return Number.isFinite(a);
            return isFinite(string);
        },
        'infinity': function(string) {
            // var string = this;
            return !isFinite(string);
        },
        'function': function(string) {
            // var string = this;
            return (dtype(string, 'function')) ? true : false;
        },
        'plain_object': function(string) {
            // var string = this;
            return (dtype(string, 'object')) ? true : false;
        },
        'equal': function(string, args) {
            // var string = this;
            var i, e, a = string,
                l = a.length,
                b = args[1],
                type1, type2, ll;
            if (l !== b.length) return false;
            while (l--) {
                //i = a.shift();
                //e = b.shift();
                i = a[l];
                e = b[l];

                type1 = dtype(i);
                type2 = dtype(e);
                if (type1 === type2) {
                    //check number type
                    if (type1 === 'array') {
                        ll = i.length; //, j, jj;
                        if (ll !== e.length) return false;
                        while (ll--) {
                            if (dtype(i[ll]) === dtype(e[ll]) && (![i[ll]].str_is('!equal', [e[ll]]))) {
                                return false;
                            }
                        }
                    } else if (type1 === 'object') {
                        var r = [],
                            s = [],
                            u = [],
                            v = [],
                            keys = Object.keys(i),
                            len = keys.length,
                            keys1 = Object.keys(e),
                            len1 = keys1.length,
                            j = -1;
                        while (j < len) {
                            j++;
                            r.push(keys[j]);
                            s.push(i[keys[j]]);
                            u.push(keys[j]);
                            v.push(e[keys[j]]);
                        }
                        if (!r.str_is('!equal', u) || !s.str_is('!equal', v)) {
                            return false;
                        }
                    } else {
                        if (i + '' !== e + '') {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            }
            return true;
        },
        'same_type': function(string, args) { // comparison_object) {
            return dtype(string, dtype(args[1]));
        },
        'element': function(string) {
            return (string && string.nodeType === 1 && dtype(string, 'htmldivelement')) ? true : false;
        },
        'string': function(string) {
            return (dtype(string, 'string')) ? true : false;
        },
        'regex': function(string) {
            return (dtype(string, 'regexp')) ? true : false;
        },
        'undefined': function(string) {
            return string === undefined;
        },
        'window': function(string) {
            // var string = this;
            return (dtype(string, 'global')) ? true : false;
        },
        // http://stackoverflow.com/questions/9780632/how-do-i-determine-if-a-color-is-closer-to-white-or-black
        // http://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
        // <= 127 ==> black
        // >= 128 ==> white
        // https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness
        'color_white': function(string) {
            var rgb = string;
            return (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) < 127 ? false : true;
        },
        'color_black': function(string) {
            var rgb = string;
            return !(rgb.str_is('!color_white'));
        },
        //http://stackoverflow.com/questions/16476501/validate-if-a-value-is-a-whole-number
        'whole_number': function(string) {
            // var string = this;
            return (string.str_is('!numeric') && (string * 1) % 1 === 0) ? true : false;
        },
        'mimetype': function(string, args) { // ext, media_type) {
            // var string = this;
            var m = win.mimetypes[args[1].str_ensure('!left', '.')];
            return (m && m.indexOf(args[2]) > -1) ? true : false;
        },
        'base64_url': function(string) {
            // var string = this;
            // split at ,
            var parts = string.split(','),
                first = parts[0],
                second = parts[1];
            // screen the forst part ==> data:image/png;base64
            // split the first part
            first = first.split(/:|;/);

            // must start with data:
            if (first[0] !== 'data') return false;
            // second part must be a legit mime type
            var mimes = win.mimetypes,
                l = Object.keys(win.mimetypes).length,
                counter = 0;
            for (var key in mimes) {
                counter++;
                if (mimes[key].indexOf(first[1]) > -1) break;
                // return false if we have gone through all the mimetypes
                // and there is no match
                if (counter === l) return false;
            }
            // if ( !string.str_is_mimedtype(first[1]) ) return false;
            // third part must Base64
            if (first[2] !== 'base64') return false;
            // we check the second part
            if (!second.str_is('!base64_string')) return false;
            return true;
        }
    },
    'length': {
        'min': function(string, args) {
            return (string.length >= args[1]) ? true : false;
        },
        'max': function(string, args) {
            return (string.length <= args[1]) ? true : false;
        },
        'range': function(string, args) {
            return (string.str_length('!min', args[1]) && string.str_length('!max', args[2])) ? true : false;
        },
        'exact': function(string, args) {
            return (string.length === args[1]) ? true : false;
        }
    },
    'letter': {
        'next': function(string) {
            // var string = this;
            // get the next letter in the alphabet
            var point = string.codePointAt(0);
            if (point === 90) point = 64; // reset to letter A if letter Z provided
            else if (point === 122) point = 96; // reset to letter a if letter z provided
            return String.fromCodePoint(point + 1);
        },
        'prev': function(string) {
            // get the next letter in the alphabet
            var point = string.codePointAt(0);
            if (point === 65) point = 91; // reset to letter A if letter Z provided
            else if (point === 97) point = 123; // reset to letter a if letter z provided
            return String.fromCodePoint(point - 1);
        }
    },
    'distance': {
        'leven': function(string1, args) {
            var string2 = args[1];
            // degenerate cases
            if (string1 === string2) return 0;
            if (string1.length === 0) return string2.length;
            if (string2.length === 0) return string1.length;
            // create two work vectors of vareger distances
            var v0 = [], //Array(string2.length + 1),
                v1 = []; //Array(string2.length + 1);
            // initialize v0 (the previous row of distances)
            // this row is A[0][i]: edit distance for an empty s
            // the distance is just the number of characters to delete from t
            for (var i = 0; i < string2.length + 1; i++) v0[i] = i;
            for (var i = 0; i < string1.length; i++) {
                // calculate v1 (current row distances) from the previous row v0
                // first element of v1 is A[i+1][0]
                //   edit distance is delete (i+1) chars from s to match empty t
                v1[0] = i + 1;
                // use formula to fill in the rest of the row
                for (var j = 0; j < string2.length; j++) {
                    var cost = (string1[i] === string2[j]) ? 0 : 1;
                    v1[j + 1] = Math.min.apply(null, [v1[j] + 1, v0[j + 1] + 1, v0[j] + cost]);
                }
                // copy v1 (current row) to v0 (previous row) for next iteration
                for (var j = 0; j < string2.length + 1; j++) v0[j] = v1[j];
            }
            return v1[string2.length];
        }
    },
    'pad': {
        'both': function(string, args) { //times, character) {
            // var times = args[1], character = args[2];
            //http://stackoverflow.com/questions/1877475/repeat-character-n-times
            var padding = Array((args[1] || 0) + 1).join(args[2] || ' ');
            return padding + string + padding;
        },
        'left': function(string, args) { //times, character) {
            // var times = args[1], character = args[2];
            // var string = this;
            //http://stackoverflow.com/questions/1877475/repeat-character-n-times
            return Array((args[1] || 0) + 1).join(args[2] || ' ') + string;
        },
        'right': function(string, args) { //times, character) {

            // var times = args[1], character = args[2];
            // var string = this;
            //http://stackoverflow.com/questions/1877475/repeat-character-n-times
            return string + Array((args[1] || 0) + 1).join(args[2] || ' ');
        }
    },
    'parse': {
        'numbers': function(string) {
            return (string) ? string.match(/\d+/g) : [];
        },
        'number': function(string, args) {
            var numbers = string.str_parse('!numbers');
            var num = (string && numbers) ? numbers[0] : null;
            // if the second argument is provided we cast the string to number
            return (args[1]) ? +num : num;
        },
        'hsv': function(string) {
            return string.str_parse('!rgb', 'hsva?');
        },
        'hsl': function(string) {
            return string.str_parse('!rgb', 'hsla?');
        },
        'hwb': function(string) {
            return string.str_parse('!rgb', 'hwba?');
        },
        'rgb': function(string, args) { // type) {
            var type = args[1];

            // must start with rgb and end with a )
            if (!string.str_is('!swith', ['rgb', 'hsl', 'hsv', 'hwb']) || !string.str_is('!ewith', [')', ');'])) return 11;
            // split by the comma
            // rgba(0, 1, 1, 1)
            // length must be 3 or 4
            var parts = string.split(',');

            if (!parts.length.val('!range', 3, 4)) return 22;
            // go through each part
            // set the search term into the map
            // var r_map = {};
            // r_map[ (((!type) ? 'rgba?' : type) + '\\(|\\s') ] = '';

            // var _1 = parts[0].trim().str_replace('!all', r_map),
            var _1 = parts[0].trim().replace(new RegExp((((!type) ? 'rgba?' : type) + '\\(|\\s')), ''),
                _2 = parts[1].trim().replace(/([\%|\s]+)?$/, ''),
                _3 = parts[2].trim().replace(/([\%|\s]+)?\);?$/, ''),
                _4 = (parts[3] || '').trim().replace(/([\s]+)?\);?$/, '');

            var one = _1.str_is('!numeric');
            var two = _2.str_is('!numeric');
            var three = _3.str_is('!numeric');
            var four = (parts[3]) ? _4.str_is('!numeric') : true;

            if (
                (!one || !(+_1).val('!range', 0, 255)) || (!two || !(+_2).val('!range', 0, 255)) || (!three || !(+_3).val('!range', 0, 255)) || (!four || !(+_4).val('!range', 0, 255))) return 33;
            return [_1, _2, _3, (_4 || '1')];
        },
        'url': function(string) {
            var update = function(update_map) {
                var _ = this,
                    val;
                for (var key in update_map) {
                    // if the first char is a colon we cache the val to return later
                    if (key.charAt(0) === ':') {
                        val = update_map[key]
                        _[key.slice(1)] = update_map[key];
                    } else {
                        _[key] = update_map[key];
                    }
                }
                return val;
            };
            // get the tld list from the global scope
            var tlds_array = win.suffix_list,
                S = this;
            // #1 Split the string by the illegal chars
            var illegal = '`"<> '.split(''),
                indices = [],
                parts = [],
                str = '';
            for (var i = 0, l = string.length; i < l; i++) {
                if (illegal.indexOf(string[i]) > -1) {
                    indices.push(string[i], i);
                    parts.push({
                        'string': str,
                        'illegal': string[i],
                        'valid': true,
                        'scheme': null,
                        'www': null,
                        'protocol': null,
                        'suffix': null,
                        'update': update
                    });
                    str = '';
                    continue;
                }
                str += string[i];
            }
            // #1.5 Get the last string
            // check to see if it is the last character
            // get the last illegal char from the indices
            // if they dont match we need to get the last string
            if (indices[(indices.length) - 2] !== string.str_grab('!right', 1)) {
                parts.push({
                    'string': string.substring(indices[indices.length - 1] + 1, string.length),
                    'illegal': "",
                    'valid': true,
                    'scheme': null,
                    'www': null,
                    'protocol': null,
                    'suffix': null,
                    'update': update
                });
            }
            var scheme_list = ['https://', 'http://', 'file://', 'ftp://', 'sftp://', 'mysql://', 'mailto://', 'data:', /*camera Real Time Streaming Protocol*/ 'rtsp://', /*microsoft media server*/ 'mms://', 'hdfs://', 's3://', 's3n://', 's3bfs://', 'www.'];
            // ^START LOOP
            for (var i = 0, l = parts.length; i < l; i++) {
                var O = parts[i],
                    url = O['string'];
                // **********
                // #2 Left side; Find the prefix; any illegal chars before the scheme or 'www.'
                // **********
                // to find the prefix we first check if there is a scheme or 'www.'
                var scheme = url.str_ff(scheme_list),
                    prefix;
                // **********
                // #2.1 Base64 Check;
                // **********
                // check here before anything else if the url is Base64
                if (scheme = 'data:' && url.str_grab('!left', 5) === 'data:') {
                    // check if it is in base64 data url format
                    if (url.str_is('!base64_url')) {
                        O.update({
                            'url': url
                        });
                    } else {
                        O.update({
                            'url': url,
                            'valid': 'NOT_VALID_BASE64_DATA_URL'
                        });
                    }
                    continue;
                }
                if (scheme) {
                    // if we have a scheme we set anything before it as the prefix
                    prefix = url.substr(0, url.indexOf(scheme));
                    if (scheme !== 'www.') {
                        O.update({
                            'scheme': scheme,
                            'protocol': scheme.str_chomp('!right', '://')
                        });
                    } else { // 'www.' was found
                        O.update({
                            'www': true
                        });
                    }
                } else {
                    // if no 'www.' or scheme exists we just match any illegally prefixed chracters
                    // ?? this could be a simple url like google.com
                    // illegal chars list for ReGex >> http://stackoverflow.com/questions/5105143/list-of-all-characters-that-should-be-escaped-before-put-in-to-regex
                    prefix = (url.match(/^[`~\!@#\$%\^&\*\(\)_\-\+\=\[\]\{\}\|\\\;\:\'\",\.\<\>/\?\d]+/) || [null])[0];
                }
                url = O.update({
                    'prefix': prefix,
                    ':url': url.str_chomp('!left', prefix) // => this will return the url; in essence resetting it
                });
                // **********
                // #3 Right side; Find any punctuation::suffix; any illegal chars found at the end of the string
                // **********
                var suffix = (url.match(/[\`\!\)\[\]\}\;\:\'\"\<\>\,\.\?]+$/) || [null])[0];
                if (suffix) url = url.str_chomp('!right', suffix);
                url = O.update({
                    'suffix': suffix,
                    'slash': (((url.str_grab('!right', 1) === '/')) ? false : true), // true means we added a slash
                    ':url': url.str_ensure('!right', '/') // => this will return the url; in essence resetting it
                        // we add a forwardslash to help locate the tld in the next step. It will be removed in the path check later
                });
                // **********
                // #4 Find the ending TLD
                // **********
                // get the ip address
                var ip_regex_array = [
                        ['ipv6_ipv4_port', '(://|@)\\[(([a-f0-9]{0,4}(%[a-z0-9]{1,})?:){1,6})((\\d{1,3}\\.){3})((\\d{1,3}\\]:))'],
                        ['ipv6_port', '(://|@)(([a-f0-9]{0,4}(%[a-z0-9]{1,})?:){1,6})((\\d{1,3}\.){3})((\\d{1,3}\\/))'],
                        ['ipv6_ipv4', '(://|@)\\[(([a-f0-9]{0,4}:){1,7})(([a-f0-9]{0,4}){1})((%[a-z0-9]{1,})?){1}(\\]:)'],
                        ['ipv6', '(://|@)(([a-f0-9]{0,4}:){1,7})(([a-f0-9]{0,4}){1})(\\/|(%[a-z0-9]{1,})\\/){1}'],
                        ['ipv4_port', '(://|@)((\\d{1,3}\\.){3})((\\d{1,3}:){1})' /*|| (://|@)((\d{1,3}\.){3})((\d{1,3}:){1})((\d{1,5}\/){1})*/ ],
                        ['ipv4', '(://|@)((\\d{1,3}\\.){3})((\\d{1,3}){1})(\\/){1}']
                    ],
                    ip, r, ip_match;
                // loop through the ip ReGex array to find a possible ip address
                for (var j = 0, ll = ip_regex_array.length; j < ll; j++) {
                    r = new RegExp(ip_regex_array[j][1], 'gi');
                    var ip_array = [];
                    url.replace(r, function() {
                        var args = arguments,
                            ip_s_index, ff;
                        ip_match = args[0];

                        if (ip_match.length > 3 && S.is_ip(ip_match)) {

                            ip = ip_match;
                            ip_s_index = args[args.length - 2];
                            ff = S.first_found(ip_match, ['://', '@']);
                            // normalize the ip
                            if (ff) {
                                ip = S.chomp_left(ip, ff);
                                ip_s_index = ip_s_index + ff.length;
                            }
                            ip_array.push(ip, ip_s_index, ip_regex_array[j][0]);

                        }
                        return ip;
                    });
                    // if we have an ip we break the loop and continue to the next step
                    if (ip) break;
                }
                // get the potential tld matches that are in the form of .com/ || .com:
                var potential_tlds = [],
                    potential_tlds_indices = [],
                    S = this,
                    stop;
                // find the possible tlds
                var possible_tlds = (url.match(/\.([^\~\`\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\{\}\\\|\;\:\'\"\,\<\>\/\?])+[\/|:/]/gi) || []);
                // stop_l = false;
                if (possible_tlds.length) {
                    // see how many tlds were captured
                    for (var j = 0, ll = possible_tlds.length; j < ll; j++) {
                        // loop thorugh each possible_tlds set
                        var current_tld_p = possible_tlds[j],
                            last_char = current_tld_p.str_grab('!right', 1),
                            current_tld_p = possible_tlds[j].str_chomp('!right', ':').str_chomp('!right', '/').str_chomp('!left', '.'),
                            current_tld_set = current_tld_p.split('.'),
                            current_tld_set_2 = current_tld_p.split('.');
                        // split each and loop
                        for (var k = 0, lll = current_tld_set.length; k < lll; k++) {
                            // remove the first in array after the first ietration
                            if (k !== 0) {
                                current_tld_set_2.shift();
                                current_tld_p = current_tld_set_2.join('.');
                            }
                            // get the first char and get the list
                            var list_ptld = tlds_array[current_tld_p.charAt(0)];
                            if (list_ptld && list_ptld.indexOf('.' + current_tld_p) > -1 && !current_tld_p.str_is('!numeric')) {
                                // add to the potentials
                                potential_tlds = ['.' + current_tld_p + last_char];
                                potential_tlds_indices = [url.indexOf('.' + current_tld_p + last_char)];
                                // break out of loop
                                k = j = Infinity; // stop both loops
                            }
                        }
                    }
                }
                // if no ip address or tld is found turn invalid; everything else to null
                if (!ip_array.length && !potential_tlds.length) {
                    // set everything to null
                    O.update({
                        'valid': 'NO_TLD_or_IP',
                        'tld': null,
                        'ip': null,
                        'ip_prefix': null,
                        'ip_type': null
                    });
                    break;
                }
                if (ip_array[1] && (ip_array[1]) < (potential_tlds_indices[0] || url.length)) { // ip comes before tld
                    var ip_start_index = ip_array[1],
                        path;
                    O.update({
                        'tld': null,
                        'port': null,
                        'ip_prefix': null,
                        'path': ('/' + url.substring(ip_start_index + ip.length, url.length)),
                        'url': (url.substring(0, ip_start_index + ip.length)),
                        'ip_type': ((ip_array[0].indexOf('6') > -1) ? '6' : '4')
                    });
                    // If the last character is : we have a port
                    if (ip.str_grab('!right', 1) === ':') {
                        var port_end_index = url.indexOf('/', ip_start_index + ip.length);
                        url = O.update({
                            'port': (url.substring(ip_start_index + ip.length, port_end_index)),
                            'path': (url.substring(port_end_index, url.length)),
                            ':url': (url.substring(0, ip_start_index + ip.length))
                        });
                    }
                    // get the new updated path
                    // path = O['path'].str_chomp('!left', '/');
                    path = (O['path']);
                    // split and check if the first item is a number
                    var path_parts = path.split('/'),
                        prefix = path_parts[0],
                        is_num = prefix.str_is('!numeric'),
                        ip_type = O['ip_type'];
                    if (is_num && ((ip_type === '6' && prefix * 1 <= 128) || (ip_type === '4' && prefix * 1 <= 32))) {
                        O.update({
                            'ip_prefix': prefix
                        });
                        path_parts.shift(); // remove the prefix from the path_parts
                        path = O.update({
                            ':path': ('/' + path_parts.join('/'))
                        });
                    }
                    // check for auth info before removing it in the later chomps
                    // var has_at = ip.str_is('!in', '@');
                    // final url reset [1]::START
                    url = url.str_chomp('!right', ip);
                    // remove any of the unwated chars from the ip
                    ip = ip.str_chomp('!left', '[');
                    ip = ip.str_chomp('!right', '/');
                    ip = ip.str_chomp('!right', ':');
                    ip = ip.str_chomp('!right', ']');
                    url = O.update({
                        'ip': ip,
                        ':url': (url.str_ensure('!right', '{{__ip__}}')) // => this will return the url; in essence resetting it
                    });
                } else if (potential_tlds_indices[0] && (potential_tlds_indices[0] < (ip_array[1] || url.length))) { // tld comes before ip
                    // cache the matched tld
                    var tld = potential_tlds[0],
                        current_tld_index = potential_tlds_indices[0];
                    path = O.update({
                        ':path': (url.substring(current_tld_index + tld.length - 1, url.length))
                    });
                    url = O.update({
                        ':url': (url.substring(0, current_tld_index + tld.length)), // => this will return the url; in essence resetting it
                        'tld': tld
                    });
                }
                // **********
                // #5 Find the auth userinfo
                // **********
                // skip failed urls
                if (O['valid'] !== true) continue;
                // find the first '@'
                var first_at = url.lastIndexOf('@');
                // if an @ exists...it must have a scheme
                if (first_at > -1 && scheme) {
                    // get the string between the scheme and the at
                    var userinfo_start = url.indexOf(scheme),
                        userinfo_end = first_at,
                        userinfo = url.substring(userinfo_start, userinfo_end).str_chomp('!left', scheme);
                    // split the string at the first colon
                    var user_info_parts = userinfo.split(':');
                    // reset the url to everything after the @; e.g. http://a:p@www.google.com => www.google.com/
                    url = url.substring(first_at + 1, url.length);
                    url = O.update({
                        'username': (user_info_parts[0] || null),
                        'password': (user_info_parts[1] || null),
                        'userinfo': ((userinfo === ':') ? null : userinfo),
                        ':url': ((url === '{{__ip__}}') ? O['ip'] : url) // => this will return the url; in essence resetting it
                    });
                } else {
                    // needs a scheme; if auth is given it must also have a scheme
                    url = O.update({
                        'username': null,
                        'password': null,
                        'userinfo': null,
                        'valid': ((first_at > -1 && !scheme) ? 'AUTH_NO_SCHEME' : true),
                        ':url': ((url.str_grab('!right', 10) === '{{__ip__}}') ? O['ip'] : url) // => this will return the url; in essence resetting it
                    });
                }
                // **********
                // #6 Find the domain name
                // **********
                // if we have a url...
                // skip failed urls
                if (O['valid'] !== true) continue;
                if (!O['ip']) {
                    var url_parts = url.str_chomp('!right', tld).str_chomp('!left', scheme).split('.'),
                        host_name = [],
                        valid_subdomains = [],
                        invalid_sub;
                    // remove the first item if it is www from the array outside the loop

                    if (url_parts[0] === 'www') url_parts.shift();
                    O.update({
                        'domain': null,
                        'subdomains': null
                    });
                    // get the domain which is the last item in the array

                    var domain = url_parts.pop();

                    // if no url_parts length at this point we might have somethin like 'http://www.google'
                    // where no tld was given
                    // if (!url_parts.length) {
                    //     O.update({
                    //         'valid': 'MISSING_TLD'
                    //     });
                    //     continue;
                    // }
                    if (string.str_is_domain(domain)) {
                        O.update({
                            'domain': domain
                        });
                    } else {
                        O.update({
                            'valid': 'INVALID_DOMAIN'
                        });
                        continue;
                    }
                    if (url_parts.length) { // subdomains are left
                        // loop through the url parts and check for any invalidities
                        for (var j = 0, ll = url_parts.length; j < ll; j++) {
                            var current_subdomain = url_parts[j];

                            if (current_subdomain.str_is('!domain')) valid_subdomains.push(current_subdomain);
                            else {
                                invalid_sub = true;
                                O.update({
                                    'valid': 'INVALID_SUBDOMAIN; ' + current_subdomain
                                });
                                break;
                            }
                            if (j === ll - 1) O.update({
                                'subdomains': valid_subdomains
                            });
                        }
                        if (invalid_sub) continue;
                    }
                }
                // **********
                // #7 Find the port
                // **********
                // get the list of common default port numbers to schemes
                // skip failed urls
                if (O['valid'] !== true) continue;
                if (!O['ip'] && path.length > 1) { // skip no-paths => '/'
                    if (path.charAt(0) === ':') {
                        var port = path.slice(1).split('/', 1)[0];
                        // port must be between 1 and 65,535
                        if (port.str_is('!numeric') && (port > 0 && port < 65536)) {
                            O.update({
                                'port': port
                            });
                        } else {
                            O.update({
                                'port': null,
                                'valid': 'INVALID_PORT_NUMBER'
                            });
                        }
                        path = O.update({
                            ':path': (path.slice(port.length + 1))
                        });
                        url = O.update({
                            ':url': (url.str_chomp('!right', ':' + port + '/') + '/')
                        });
                    }
                }
                // **********
                // #8 Reset path traling slash; ?? validate path here
                // **********
                // skip failed urls
                if (O['valid'] !== true) continue;
                // reset the path depending on the slash
                if (O['slash']) {
                    path = O.update({
                        ':path': ((path === '/') ? path : path.str_chomp('!right', '/'))
                    });
                }
                delete O['slash'];
                // **********
                // #9 Get the query
                // **********
                // skip failed urls
                if (O['valid'] !== true) continue;
                var query_index = path.indexOf('?');
                O['query'] = O['parameters'] = null;
                if (query_index > -1) {
                    var query = path.substring(query_index + 1, path.length);
                    O.update({
                        'query': query
                    });
                    // get the parameters into a map
                    var query_parts = query.split('&'),
                        parameters = {};
                    for (var j = 0, ll = query_parts.length; j < ll; j++) {
                        var parameter = query_parts[j].split('=');
                        parameters[parameter[0]] = parameter[1];
                    }
                    // add the map to the object
                    O.update({
                        'parameters': parameters
                    });
                }
                // **********
                // #10 Get the fragment aka '#'
                // **********
                // skip failed urls
                if (O['valid'] !== true) continue;
                var fragment_index = path.lastIndexOf('#');
                O.update({
                    'fragment': null
                });
                if (fragment_index > -1) {
                    var fragment = path.substring(fragment_index, path.length);
                    O.update({
                        'fragment': (fragment.slice(1))
                    });
                    // reset the path; remove the fragment
                    O.update({
                        'path': (path.str_chomp('!right', fragment))
                    });
                }
            }
            // <scheme>://<username>:<password>@<host>:<port>/<path>;<parameters>?<query>#<fragment>
            return parts;
            //http://www.the-art-of-web.com/javascript/escape/
            // #Version 2015092300, Last Updated Wed Sep 23 07:07:01 2015 UTC => http://data.iana.org/TLD/tlds-alpha-by-domain.txt
            // this is the domain name
            // only non word chracter allowed is an underscore
            /*
            Regardless of the extension, all domain names must follow the same character rules...
            You can use letters (abc), numbers (123) and dashes/hyphens (---).
            Spaces are not allowed and the domain can't begin or end with a dash.
            A little known fact is that you CAN have multiple dashes right next to each other.
            http://stackoverflow.com/questions/7111881/what-are-the-allowed-characters-in-a-sub-domain
            */
            //http://mozgovipc.blogspot.com/2010/11/jquery-javascript-how-to-sort-string.html
            //http://data.iana.org/TLD/tlds-alpha-by-domain.txt
            //http://www.iana.org/domains/root/db
            //http://www.skorks.com/2010/05/what-every-developer-should-know-about-urls/
        }
    },
    'repeat': {
        'text': function(string, args) {
            // create an empty array then populate it with the provided string
            return Array((args[1] || 0) + 1).join(string || ' ');
        }
    },
    'replace': {
        // this is the default and can either be a map or a single needle
        'all': function(string, args) { //, needle_replacement) {
            var needle_map = args[1];

            // var replacement_map = {};
            // // if the provided input is a string and replacement...
            // // we turn it into a replacement_map
            // if (typeof needle_map === 'string') {
            //     replacement_map[needle_map] = needle_replacement;
            // }else replacement_map = needle_map;
            // var replacement_map = needle_map;
            // now we loop through all the needles and replace them in the string
            //https://msdn.microsoft.com/en-us/library/2yfce773(v=vs.94).ASPX
            //http://stackoverflow.com/questions/5105143/list-of-all-characters-that-should-be-escaped-before-put-in-to-regex
            var specialChars = '.\+*?[^]$(){}=!<>|:-'.split('');
            return string.replace(new RegExp(
                // we make sure to escape special characters
                Object.keys(needle_map).map(function(character) {

                    // (specialChars.indexOf(character) !== -1) ? '\\' + character : character);
                    return (specialChars.indexOf(character) !== -1) ? '\\' + character : character;
                }).join('|') //join all the needles with a pipe => /needle1|needle2/
                , 'g'), function(key) {

                return needle_map[key];
            });
        },
        'left': function(string, args) { // needle, replacement) {
            var needle = args[1],
                replacement = args[2];
            return string.replace(new RegExp('^(' + needle + ')+', 'g'), (replacement || ''));
        },
        'right': function(string, args) { // needle, replacement) {
            var needle = args[1],
                replacement = args[2];

            return string.replace(new RegExp('(' + needle + ')+$', 'g'), (replacement || ''));
        }
    },
    'strip': {
        'accents': function(string) {
            var latin_map = win.latin_map,
                new_string = [];
            for (var i = 0, l = string.length; i < l; i++) {
                var lookup = latin_map[string[i]];
                if (lookup) new_string.push(lookup);
                else new_string.push(string[i]);
            }
            return new_string.join('');
        },
        'punctuation': function(string) {
            // replace everything but letters and numbers
            return string.replace(/[^a-z\d\s\xa0]+/gi, '').replace(/\s+/g, ' ');
        },
        'tags': function(string, args) { /*tag_type::args[1]*/

            var tag_type = args[1];
            return (tag_type) ? string.replace(new RegExp('<(/)?(' + tag_type + ')>', 'gi'), '') : string.replace(/\<(\/)?[a-z]+\>/gi, '');
            // return (tag_type) ? string.replace(new RegExp('<\(/\)?' + tag_type + '>', 'gi'), '') : string.replace(/\<(\/)?[a-z]+\>/gi, '');
            // if (tag_type) return a.replace(new RegExp('<[' + tag_type + '|/]+>', 'gi'), '');
            // return string.replace(/<[\w|/]+>/g, '');
        }
    },
    /*
' this is so \n\n\n  coo  l    mane hahaha   '.replace(/\s|\n/g, '*');
*/
    'trim': {
        'inner': function(string) {
            var cleared = string.str_clear('!space');
            var left = string.match(/^\s+/) || [];
            if (left.length) cleared = left[0] + cleared;
            var right = string.match(/\s+$/) || [];
            if (right.length) cleared = cleared + right[0];
            return cleared;
        },
        'left': function(string) {
            return string.replace(/^[\s\xa0]+/, '');
        },
        'right': function(string) {
            return string.replace(/[\s\xa0]+$/, '');
        }
    },
    'truncate': {
        'by_chars': function(string, args) { // args[1]::char_count, args[2]::ending

            var substr = string.substr(0, args[1]),
                ending = args[2] || '...';
            var next_char = string[args[1]];
            //no more spaces, single word left
            if (substr === string) {
                return string;
            } else if (next_char === ' ') {
                return substr + ending;
            } else {
                // its part of a word...
                var last_space_index = substr.lastIndexOf(' ');
                if (last_space_index !== -1) {
                    substr = substr.substr(0, last_space_index);
                    return substr.str_trim('!right') + ending;
                }
            }
            return ending;
        },
        'by_words': function(string, args) { // args[1]::char_count, args[2]::ending
            var substr = string.str_clear('!space').split(' '),
                ending = args[2] || '...',
                new_string = [],
                counter = 0,
                cached_spaces = string.match(/[\s\xa0]+/g);
            for (var i = 0, l = Math.min.apply(null, [args[1], substr.length]); i < l; i++) {
                new_string.push(substr[i]);
            }
            new_string = (substr.length > new_string.length) ? new_string.join(' ') + ending : new_string.join(' ');
            return new_string.replace(/[\s]/g, function(entity) {
                return cached_spaces[counter++];
            });
        }
    },
    'val': {
        'min': function(string, args) {
            return (string >= args[1]) ? true : false;
        },
        'max': function(string, args) {
            return (string <= args[1]) ? true : false;
        },
        'range': function(string, args) {

            return (string.val('min', args[1]) && string.val('max', args[2])) ? true : false;
        },
        'exact': function(string, args) {

            return (string === args[1]) ? true : false;
        },
        'list': function(string, args) {
            return (args[1].indexOf(string) > -1) ? true : false;
        }
    }
};
