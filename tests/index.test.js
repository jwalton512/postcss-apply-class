import postcss from 'postcss'
import plugin from '../src'

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
        .small {
            font-size: .75rem;
        }
        .element {
            @apply .colors, .bold, .small;
        }
    `;

    const output = `
        .colors {
            color: white;
        }
        .bold {
            font-weight: bold;
        }
        .small {
            font-size: .75rem;
        }
        .element {
            color: white;
            font-weight: bold;
            font-size: .75rem;
        }
    `;

    return run(input, output, {});
});

/* Write tests here

it('does something', () => {
    return run('a{ }', 'a{ }', { });
});

*/
