var postcss = require('postcss');

var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('applies a single class', () => {
    const input = `
        .colors {
            color: white;
        }
        .element {
            @apply .colors;
        }
    `;

    const output = `
        .colors {
            color: white;
        }
        .element {
            color: white;
        }
    `;

    return run(input, output, {});
});

it('applies comma-separated classes', () => {
    const input = `
        .colors {
            color: white;
        }
        .bold {
            font-weight: bold;
        }
        .element {
            @apply .colors, .bold;
        }
    `;

    const output = `
        .colors {
            color: white;
        }
        .bold {
            font-weight: bold;
        }
        .element {
            color: white;
            font-weight: bold;
        }
    `;

    return run(input, output, {});
});

/* Write tests here

it('does something', () => {
    return run('a{ }', 'a{ }', { });
});

*/
